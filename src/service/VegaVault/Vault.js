import {doPostFile, doGet} from '../BaseAPI.js';

export function fetchsecrets(token){
    let formData = new FormData;
    formData.append("token", token);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/fetchsecrets", formData);
}

export function fetchallsecrets(token){

	return doGet(process.env.REACT_APP_API_URL + "/api/venus/fetchallsecrets", token);
}

export function createsecret(file, token, secretname){
    let formData = new FormData;
    formData.append("file", file.data, file.name);
    formData.append("token", token);
    formData.append("secretname", secretname);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/createsecret", formData);
}

export function readsecret(secretid){
    let formData = new FormData;
    formData.append("secretid", secretid);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/readsecret", formData);
}

export function updatesecret(secretid, secretname, file){
    let formData = new FormData;
    formData.append("secretid", secretid);

    if (file != null) {
        formData.append("file", file.data, file.name);
    }
    if (secretname != null) {
        formData.append("secretname", secretname);
    }

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/updatesecret", formData);
}

export function deletesecret(secretid){
    let formData = new FormData;
    formData.append("secretid", secretid);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/deletesecret", formData);
}