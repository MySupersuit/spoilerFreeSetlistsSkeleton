import { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } from '$env/static/private';
import { spotifyBaseUrl, baseUrl } from '../../../../utils/utils.js';

export async function GET({ url }) {
	let code = url.searchParams.get('code');
	let state = url.searchParams.get('state');
	if (state === null) {
		console.log('error in api/spotify/token');
		return new Response();
	}

	let spotifyUrl = 'https://accounts.spotify.com/api/token';
	let grantType = 'grant_type=authorization_code';
	let c = `code=${code}`;
	let redirectUri = `redirect_uri=${baseUrl('code')}`;
	let body = [grantType, c, redirectUri];
	body = body.join('&');

	let encodedString = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`);
	let r = await fetch(spotifyUrl, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${encodedString}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	});

	let json = await r.json();

	let userId = await getUserId(json.access_token);
	json.userId = userId;

	return new Response(JSON.stringify(json));
}

async function getUserId(token) {
	let meUrl = spotifyBaseUrl('me');
	let resp = await fetch(meUrl, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	let json = await resp.json();
	console.log(json.id);
	return json.id;
}
