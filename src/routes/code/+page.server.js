import { dev } from '$app/environment';

// TODO make this a util function that returns the baseURL
function getUrl(code, state) {
	if (!dev) {
		return `https://spoiler-free-setlists.vercel.app/api/spotify/token?code=${code}&state=${state}`;
	} else {
		return `http://localhost:5173/api/spotify/token?code=${code}&state=${state}`;
	}
}

export async function load({ url, cookies }) {
	console.log('CALLING LOAD');
	let code = url.searchParams.get('code');
	let state = url.searchParams.get('state');
	let r = await fetch(getUrl(code, state));
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
	return { token: json.access_token };
}
