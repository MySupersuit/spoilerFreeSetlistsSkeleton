<script>
	import Result from './Result.svelte';
	export let searchResults;
</script>

<div class="flex flex-col mx-18">
	{#each searchResults as result}
		<Result {result} />
	{/each}
</div>
