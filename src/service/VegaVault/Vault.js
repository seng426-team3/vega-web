import {doPostFile, doGet} from '../BaseAPI.js';

export function fetchsecrets(token){

	return doGet(process.env.REACT_APP_API_URL + "/api/venus/fetchsecrets", token);
}

export function fetchallsecrets(token){

	return doGet(process.env.REACT_APP_API_URL + "/api/venus/fetchallsecrets", token);
}

export function createsecret(file, secretname){
    let formData = new FormData;
    formData.append("file", file.data, file.name);
    formData.append("secretname", secretname);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/createsecret", formData, token);
}

export function readsecret(secretid, token){
    let formData = new FormData;
    formData.append("secretid", secretid);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/readsecret", formData, token);
}

export function updatesecret(secretid, secretname, file, token){
    let formData = new FormData;
    formData.append("secretid", secretid);

    if (file != null) {
        formData.append("file", file.data, file.name);
    }
    if (secretname != null) {
        formData.append("secretname", secretname);
    }

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/updatesecret", formData, token);
}

export function deletesecret(secretid, token){
    let formData = new FormData;
    formData.append("secretid", secretid);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/deletesecret", formData, token);
}