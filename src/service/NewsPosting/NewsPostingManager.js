import {doPost2, doGet} from '../BaseAPI.js';

export function fetchNews(token) {
    console.log("fetchNews", token);
    return doGet(process.env.REACT_APP_API_URL + "/api/venus/news/fetchnews", token);
}

export function addNews(news, token) {
    console.log("news", news);
    return doPost2(process.env.REACT_APP_API_URL + "/api/venus/news/addnews", news, token);
}