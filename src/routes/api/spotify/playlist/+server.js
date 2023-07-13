// import { dev } from '$app/environment';

import { spotifyBaseUrl } from '../../../../utils/utils.js';

export async function POST({ cookies }) {
	// get name from url params
	let userId = cookies.get('spotify_user_id');
	if (!userId) {
		// fetch and save
		console.log('no user id');
	}

	let savedToken = cookies.get('spotify_token');
	if (!savedToken) {
		return new Response(JSON.stringify({ error: 'Not signed in (no token)' }), { status: 404 });
	}

	let url = spotifyBaseUrl(`users/${userId}/playlists`);
	let resp = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${savedToken}`
		},
		body: JSON.stringify({
			name: 'Test playlist',
			description: 'Test description'
		})
	});

	let json = await resp.json();
	return new Response(JSON.stringify({ playlistId: json.id, url: json.external_urls.spotify }));
}

export async function PUT({ cookies, request }) {
	let body = await request.json();
	let { trackIds, playlistId } = body;

	let savedToken = cookies.get('spotify_token');
	if (!savedToken) {
		return new Response(JSON.stringify({ error: 'Not signed in (no token)' }), { status: 404 });
	}

	let spotifyUrl = spotifyBaseUrl(`playlists/${playlistId}/tracks`);
	let resp = await fetch(spotifyUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${savedToken}`
		},
		body: JSON.stringify({
			uris: trackIds
		})
	});
	if (resp.status === 201) {
		return new Response(JSON.stringify({ ok: 'ok' }));
	} else {
		return new Response(JSON.stringify({ ok: false, status: resp.status }));
	}
}
