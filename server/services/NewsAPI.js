import {doGet} from './HTTPRequestAPI.js';

export function fetchNews(url, headers) {
    return doGet(url, headers['authorization']);
}