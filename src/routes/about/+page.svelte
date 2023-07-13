<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="flex flex-col flex-1 gap-4 text-md px-2 max-w-2xl mx-auto mt-10">
	<h1>About this app</h1>

	<p>
		This app takes a band's 20 most recent gigs and lists, in random order, the 20 most played songs
		in those gigs.
	</p>
	<p>
		It might be useful when you want to know roughly the songs that'll be played, but you don't want
		to ruin the order / opening / encore songs.
	</p>

	<p>
		All data comes from <a href="https://api.setlist.fm/docs/1.0/index.html">setlist.fm's API</a>
	</p>

	<p>Possible improvements on the way:</p>

	<ul>
		<li>- Recent big artists (so you don't have to think of someone to type in)</li>
		<li>- Better UI (obvs) (Skeleton.dev?)</li>
		<li>- More info about the recent gigs? List of em + dates + next ones?</li>
	</ul>
</div>
