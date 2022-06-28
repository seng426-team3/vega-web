import {doGet, doPostFile} from './HTTPRequestAPI.js';

export function fetchNews(url, headers) {
    return doGet(url, headers['authorization']);
}

export function addNews(url, data, headers) {
    return doPostFile(url, data, headers);
}