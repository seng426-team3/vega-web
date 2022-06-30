import {doPost, doGet, doPostFile} from './HTTPRequestAPI.js';

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
	console.log(headers);
	console.log(url);
	console.log(data);

	console.log(createVaultRequest('POST', data))

	return doVaultPost(url, data);
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

function createRequestOptions(headers, formData) {
    var requestOptions = {
        method: method,
        headers: {
          'Authorization': headers['authorization']
        },
        body: formData
      }
    return requestOptions;
}