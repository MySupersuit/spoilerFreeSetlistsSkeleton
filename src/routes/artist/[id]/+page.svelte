<script>
	import { onMount } from 'svelte';
	import SpotifyButton from './SpotifyButton.svelte';
	import { formatDate, log } from '../../../utils/utils';
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';

	const ns = 'routes/artist/[id]/+page';

	export let data;
	let spoilerFreeSetlist = [];
	let oldestSetlistInfo = {};
	let newestSetlistInfo = {};
	let artist = '';
	let setlistCount;

	onMount(() => {
		// log(ns, data.setlists);
		artist = data.setlists[0].artist.name;
		spoilerFreeSetlist = generateSpoilerFreeSetlist(data.setlists);
		newestSetlistInfo = getSetlistInfo(data.setlists[0]);
		oldestSetlistInfo = getSetlistInfo(data.setlists[data.setlists.length - 1]);
		setlistCount = data.setlists.length;
	});

	function getAllSongs(setlists) {
		let allSongs = setlists.flatMap((setlist) => {
			let set = setlist.sets.set;
			return set.flatMap((set) => {
				return set.song;
			});
		});
		return allSongs;
	}

	function buildSongCountMap(allSongs) {
		let map = new Map();
		allSongs.forEach((song) => {
			if (song.tape || !song.name) {
				return;
			}
			if (map.get(song.name)) {
				map.set(song.name, map.get(song.name) + 1);
			} else {
				map.set(song.name, 1);
			}
		});
		let sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
		return sortedMap;
	}

	function randomisedAverageSetlist(songMap) {
		let top20Songs = Array.from(songMap.entries()).slice(0, 20);
		let shuffled = top20Songs
			.map((entry) => ({ song: entry[0], sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ song }) => song);
		return shuffled;
	}

	function generateSpoilerFreeSetlist(setlists) {
		let allSongs = getAllSongs(setlists);
		let sortedMap = buildSongCountMap(allSongs);
		return randomisedAverageSetlist(sortedMap);
	}

	function getSetlistInfo(setlist) {
		return {
			date: formatDate(setlist.eventDate),
			venue: setlist.venue.name,
			city: setlist.venue.city.name,
			url: setlist.url,
		};
	}

	function openDrawer() {
		const drawerSetting = {
			id: 'infoDrawer',
			position: 'bottom',
			meta: { artist, oldestSetlistInfo, newestSetlistInfo, setlistCount },
			width: 'w-[100%] md:w-[65%] xl:w-[50%]',
			height: 'h-[65%] md:h-[40%]',
			padding: 'p-4',
			rounded: 'rounded-xl',
			bgDrawer: 'variant-filled-surface',
			regionBackdrop: 'justify-center',
		};
		drawerStore.open(drawerSetting);
	}
</script>

<div class="card bg-initial max-w-2xl mx-auto mt-10">
	<AppBar background="bg-initial" class="rounded-md">
		<svelte:fragment slot="lead">
			<span>{artist}'s average setlist</span>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<SpotifyButton loggedIn={data.loggedIn} bind:setlist={spoilerFreeSetlist} {artist} />
		</svelte:fragment>
	</AppBar>
	<hr />
	<div class="p-4 space-y-2">
		{#each spoilerFreeSetlist as song}
			<div class="pl-3 sm:pl-6">
				{song}
			</div>
		{:else}
			Loading...
		{/each}
	</div>
</div>

<div class="flex mt-4 mb-3 justify-center">
	<button class="btn-icon variant-filled" on:click={openDrawer}>
		<i class="fa-solid fa-arrow-up" />
	</button>
</div>
