import { dev } from '$app/environment';

export function baseUrl(path) {
	if (dev) {
		return `http://localhost:5173/${path}`;
	} else {
		return `https://spoiler-free-setlists.vercel.app/${path}`;
	}
}

export function spotifyBaseUrl(path) {
	return `https://api.spotify.com/v1/${path}`;
}

export function log(ns, msg, err = false) {
	err ? console.error(ns, msg) : console.log(ns, msg);
}
