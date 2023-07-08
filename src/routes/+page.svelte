<script>
	import Search from './Search.svelte';
	import Results from './results/Results.svelte';
	// import Description from './Description.svelte';
	import { dev } from '$app/environment';

	let searchResults = [];
	let searching = false;
	let searchPerformed = false;
	let searchError = false;
	$: showLoading = searching;

	function getUrl(searchTerm) {
		if (!dev) {
			return `https://spoiler-free-setlist-fm.vercel.app/api/search/${searchTerm}`;
		} else {
			return `http://localhost:5173/api/search/${searchTerm}`;
		}
	}

	/**
	 * @param {{ detail: { term: any; }; }} event
	 */
	async function performSearch(event) {
		searching = true;
		searchError = false;

		const searchTerm = event.detail.term;
		const response = await fetch(getUrl(searchTerm));
		const data = await response.json();

		if (data.status !== 200) {
			searchResults = [];
			searching = false;
			searchError = true;
			return;
		}

		searchPerformed = true;
		searching = false;
		searchResults = data.artists;
		return data.artists;
	}
</script>

<svelte:head>
	<title>Spoiler Free Setlist.fm</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="flex flex-col mt-20 mx-5 justify-center">
		<Search on:performSearch={performSearch} />

		<div class="mt-10">
			{#if showLoading}
				Loading...
			{:else if searchError}
				Your search returned no results!
			{:else}
				<Results {searchResults} />
			{/if}
		</div>
	</div>
</section>
