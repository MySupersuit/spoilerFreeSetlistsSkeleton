import { API_KEY } from '$env/static/private';

export async function GET({ params }) {
	const { term } = params;
	let url = `https://api.setlist.fm/rest/1.0/search/artists?sort=relevance&artistName=${term}`;

  console.log('url', url);
	console.log('api', API_KEY);

	const response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'x-api-key': API_KEY,
			'Accept-encoding': 'gzip, deflate, br'
		}
	});
  console.log('resp', response);
	if (response.status !== 200) {
		return new Response(JSON.stringify({ status: response.status }));
	}
	const json = await response.json();
	return new Response(JSON.stringify({ artists: json.artist, status: response.status }));
}
