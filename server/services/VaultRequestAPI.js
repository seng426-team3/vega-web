import {doPost} from './HTTPRequestAPI.js';

export function fetchSecrets(url, data, headers){
	console.log(headers);

    requestOptions = createRequestOptions(headers, data);

	return doPost(url, requestOptions);
}

export function fetchAllSecrets(url, headers){
	console.log(headers);
	console.log(url);

	return doPost(url, headers['autorization']);
}

export function createSecret(url, data, headers){
	console.log(headers);
	console.log(url);

    requestOptions = createRequestOptions(headers, data);

	return doPost(url, requestOptions);
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