import { baseUrl, log } from '../../../utils/utils.js';

const ns = 'routes/artist/[id]/+page.server';

export async function load({ params, cookies }) {
	const { id } = params;

	const response = await fetch(baseUrl(`api/setlist/${id}`));
	log(ns, response);
	const json = await response.json();
	log(ns, json);
	const spotifyAccessToken = cookies.get('spotify_token');
	json.loggedIn = Boolean(spotifyAccessToken);

	return json;
}
