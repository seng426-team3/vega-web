import {doPostFile, doGet} from '../BaseAPI.js';

export function fetchsecrets(token){

	return doGet(process.env.REACT_APP_API_URL + "/api/venus/vault/fetchsecrets", token);
}

export function fetchallsecrets(token){

	return doGet(process.env.REACT_APP_API_URL + "/api/venus/vault/fetchallsecrets", token);
}

export function createsecret(file, secretname, token){
    let formData = new FormData();
    console.log("file secret: " + file);
    formData.append("file", file);
    //formData.append("secretname", secretname);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/createsecret?secretname=" + secretname, formData, token);
}

export function readsecret(secretid, token){
    let formData = new FormData();
    formData.append("secretid", secretid);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/readsecret", formData, token);
}

export function updatesecret(secretid, secretname, file, token){
    let formData = new FormData();
    formData.append("secretid", secretid);

    if (file != null) {
        formData.append("file", file.data, file.name);
    }
    if (secretname != null) {
        formData.append("secretname", secretname);
    }

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/updatesecret", formData, token);
}

export function deletesecret(secretid, token){
    let formData = new FormData();
    formData.append("secretid", secretid);

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/deletesecret", formData, token);
}