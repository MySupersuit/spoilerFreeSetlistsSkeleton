<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function search(event) {
		const data = new FormData(event.target);
		dispatch('performSearch', {
			term: searchTerm
		});
	}

	let searchTerm = '';
</script>

<div class="flex flex-col items-center mx-10">
	<div class="mb-5 sm:mb-14 px-2 py-1 text-center bg-off-white rounded-lg text-2xl sm:text-3xl">Find spoiler-free setlists from your favourite artists</div>

	<form on:submit|preventDefault={search} class="w-full px-6" method="POST">
		<div class="searchbox__border flex flex-row">
			<input
				class="searchbox__box"
				bind:value={searchTerm}
				name="search"
				autocomplete="off"
				placeholder="Enter an artist..."
				required
			/>
			<button class="searchbox__button hidden md:block" />
		</div>
	</form>
</div>
