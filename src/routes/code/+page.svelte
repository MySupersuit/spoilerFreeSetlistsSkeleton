<script>
	import { beforeUpdate, onMount } from 'svelte';

  beforeUpdate(() => {
    parent.close();
  })
</script>

<h1 class="p-5">
  Logging into Spotify...
</h1>