import { API_KEY } from '$env/static/private';

export async function GET({ params }) {
	// note the capitalized method name
	const { id } = params;
	let url = `https://api.setlist.fm/rest/1.0/artist/${id}/setlists`;

	const response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'x-api-key': API_KEY,
			'Accept-encoding': 'gzip, deflate, br'
		}
	});

	if (response.status !== 200) {
		return new Response(JSON.stringify({ status: response.status }));
	}
	const json = await response.json();
	return new Response(JSON.stringify({ setlists: json.setlist, status: response.status }));
}
