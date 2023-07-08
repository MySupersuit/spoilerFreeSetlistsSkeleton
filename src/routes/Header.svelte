<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header class="bg-slate-300">
	<div class="h-fit-content flex justify-between mx-6 mt-2 mb-3">
		<div class="flex flex-row">
			<span class="self-center pr-2 text-lg md:text-4xl text-bold">spoiler free setlist.fm</span>
			<!-- <img src="https://w1.cdn.setlistfm.com/img/logo-slogan-horiz.png" /> -->
		</div>
		<div class="flex flex-row gap-2 items-center">
			<a class="text-bold" href="/">Home</a>
			<a class="text-bold" href="/about">About</a>
			<a class="w-10" href="https://github.com/mysupersuit">
				<img src={github} alt="GitHub logo link" />
			</a>
		</div>
	</div>
</header>
