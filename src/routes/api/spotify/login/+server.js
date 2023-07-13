import { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } from '$env/static/private';
import { baseUrl, spotifyBaseUrl } from '../../../../utils/utils.js';

export async function GET({ cookies }) {
	let savedToken = cookies.get('spotify_token');
	let userId = cookies.get('spotify_user_id');
	if (savedToken) {
		if (!userId) {
			let userId = await getUserId(savedToken);
			cookies.set('spotify_user_id', userId, {
				httpOnly: true,
				sameSite: 'strict',
				secure: false,
				maxAge: 1000000
			});
		}
		return new Response(JSON.stringify({ signedIn: true }));
	}

	let state = Math.random().toString(36).slice(2, 17);
	let params = new URLSearchParams({
		response_type: 'code',
		client_id: SPOTIFY_CLIENT_ID,
		client_secret: SPOTIFY_SECRET,
		redirect_uri: baseUrl('code'),
		state,
		scope: 'playlist-modify-public playlist-modify-private'
	});
	let spotifyUrl = 'https://accounts.spotify.com/authorize?';
	let url = `${spotifyUrl}${params.toString()}`;
	return new Response(JSON.stringify({ url, signedIn: false }));
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
