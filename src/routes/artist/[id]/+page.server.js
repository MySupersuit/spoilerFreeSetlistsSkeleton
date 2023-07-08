import { dev } from '$app/environment';

export async function load({ params }) {
	const { id } = params;

	const response = await fetch(getUrl(id));
	const json = await response.json();

	return json;
}

function getUrl(id) {
	if (!dev) {
		return 'tbd';
	} else {
		return `http://localhost:5173/api/setlist/${id}`;
	}
}
