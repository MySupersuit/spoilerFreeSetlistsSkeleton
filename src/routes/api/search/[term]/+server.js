import { API_KEY } from '$env/static/private';
import { log } from '../../../../utils/utils.js';

const ns = 'routes/api/search/[term]/+server';

export async function GET({ params }) {
	const { term } = params;
	let url = `https://api.setlist.fm/rest/1.0/search/artists?sort=relevance&artistName=${term}`;

	const response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'x-api-key': API_KEY,
			'Accept-encoding': 'gzip, deflate, br'
		}
	});
	if (response.status === 404 && response.statusText == 'Not Found') {
		log(ns, `bad search ${term}`, true);
		return new Response(
			JSON.stringify({ status: response.status, statusText: response.statusText })
		);
	}
	if (response.status !== 200) {
		log(ns, 'other error', true);
		return new Response(JSON.stringify({ status: response.status, statusText: 'Other error' }));
	}
	const json = await response.json();
	return new Response(
		JSON.stringify({ artists: json.artist, status: response.status, statusText: 'OK' })
	);
}
