<script>
	// Your selected Skeleton theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import {
		AppShell,
		Avatar,
		Drawer,
		LightSwitch,
		Toast,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Drawer class="mx-auto">
	<div class="flex flex-col h-full">
		<div class="flex flex-col self-center text-center my-4">
			<h1 class="h1">{$drawerStore.meta.artist}</h1>
			<h3 class="h3">played {$drawerStore.meta.setlistCount} gigs from...</h3>
		</div>
		<hr class="!border-t-4" />
		<div class="self-center h-full w-full text-center grid grid-cols-2">
			<div class="px-4 py-10 flex flex-col border-r-2 border-surface-300-600-token">
				<h3 class="h3 mb-2">{$drawerStore.meta.oldestSetlistInfo.date}</h3>
				<h6 class="h6 mb-5">
					{$drawerStore.meta.oldestSetlistInfo.venue}, {$drawerStore.meta.oldestSetlistInfo.city}
				</h6>
				<a
					class="underline text-tertiary-50 hover:text-tertiary-600 dark:text-primary-500 dark:hover:text-primary-700"
					href={$drawerStore.meta.oldestSetlistInfo.url}
					target="_blank">Link to setlist - careful, here lies spoilers!</a
				>
			</div>
			<div class="px-4 py-10">
				<h3 class="h3 mb-2">{$drawerStore.meta.newestSetlistInfo.date}</h3>
				<h6 class="h6 mb-5">
					{$drawerStore.meta.newestSetlistInfo.venue}, {$drawerStore.meta.newestSetlistInfo.city}
				</h6>
				<a
					class="underline text-tertiary-50 hover:text-tertiary-600 dark:text-primary-500 dark:hover:text-primary-700"
					href={$drawerStore.meta.newestSetlistInfo.url}
					target="_blank">Link to setlist - careful, here lies spoilers!</a
				>
			</div>
		</div>
	</div>
</Drawer>
<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-200-700-token text-surface-700-200-token" class="px-4 py-2">
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl">spoiler free setlist.fm</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="dropdown block sm:hidden">
					<button class="btn variant-filled justify-between">
						<i class="fa-solid fa-bars"></i>
					</button>
					<nav class="mt-[2px] card variant-outline shadow-xl px-4 py-2 dropdown_content flex-col space-y-1 items-center">
						<a href="/"><strong>home</strong></a>
						<a href="/about"><strong>about</strong></a>
						<a href="https://github.com/mysupersuit" target="_blank"
							><div class="github_svg bg-surface-900-50-token" /></a
						>
					</nav>
				</div>
				<LightSwitch />
				<div class="hidden sm:flex space-x-2 flex-row items-center">
					<a href="/"><strong>home</strong></a>
					<a href="/about"><strong>about</strong></a>
					<a href="https://github.com/mysupersuit" target="_blank"
						><div class="github_svg bg-surface-900-50-token" /></a
					>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="bg-surface-200-700-token text-surface-700-200-token text-center py-1">
			<p>
				Made by <a
					href="https://github.com/mysupersuit"
					class="underline text-surface-700 hover:text-secondary-800 dark:text-primary-500 dark:hover:text-primary-700"
					><strong>@mysupersuit</strong></a
				>
				with
				<a
					href="https://kit.svelte.dev"
					class="underline text-surface-700 hover:text-secondary-800 dark:text-primary-500 dark:hover:text-primary-700"
					><strong>SvelteKit</strong></a
				>
			</p>
		</div>
	</svelte:fragment>
</AppShell>
