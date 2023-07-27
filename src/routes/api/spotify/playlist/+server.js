import { log, spotifyBaseUrl } from '../../../../utils/utils.js';

const ns = 'routes/api/spotify/playlist/+server';

export async function POST({ cookies, request }) {
	let body = await request.json();
	let { artistName } = body;

	let userId = cookies.get('spotify_user_id');
	if (!userId) {
		// fetch and save
		log(ns, 'no user ID', true);
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
			name: `${artistName}: Spoiler-free setlist`,
			description: `A randomised average setlist from ${artistName}'s last ~20 gigs. Made with https://spoiler-free-setlists-azure.vercel.app`
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
