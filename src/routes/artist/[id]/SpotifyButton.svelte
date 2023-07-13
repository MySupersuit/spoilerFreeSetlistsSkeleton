<script>
	import spotify from '$lib/images/spotify_svg.svg';
	import { baseUrl } from '../../../utils/utils';

	export let loggedIn = false;
	export let setlist = [];
	export let artist = '';
	let apiRequestSent = false;
	let waitingForApiResponse = true;
	let apiRequestFail = false;

	function generateUrl(song, artist) {
		return `api/spotify/search?song=${song}&artist=${artist}`;
	}

	function sortByPopularity(s1, s2) {
		return s2.popularity - s1.popularity;
	}

	async function getTrackIds() {
		let ids = [];
		for (let song of setlist) {
			let truncatedSong = song.split(' ').slice(0, 3).join(' ');
			let sanitisedSong = truncatedSong.replace(/[^a-z0-9 ]/gi, '');
			let url = generateUrl(sanitisedSong, artist);
			let resp = await fetch(baseUrl(url));
			let json = await resp.json();
			if (json.results.length === 0) {
				console.log('No song found');
				continue;
			}
			let mostPopularSong = json.results.sort(sortByPopularity)[0];
			ids.push(mostPopularSong.id);
		}
		return ids.map((id) => `spotify:track:${id}`);
	}

	async function createEmptyPlaylist() {
		let url = 'api/spotify/playlist';
		let body = JSON.stringify({
			artistName: artist
		});
		let resp = await fetch(baseUrl(url), {
			method: 'POST',
			body
		});
		let json = await resp.json();
		return json.playlistId;
	}

	async function addTracksToPlaylist(trackIds, playlistId) {
		let body = JSON.stringify({
			trackIds,
			playlistId
		});
		let url = `api/spotify/playlist`;
		let resp = await fetch(baseUrl(url), {
			method: 'PUT',
			body
		});
		if (resp.status !== 200) {
			apiRequestFail = true;
			apiRequestSent = false;
		}
	}

	async function createPlaylist() {
		if (setlist.length === 0) {
			return;
		}

		let idsToAdd = await getTrackIds();
		let playlistId = await createEmptyPlaylist();

		await addTracksToPlaylist(idsToAdd, playlistId);
	}

	async function handleClick() {
		apiRequestFail = false;
		let resp = await fetch(baseUrl('api/spotify/login'));
		let json = await resp.json();
		if (json.signedIn) {
			console.log('Saving the playlist boiii');
			apiRequestSent = true;
			waitingForApiResponse = true;
			await createPlaylist();
			waitingForApiResponse = false;
		} else {
			window.open(json.url, 'Spotify login', 'height=900,width=850');
			loggedIn = true;
		}
	}
</script>

<div class="flex flex-col text-center">
	<h2 class="mb-2">Spotify it&nbsp;&nbsp;🎉</h2>
	{#if apiRequestSent}
		<span class="mb-1">
			{#if waitingForApiResponse}
				Loading...
			{:else if apiRequestFail}
				Playlist creation failed :(
			{:else}
				Playlist created!
			{/if}
		</span>
	{/if}
	<button
		on:click|preventDefault={handleClick}
		disabled={apiRequestSent}
		class="spotify-button"
	>
		<div class="flex flex-row items-center justify-center">
			<img class="h-9 mr-3" src={spotify} alt="spotify logo" />
			<span>
				{#if loggedIn}
					Save as playlist
				{:else}
					Login
				{/if}
			</span>
		</div>
	</button>
	<span class="text-sm mt-1">Spotify login only used for creating playlist - no data read</span>
</div>
