import express from 'express';
import {fetchSecrets, fetchAllSecrets, createSecret, readSecret, updateSecret, deleteSecret, shareSecret} from '../services/VaultRequestAPI.js';

let router = express();
router.disable("x-powered-by");

router.get("/fetchsecrets", (req, res) => {
	console.log("Request: User secrets");
	fetchSecrets(process.env.API_URL + "/venus/vault/fetchsecrets", req.headers)
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
	var formData = req.files;
	createSecret(`${process.env.API_URL}/venus/vault/createsecret?secretname=` 
		+ req.query.secretname, formData, req.headers)
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
	readSecret(`${process.env.API_URL}/venus/vault/readsecret?secretid=` 
		+ req.query.secretid, req.headers)
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
	var formData = req.files;
	var secretnameParam = "";
	if (req.query.secretname != undefined) {
		secretnameParam = "&secretname=" + req.query.secretname;
	}
	updateSecret(`${process.env.API_URL}/venus/vault/secretupdate?secretid=` 
		+ req.query.secretid + secretnameParam, formData, req.headers)
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
	deleteSecret(`${process.env.API_URL}/venus/vault/deletesecret?secretid=` 
		+ req.query.secretid, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	});
});

router.post("/sharesecret", (req, res) => {
	console.log("Request: Share secret")
	shareSecret(`${process.env.API_URL}/venus/vault/sharesecret?secretid=` 
		+ req.query.secretid + "&targetuser=" + req.query.targetuser, req.headers)
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