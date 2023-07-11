<script>
	import { onMount } from 'svelte';
	import SpotifyButton from './SpotifyButton.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let data;
	let spoilerFreeSetlist = [];
	let oldestSetlistInfo = {};
	let newestSetlistInfo = {};

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
			city: setlist.venue.city.name
		};
	}

	const formatDate = (date) => {
		let dateObj = new Date();
		let splits = date.split('-');
		let month = parseInt(splits[1], 10);
		dateObj.setMonth(month - 1);
		return `${splits[0]}th of ${dateObj.toLocaleString([], { month: 'long' })}, ${splits[2]}`;
	};

	onMount(() => {
		spoilerFreeSetlist = generateSpoilerFreeSetlist(data.setlists);
		newestSetlistInfo = getSetlistInfo(data.setlists[0]);
		oldestSetlistInfo = getSetlistInfo(data.setlists[data.setlists.length - 1]);
	});
</script>

<div class="flex flex-col flex-1 mx-2 sm:mx-32">
	<div class="setlist-content">
		<div class="p-4 bg-off-white">Setlist</div>
		<div class="flex flex-row setlist-list gap-4">
			<div class="flex flex-col gap-2 w-7/12 overflow-hidden">
				{#each spoilerFreeSetlist as song}
					<div class="pl-3 sm:pl-6">
						{song}
					</div>
				{:else}
					Loading...
				{/each}
			</div>
			{#if spoilerFreeSetlist.length > 0}
				<div
					class="flex flex-1 justify-center pr-3"
					transition:fade={{
						easing: cubicInOut,
						duration: 500
					}}
				>
					<div class="setlist-info-box">
						<span class="mb-4">{spoilerFreeSetlist.length} gigs from</span>
						<div class="setlist-info-box-element">
							<span>{oldestSetlistInfo.date}</span>
							<span class="text-xs">{oldestSetlistInfo.venue}, {oldestSetlistInfo.city}</span>
						</div>
						<div class="text-xs my-2">to</div>
						<div class="setlist-info-box-element">
							<span>{newestSetlistInfo.date}</span>
							<span class="text-xs">{newestSetlistInfo.venue}, {newestSetlistInfo.city}</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex mt-4 justify-center">
		<SpotifyButton />
	</div>
</div>
