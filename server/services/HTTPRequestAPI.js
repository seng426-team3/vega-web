import fetch from 'node-fetch';
import Promise from 'promise';
import FormData from 'form-data';

export async function doPost(url, data){
	const response = await fetch(url, createRequestOptions('POST', data));
	return await handleResponse(response);
}

export async function doPost2(url, data, token){
	const response = await fetch(url, createRequestOptions('POST', data, token));
	return await handleResponse(response);
}

export async function doGet(url, token){
  const response = await fetch(url, createRequestOptions('GET', undefined, token));
  return await handleResponse(response);
}

export async function doPostFile(url, data, headers){
  const response = await fetch(url, createRequestOptionsForFile('POST', data.file.data, data.file.name, headers));
  return await handleResponse(response);
}

function createRequestOptionsForFile(method, data_string, filename, headers){
  const formData = new FormData();
  formData.append("file", data_string, filename);
  var requestOptions = {
    method: method,
    dataType: 'json',
    headers: {
      'Authorization': headers['authorization'],
      'content-type': 'application/json'
    },
    body: formData
  }
  console.log(requestOptions)
  return requestOptions;
}

function  createRequestOptions(method, data, token){
  var requestOptions = {
    'method': method,
    'dataType': 'json',
    'headers': {
      'authorization': token,
      'content-type': 'application/json'
    }
  }
  if(data){
    requestOptions.body = JSON.stringify(data);
    console.log(requestOptions.body);
  }
  return requestOptions;
}

export async function handleResponse(response) {
  let result;
 
   result = handleJSONResult(await response.text());
  if (response.ok) {
    return result;
  }
  // handle error
  console.warn('Response is not OK:', response.status);
  console.warn('Response body:', result);
  let message = response.statusText; // by default
  if (result && result.message) {
    message = result.message;
  } else if (result && result.description) {
    message = result.description;
  }
  return Promise.reject({
    code: response.status,
    message: message
  });
}

export function handleJSONResult(result) {
  try {
    return JSON.parse(result);
  } catch (error) {
    console.info('Response is not a valid json. Processing it as a text.');
    return result;
  }
}