import {doGet, doPostFile} from '../BaseAPI.js';

export function fetchNews(token) {
    console.log("fetchNews", token);
    return doGet(process.env.REACT_APP_API_URL + "/api/venus/news/fetchnews", token);
}

export function addNews(news, token) {
    console.log("addNews", token);
    return doPostFile(process.env.REACT_APP_API_URL + "/api/venus/news/addnews", token);
}