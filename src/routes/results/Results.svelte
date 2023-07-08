<script>
	import Result from './Result.svelte';
	export let searchResults;
</script>

{#if searchResults.length > 0}
	<div class="flex flex-col max-w-xl m-auto bg-off-white rounded-lg p-3">
		{#each searchResults as result}
			<Result {result} />
		{/each}
	</div>
{/if}
