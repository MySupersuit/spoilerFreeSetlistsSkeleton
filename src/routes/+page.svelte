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
		searchResults = data.artists.slice(0, 5);
	}
</script>

<svelte:head>
	<title>Spoiler Free Setlist.fm</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="main flex flex-1 dry-cleaning-background px-2">
	<div class="flex flex-col flex-1 justify-center sm:pb-20">
		<Search on:performSearch={performSearch} />

		<div class="mt-6">
			{#if showLoading}
				<div class="max-w-xl m-auto bg-off-white rounded-lg text-center p-4">Loading...</div>
			{:else if searchError}
				<div class="max-w-xl m-auto bg-off-white rounded-lg text-center p-4">
					Your search returned no results! Try again :)
				</div>
			{:else}
				<Results {searchResults} />
			{/if}
		</div>
	</div>
</main>
