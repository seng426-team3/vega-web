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

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/createsecret?secretname=" 
        + secretname, formData, token);
}

export function readsecret(secretid, token){

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/readsecret?secretid=" 
        + secretid, undefined, token);
}

export function updatesecret(secretid, secretname, file, token){
    var secretnameParam = "";
    let formData = new FormData();

    if (file != undefined && file != null) {
        formData.append("file", file);
        console.log("File received");
    }
    else {
        console.log("No file given");
    }
    if (secretname != undefined && secretname != null && secretname != "") {
        secretnameParam = "&secretname=" + secretname;
        console.log("Name Received");
    }
    else {
        console.log("No secret name given");
    }

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/secretupdate?secretid=" 
        + secretid + secretnameParam, formData, token);
}

export function deletesecret(secretid, token){
    console.log(secretid);
    console.log(token);
	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/deletesecret?secretid="
        + secretid, undefined, token);
}

export function sharesecret(secretid, targetuser, token){

	return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/vault/sharesecret?secretid=" 
        + secretid + "&targetuser=" + targetuser, undefined, token);
}