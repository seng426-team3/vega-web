import {doGet, doPost, doPostFile, doTokenPost} from './HTTPRequestAPI.js';

export function fetchSecrets(url, headers){
	console.log(headers);
	return doGet(url, headers['authorization']);
}

export function fetchAllSecrets(url, headers){
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization']);
}

export function createSecret(url, data, headers){
	return doPostFile(url, data, headers);
}

export function readSecret(url, headers){
	console.log(url);

	return doTokenPost(url, undefined, headers['authorization']);
}

export function updateSecret(url, data, headers){
	console.log(url);

	if (data.file.name != undefined) {
		return doPostFile(url, data, headers);
	}
	return doTokenPost(url, undefined, headers['authorization'])
}

export function deleteSecret(url, headers){
	console.log(url);

	return doTokenPost(url, undefined, headers['authorization']);
}

export function shareSecret(url, headers) {
	console.log(url);

	return doTokenPost(url, undefined, headers['authorization']);
}