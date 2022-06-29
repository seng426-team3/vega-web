import {addNews, fetchNews} from '../services/NewsAPI.js';
import express from 'express';

let router = express();

router.get("/fetchnews", (req, res) => {
    console.log("Entered fetch news");
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
    console.log("Entered add news");
    console.log(req);
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