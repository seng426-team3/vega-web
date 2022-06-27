import {doGet} from '../BaseAPI.js';

export function fetchNews(token) {
    console.log("fetchNews", token);
    return doGet(process.env.REACT_APP_API_URL + "/api/venus/fetchnews", token);
}