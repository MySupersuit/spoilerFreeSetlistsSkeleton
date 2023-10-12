<script>
	import spotify from '$lib/images/spotify_svg.svg';
	import spotify2 from '$lib/images/spotify-32.ico';
	import { baseUrl } from '../../../utils/utils';
	import { Stretch } from 'svelte-loading-spinners';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let loggedIn = false;
	export let setlist = [];
	export let artist = '';
	let apiRequestSent = false;
	// let apiRequestSent = true;
	let waitingForApiResponse = false;
	// let waitingForApiResponse = true;
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
			let truncatedSong = song.split(' ').slice(0, 6).join(' ');
			let sanitisedSong = truncatedSong.replace(/[^a-z0-9 ]/gi, ' ');
			let url = generateUrl(sanitisedSong, artist);
			let resp = await fetch(baseUrl(url));
			let json = await resp.json();
			if (json.results.length === 0) {
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
		return { id: json.playlistId, url: json.url };
	}

	async function addTracksToPlaylist(trackIds, playlistId, playlistUrl) {
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
			const toastSetting = {
				message: 'Failed creating playlist :(',
				background: 'variant-filled-warning'
			};
			toastStore.trigger(toastSetting);
			apiRequestFail = true;
			apiRequestSent = false;
		} else {
			const toastSetting = {
				message: 'Playlist created!',
				action: {
					label: 'View in Spotify',
					response: () => openInSpotify(playlistUrl)
				},
				hoverable: true,
				autohide: false,
				background: 'spotify-button'
			};
			toastStore.trigger(toastSetting);
		}
	}

	function openInSpotify(url) {
		window.open(url, '_blank');
	}

	async function createPlaylist() {
		if (setlist.length === 0) {
			return;
		}

		let idsToAdd = await getTrackIds();
		let { id: playlistId, url: playlistUrl } = await createEmptyPlaylist();

		await addTracksToPlaylist(idsToAdd, playlistId, playlistUrl);
	}

	async function handleClick() {
		apiRequestFail = false;
		let resp = await fetch(baseUrl('api/spotify/login'));
		let json = await resp.json();
		if (json.signedIn) {
			apiRequestSent = true;
			waitingForApiResponse = true;
			await createPlaylist();
			waitingForApiResponse = false;
		} else {
			window.open(json.url, 'Spotify login', 'height=900,width=850');
			loggedIn = true;
		}
	}

	function showLoadingSpinner(apiRequestSent, waitingForApiResponse) {
		return apiRequestSent && waitingForApiResponse;
	}

	function buttonClasses(apiRequestFail, waitingForApiResponse) {
		let classes = 'spotify-button';
		if (apiRequestFail) {
			classes += ' failed';
		}
		if (!waitingForApiResponse) {
			classes += ' py-3';
		}
		return classes;
	}
</script>

<button
	type="button"
	disabled={apiRequestSent}
	on:click|preventDefault={handleClick}
	class="btn px-4 {buttonClasses(apiRequestFail, waitingForApiResponse)}"
>
	{#if !waitingForApiResponse}
		<i class="fa-brands fa-spotify fa-2xl" />
	{/if}
	<div class="flex flex-row items-center justify-center">
		{#if loggedIn}
			{#if apiRequestSent}
				{#if waitingForApiResponse}
					<Stretch size="32" color="#222" unit="px" duration="1s" />
				{:else}
					Created!
				{/if}
			{:else}
				<span>Save playlist</span>
			{/if}
		{:else}
			<span>Login</span>
		{/if}
	</div>
</button>
