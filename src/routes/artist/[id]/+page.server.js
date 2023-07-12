import { baseUrl } from '../../../utils/baseUrl.js';

export async function load({ params, cookies }) {
	const { id } = params;

	const response = await fetch(baseUrl(`api/setlist/${id}`));
	const json = await response.json();
	const spotifyAccessToken = cookies.get('spotify_token');
	json.loggedIn = Boolean(spotifyAccessToken);

	return json;
}
