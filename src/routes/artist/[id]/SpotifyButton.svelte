<script>
  import spotify from '$lib/images/spotify_svg.svg'

  async function handleClick() {
    // if already signed in, save the playlist to their account
    // check cookie in the below call, return something else if they're already signed in
    // Then change the buttotn text to be Saving..., then Saved! (and disable it until refresh)
    // + handle errors
    let resp = await fetch(`http://localhost:5173/api/spotify/login`);
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