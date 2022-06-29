import {doGet, doPost2} from './HTTPRequestAPI.js';

export function fetchNews(url, headers) {
    return doGet(url, headers['authorization']);
}

export function addNews(url, data, headers) {
    console.log("newAPI:");
    console.log(data);
    return doPost2(url, data, headers['authorization']);
}