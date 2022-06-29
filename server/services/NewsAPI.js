import {doGet, doPost2} from './HTTPRequestAPI.js';

export function fetchNews(url, headers) {
    return doGet(url, headers['authorization']);
}

export function addNews(url, data, headers) {
    return doPost2(url, data, headers['authorization']);
}

export function deleteNews(url, data, headers) {
    return doPost2(url, data, headers['authorization']);
}