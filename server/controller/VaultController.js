import express from 'express';
import {fetchSecrets, fetchAllSecrets, createSecret, readSecret, updateSecret, deleteSecret} from '../services/VaultRequestAPI.js';
import fileUpload from 'express-fileupload';

let router = express();

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post("/fetchsecrets", (req, res) => {
	console.log("Request: User secrets");
	fetchSecrets(process.env.API_URL + "/venus/vault/fetchsecrets", req.body.formData, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    });
})

router.get("/fetchallsecrets", (req, res) => {
	console.log("Request: All secrets");
	fetchAllSecrets(`${process.env.API_URL}/venus/admin/fetchallsecrets`, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    });
})

router.post("/createsecret", (req, res) => {
	console.log("Request: Create secret");
	createSecret(`${process.env.API_URL}/venus/vault/createsecret`, req.body.formData, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("Error:", error);
		res.send(error);
	});
});

router.post("/readsecret", (req, res) => {
	console.log("Request: Read secret")
	readSecret(`${process.env.API_URL}/venus/vault/readsecret`, req.body.formData, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	});
});

router.post("/secretupdate", (req, res) => {
	console.log("Request: Update secret")
	updateSecret(`${process.env.API_URL}/venus/vault/secretupdate`, req.body.formData, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	});
});

router.post("/deletesecret", (req, res) => {
	console.log("Request: Delete secret")
	deleteSecret(`${process.env.API_URL}/venus/vault/deletesecret`, req.body.formData, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	});
});

export default router;