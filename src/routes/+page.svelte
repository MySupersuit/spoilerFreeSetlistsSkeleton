<script>
	import Search from './Search.svelte';
	import { baseUrl } from '../utils/utils';
	import { Stretch } from 'svelte-loading-spinners';

	let searchResultsTest = [
		{
			mbid: 'test',
			name: 'Father John Misty'
		},
		{
			mbid: 'test1',
			name: 'Tame impala'
		},
		{
			mbid: 'test2',
			name: 'Radiohead'
		}
	];
	let searchResults = [];
	let searching = false;
	// let searching = true;
	let searchPerformed = false;
	let searchError = false;
	$: showLoading = searching;

	async function clearSearch() {
		searchResults = [];
	}

	/**
	 * @param {{ detail: { term: any; }; }} event
	 */
	async function performSearch(event) {
		searching = true;
		searchError = false;
		searchResults = [];

		const searchTerm = event.detail.term;
		const response = await fetch(baseUrl(`api/search/${searchTerm}`));
		const data = await response.json();

		if (data.status !== 200) {
			searchResults = [];
			searching = false;
			searchError = true;
			return;
		}

		searchPerformed = true;
		searching = false;
		searchResults = data.artists.slice(0, 5);
	}
</script>

<svelte:head>
	<title>spoiler free setlist.fm</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div
	class="flex flex-auto justify-center items-center w-full h-full dry_cleaning_background overflow-y-hidden"
>
	<Search on:performSearch={performSearch} on:clearSearch={clearSearch} />
</div>
