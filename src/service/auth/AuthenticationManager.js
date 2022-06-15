import {doPost} from '../BaseAPI.js';

export function login(userInfo){
	console.log("In Auth", userInfo);
	return doPost(process.env.REACT_APP_VEGA_WEB_SERVER_URL + "/api/login", userInfo);
} 