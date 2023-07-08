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

<div class="flex flex-col items-center">
	<h1 class="pb-10 text-center">Find spoiler free setlists from your favourite artists</h1>

	<form on:submit|preventDefault={search} class="w-full bg-off-white" method="POST">
		<div class="searchbox__border flex flex-row">
			<input
				class="searchbox__box"
				bind:value={searchTerm}
				name="search"
				autocomplete="off"
				placeholder="Artist..."
				required
			/>
			<button class="searchbox__button invisible md:visible" />
		</div>
	</form>
</div>
