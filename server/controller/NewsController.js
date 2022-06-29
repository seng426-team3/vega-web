import {addNews, fetchNews} from '../services/NewsAPI.js';
import express from 'express';

let router = express();

router.get("/fetchnews", (req, res) => {
    fetchNews(process.env.API_URL + "/venus/news/fetchnews", req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })
});

router.post("/addnews", (req, res) => {
    var formData = req.body;
    addNews(process.env.API_URL + "/venus/news/addnews", formData, req.headers)
            .then(response => {
                console.log("Response", response);
                res.send(response);
            })
            .catch(error => {
                console.log("ERROR:", error);
                res.send(error);
            });
});

export default router;