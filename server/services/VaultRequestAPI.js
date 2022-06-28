import {handleResponse, doPost} from './HTTPRequestAPI.js';

export function fetchSecrets(url, headers){
	console.log(headers);
	return doPost(url, headers['authorization']);
}

export function fetchAllSecrets(url, headers){
	console.log(headers);
	console.log(url);
	return doPost(url, headers['authorization']);
}

export function createSecret(url, headers){
	console.log(headers);
	console.log(url);
	return doPost(url, headers['authorization']);
}

export function readSecret(url,headers){
	console.log(url);
	return doPost(url, headers['authorization']);
}

export function updateSecret(url,headers){
	console.log(url);
	return doPost(url, headers['authorization']);
}

export function deleteSecret(url,headers){
	console.log(url);
	return doPost(url, headers['authorization']);
}