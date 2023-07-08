<script>
	import '../app.css';
	import Header from './Header.svelte';
	import './styles.css';
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

<!-- <style>


	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} -->
<!-- </style> -->
