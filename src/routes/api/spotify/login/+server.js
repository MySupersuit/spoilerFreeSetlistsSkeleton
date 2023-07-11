import { dev } from '$app/environment';
import { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } from '$env/static/private';

function redirectUri() {
	if (!dev) {
		return 'https://spoiler-free-setlists.vercel.app/code';
	} else {
		return 'http://localhost:5173/code';
	}
}

export async function GET({ cookies }) {
	let savedToken = cookies.get('spotify_token');
	if (savedToken) {
		return new Response(JSON.stringify({ signedIn: true }));
	}
	let state = Math.random().toString(36).slice(2, 17);
	let params = new URLSearchParams({
		response_type: 'code',
		client_id: SPOTIFY_CLIENT_ID,
		client_secret: SPOTIFY_SECRET,
		redirect_uri: redirectUri(),
		state,
		scope: 'playlist-modify-public playlist-modify-private'
	});
	let spotifyUrl = 'https://accounts.spotify.com/authorize?';
	let url = `${spotifyUrl}${params.toString()}`;
	return new Response(JSON.stringify({ url, signedIn: false }));
}
