import {doPost} from './HTTPRequestAPI.js';

export function fetchSecrets(url, data, headers){
	console.log(headers);
    let formData = new FormData;
    formData.append("token", data.token);

    requestOptions = createRequestOptions(headers, formData);

	return doPost(url, requestOptions);
}

export function fetchAllSecrets(url, data, headers){
	console.log(headers);
	console.log(url);

	return doPost(url, data);
}

export function createSecret(url, data, files, headers){
	console.log(headers);
	console.log(url);
	
    let formData = new FormData;
    formData.append("file", files.file.data, files.file.name);
    formData.append("token", data.token);
    formData.append("secretname", data.secrename);

    requestOptions = createRequestOptions(headers, formData);

	return doPost(url, requestOptions);
}

export function readSecret(url, data, headers){
	console.log(url);
	
    let formData = new FormData;
    formData.append("secretid", data.secretid);

    requestOptions = createRequestOptions(headers, formData);

	return doPost(url, requestOptions);
}

export function updateSecret(url, data, files, headers){
	console.log(url);
	
    let formData = new FormData;
    formData.append("file", files.file.data, files.file.name);

    requestOptions = createRequestOptions(headers, formData);

	return doPost(url, requestOptions);
}

export function deleteSecret(url, data, headers){
	console.log(url);
    
    let formData = new FormData;
    formData.append("secretid", data.secretid);

    requestOptions = createRequestOptions(headers, formData);

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