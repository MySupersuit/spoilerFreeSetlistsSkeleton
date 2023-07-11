<script>
	import { dev } from '$app/environment';
  import spotify from '$lib/images/spotify_svg.svg'

  // TODO make this a util function that returns the baseURL
  function getUrl() {
    if (!dev) {
      return 'https://spoiler-free-setlists.vercel.app/api/spotify/login'
    } else {
      return 'http://localhost:5173/api/spotify/login';
    }
  }

  async function handleClick() {
    // if already signed in, save the playlist to their account
    // check cookie in the below call, return something else if they're already signed in
    // Then change the buttotn text to be Saving..., then Saved! (and disable it until refresh)
    // + handle errors
    let resp = await fetch(getUrl());
    let json = await resp.json();
    if (json.signedIn) {
      console.log('SAving the playlist boiii');
      // do saving the playlist stuff
    } else {
      window.open(json.url, 'Spotify login', 'height=900,width=850');
    }
  }
</script>

<button on:click|preventDefault={handleClick} class="spotify-button">
  <div class="flex flex-row items-center justify-between">
    <img class="h-9 mr-3" src={spotify} alt="spotify logo"/>
    <span>Spotify it (WIP)</span>
  </div>
</button>