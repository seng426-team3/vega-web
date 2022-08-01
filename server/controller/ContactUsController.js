import {fetchContactUs, addContactUs} from '../services/ContactUsAPI.js';
import express from 'express';

let router = express();
router.disable("x-powered-by");

router.get("/fetchcontactus", (req, res) => {
    fetchContactUs(process.env.API_URL + "/venus/contactus/fetchcontactus", req.headers)
        .then(response => {
            console.log("Response", response);
            res.send(response);
        })
        .catch(error => {
            console.log("ERROR:", error);
            res.send(error);
        })
});

router.post("/addcontactus", (req, res) => {
    var formData = req.body;
    addContactUs(process.env.API_URL + "/venus/contactus/addcontactus", formData, req.headers)
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