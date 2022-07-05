import {doPost2, doGet} from '../BaseAPI.js';

export function fetchContactUs(token) {
    return doGet(process.env.REACT_APP_API_URL + "/api/venus/contactus/fetchcontactus", token);
}

export function addContactUs(contactus, token) {
    return doPost2(process.env.REACT_APP_API_URL + "/api/venus/contactus/addcontactus", contactus, token);
}
