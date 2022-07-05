import {doGet, doPost2} from './HTTPRequestAPI.js';

export function fetchContactUs(url, headers) {
    return doGet(url, headers['authorization']);
}

export function addContactUs(url, data, headers) {
    return doPost2(url, data, headers['authorization']);
}
