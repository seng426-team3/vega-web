import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Button, Table} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';
import {useContext, useState} from 'react';
import {withRouter} from 'react-router-dom'
import {createsecret} from '../../service/VegaVault/Vault.js'
import {Row, Col, Form} from 'react-bootstrap';

const VegaVault = (props) => {
	const {user} = useContext(UserContext);

	// REMOVE THIS TEST COMPONENT, ONLY USED TO VALIDATE CREATE SECRET
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	
	const goToLogin = () => {
		props.history.push("/login");
	}

	var page;

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const testCreateSecret = () => {
		console.log("SELECTED FILE");
		console.log(selectedFile);
		createsecret(selectedFile, "secret-name-test", user.jwt)
			.then(res => {
				console.log("Response to testing create secret: ", res);
			});
	};
	
	if (user.role !== "ROLE_STAFF" && user.role !== "ROLE_USER" && user.role !== "ROLE_ADMIN") {
		page = 
			<SimplePageLayout>
				<h3>Vega Vault service is only available to registered Users</h3>
				<p>Login or create an account below!</p>
				<view style={{ paddingLeft: 20, width: 200}}>
					<Button onClick={goToLogin} size="sm">Login / Create Account</Button>
				</view>
			</SimplePageLayout>;
	} else {
		page = 
			<SimplePageLayout>

				{/* REMOVE THIS TEST FILE UPLOAD, WAS USED TO VALIDATE CREATING SECRETS */}
				<Row>
					<Col className="mx-auto" xs={6}>
						<Form.Group controlId="formFile" className="mb-3">
							<Form.Label>Test Create Secret File Upload</Form.Label>
							<Form.Control type="file" onChange={changeHandler} />
						</Form.Group>
						<Button variant="primary" type="submit" onClick={testCreateSecret}>
							Submit
						</Button>
					</Col>
				</Row>
				{/* REMOVE THIS TEST FILE UPLOAD ABOVE */}
				<Table>
					<thead>
						<tr>
							<td>Name</td>
							<td>Creation Date</td>
							<td>Data</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</Table>
			</SimplePageLayout>;
	}


	return (page);
}
export default withRouter(VegaVault);