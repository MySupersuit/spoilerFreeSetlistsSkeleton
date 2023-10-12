import { spotifyBaseUrl } from '../../../../utils/utils.js';

export async function GET({ cookies, url }) {
	let savedToken = cookies.get('spotify_token');
	if (!savedToken) {
		return new Response(JSON.stringify({ error: 'Not signed in (no token)' }), { status: 404 });
	}

	let artist = url.searchParams.get('artist');
	let song = url.searchParams.get('song');
	let query = `track:${song}%20artist:${artist}`;
	let spotifyUrl = spotifyBaseUrl(`search?q=${query}&type=track&limit=8`);

	let resp = await fetch(spotifyUrl, {
		headers: {
			Authorization: `Bearer ${savedToken}`
		}
	});
	let json = await resp.json();
	return new Response(JSON.stringify({ results: json.tracks.items }));
}
