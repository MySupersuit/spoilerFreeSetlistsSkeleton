<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header />

	<main class="main">
		<slot />
	</main>

	<footer class="footer">
		<p>
			Made by <a class="text-bold" href="https://github.com/mysupersuit">Tom Moran</a> with
			<a class="text-bold" href="https://kit.svelte.dev">SvelteKit</a>
		</p>
	</footer>
</div>