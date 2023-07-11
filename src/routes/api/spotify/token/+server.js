import { dev } from '$app/environment';
import { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } from '$env/static/private';

function getRedirectUri() {
	if (!dev) {
		return 'https://spoiler-free-setlists.vercel.app/code';
	} else {
		return 'http://localhost:5173/code';
	}
}

export async function GET({ url }) {
	let code = url.searchParams.get('code');
	let state = url.searchParams.get('state');
	if (state === null) {
		console.log('error in api/spotify/token');
		return new Response();
	}

	let baseUrl = 'https://accounts.spotify.com/api/token';
	let grantType = 'grant_type=authorization_code';
	let c = `code=${code}`;
	let redirectUri = `redirect_uri=${getRedirectUri()}`;
	let body = [grantType, c, redirectUri];
	body = body.join('&');

	let encodedString = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`);
	let r = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${encodedString}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	});

	let json = await r.json();
	return new Response(JSON.stringify(json));
}
