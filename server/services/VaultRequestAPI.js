import {doGet} from './HTTPRequestAPI.js';
import fetch from 'node-fetch';
import Promise from 'promise';
import FormData from 'form-data';

export function fetchSecrets(url, headers){
	console.log(headers);
	return doGet(url, headers['authorization']);
}

export function fetchAllSecrets(url, headers){
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization']);
}

export function createSecret(url, headers, data){
	let formData = new FormData;

	formData.append('file', data.file.data, data.file.name);
	formData.append('secretname', "Super Secret");

	return doVaultPost(url, headers, formData);
}

export function readSecret(url, data, headers){
	console.log(url);

    requestOptions = createRequestOptions(headers, data);

	return doPost(url, requestOptions);
}

export function updateSecret(url, data, headers){
	console.log(url);

    requestOptions = createRequestOptions(headers, data);

	return doPost(url, requestOptions);
}

export function deleteSecret(url, data, headers){
	console.log(url);

    requestOptions = createRequestOptions(headers, data);

	return doPost(url, requestOptions);
}

async function doVaultPost(url, headers, formData){
	const response = await fetch(url, createVaultRequest("POST", headers, formData));
	return await handleResponse(response);
}

function createVaultRequest(method, headers, formData) {

	var requestOptions = {
	  'method': method,
	  'headers': {
		'Authorization': headers['authorization'],
		'Content-type': 'multipart/form-data; boundary=${formData._boundary}'
	  },
	  'body': formData
	}
	return requestOptions;
  }