<script>
	import { onMount } from 'svelte';

	export let data;
	let spoilerFreeSetlist = [];

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

	onMount(() => {
		let allSongs = getAllSongs(data.setlists);
		let sortedMap = buildSongCountMap(allSongs);
		spoilerFreeSetlist = randomisedAverageSetlist(sortedMap);
	});
</script>

<h1>Artist page</h1>
<div class="flex flex-1 flex-col">
	{#each spoilerFreeSetlist as song}
		<div>
			{song}
		</div>
	{:else}
		Loading...
	{/each}
</div>
