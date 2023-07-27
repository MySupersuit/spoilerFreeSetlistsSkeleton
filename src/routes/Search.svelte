<script>
	import { createEventDispatcher } from 'svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import { debounce } from 'lodash';
	import { baseUrl, log } from '../utils/utils';
	import { Stretch } from 'svelte-loading-spinners';

	let autoCompleteOptions = [];
	let searching = false;
	let searchError = '';

	async function performSearch(term) {
		searching = true;
		searchError = '';

		const searchTerm = term;
		const response = await fetch(baseUrl(`api/search/${searchTerm}`));
		const data = await response.json();

		if (data.status === 404 && data.statusText === 'Not Found') {
			autoCompleteOptions = [];
			searchError = "No results - make sure you're using full words!";
			searching = false;
			return;
		}

		// setlist.fm search isn't great - might be best to just leave it at enter to search
		if (data.status !== 200 && data.status !== 404) {
			autoCompleteOptions = [];
			searchError = 'Error - please try again';
			searching = false;
			return;
		}

		// searchPerformed = true;
		searching = false;
		autoCompleteOptions = convertSearchResults(data.artists.splice(0, 10));
	}

	function convertSearchResults(results) {
		return results.map((result) => {
			return {
				name: result.name,
				value: result.mbid
			};
		});
	}

	let popupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let searchTerm = '';

	function onSubmit(e) {
		if (e.key === 'Enter' && searchTerm.length > 0) {
			performSearch(searchTerm);
		}
	}

	function searchClasses(autoCompleteOptions) {
		if (autoCompleteOptions.length > 0) {
			return 'visible';
		} else {
			return 'invisible';
		}
	}

	const onInput = debounce((e) => {
		if (searchTerm.length === 0) {
			autoCompleteOptions = [];
		}
		if (searchTerm.length <= 2) {
			return;
		}
		performSearch(searchTerm);
	}, 300);
</script>

<div class="flex flex-col items-center p-8 relative">
	<h1 class="h1 text-3xl mb-10 text-center text-surface-50">
		Find spoiler free setlists from your favourite artists
	</h1>

	<div class="w-full input-group flex flex-row">
		<div class="input-group-shim"><i class="fa-solid fa-search" /></div>
		<input
			class="input autocomplete bg-tertiary-50"
			type="search"
			bind:value={searchTerm}
			name="autocomplete-search"
			autocomplete="off"
			placeholder="Enter an artist..."
			required
			on:keydown={onSubmit}
			on:input={onInput}
			use:popup={popupSettings}
		/>
	</div>
	<div class="text-center pt-5 h-12">
		{#if searching}
			<Stretch size="50" color="#e68785" unit="px" duration="1s" />
		{:else if searchError}
			<h3 class="h3 text-center pt-5">{searchError}</h3>
		{/if}
	</div>
	<ul class="w-9/12 bg-surface-200-700-token rounded-lg border-2 border-secondary-500 max-h-72 h-72 overflow-auto absolute search_results {searchClasses(autoCompleteOptions)}">
		{#each autoCompleteOptions as result}
			<li class="py-2 px-2 hover:bg-surface-hover-token">
				<a href="/artist/{result.value}" class="flex flex-row items-center">
					<span class="ml-2">{result.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
