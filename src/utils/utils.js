import { dev } from '$app/environment';

export function baseUrl(path) {
	if (dev) {
		return `http://localhost:5173/${path}`;
	} else {
		return `https://spoiler-free-setlists-azure.vercel.app/${path}`;
	}
}

export function spotifyBaseUrl(path) {
	return `https://api.spotify.com/v1/${path}`;
}

export function log(ns, msg, err = false) {
	err ? console.error(ns, msg) : console.log(ns, msg);
}

// turns date in form 'dd-mm-yyyy' => ddth <word month>, yyyy
export function formatDate(date) {
	let splits = date.split('-');
	let dateObj = new Date(splits[2], splits[1]-1, splits[0]);
	let options = { day: 'numeric', year: 'numeric', month: 'long' };
	let string = dateObj.toLocaleDateString(undefined, options);
	let parts = string.split(' ');
	let day = dateOrdinal(parts[0]);
	
	return `${day} ${parts[1]} ${parts[2]}`;
}

function dateOrdinal(day) {
	let lastNumber = day[day.length-1];
	if (lastNumber === '1') return `${day}st`;
	if (lastNumber === '2') return `${day}nd`;
	if (lastNumber === '3') return `${day}rd`;
	return `${day}th`; 

}
