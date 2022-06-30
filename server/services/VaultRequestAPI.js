import {doGet, doPost, doPostFile} from './HTTPRequestAPI.js';
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

export function createSecret(url, data, headers){
	return doPostFile(url, data, headers);
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