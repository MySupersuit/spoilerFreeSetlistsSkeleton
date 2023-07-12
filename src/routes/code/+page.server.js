import { baseUrl } from '../../utils/baseUrl.js';

export async function load({ url, cookies }) {
	console.log('CALLING LOAD');
	let code = url.searchParams.get('code');
	let state = url.searchParams.get('state');
	let r = await fetch(baseUrl(`api/spotify/token?code=${code}&state=${state}`));
	let json = await r.json();

	cookies.set('spotify_token', json.access_token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		maxAge: json.expires_in
	});
	cookies.set('spotify_refresh_token', json.refresh_token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		maxAge: 1000000
	});
	cookies.set('spotify_user_id', json.userId, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		maxAge: 1000000
	});
	return { token: json.access_token };
}
