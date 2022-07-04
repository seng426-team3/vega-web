import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Button} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';
import {useCallback, useContext, useMemo, useRef, useState, createContext} from 'react';
import {withRouter} from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import './VegaVault.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {fetchsecrets, fetchallsecrets, updatesecret, createsecret, deletesecret, sharesecret} from '../../service/VegaVault/Vault.js'
import {Row, Col, Form} from 'react-bootstrap';


const VegaVault = (props) => {
	const {user} = useContext(UserContext);
	var userToken = user.jwt;
	function getSecrets(){
		var listOfSecrets = [];
		if(user.role === "ROLE_ADMIN") {
			console.log(user.jwt)
			listOfSecrets = fetchallsecrets(userToken);

		}
		else{
			listOfSecrets = fetchsecrets(userToken);
		}
		return listOfSecrets;
	}

	const goToLogin = () => {
		props.history.push("/login");
	}

	const goToCreateSecret = () => {
		props.history.push("/secret-form");
	};

	const listOfSecrets = getSecrets();
	var arrayVal;
	listOfSecrets.then(function (result) {
		arrayVal = result;
		console.log(arrayVal);
		return result;
	});
	console.log(arrayVal);
	const gridRef = useRef(arrayVal);

	const [rowData, setRowData] = useState([]);

	const containerStyle = useMemo(() => ({width: "100%", height: "100%"}), []);
	const gridStyle = useMemo(() => ({width: "100%", height: "100%"}), []);

	const defaultColDef = useMemo( () => ({
		sortable: true,
		flex: 1,
		resizeable: true,
		minWidth: 100
	}));

	const [columnDefs] = useState([
		{field: 'secretName', width: 100, editable: true},
		{field: 'creatDate', width: 100, headerName: 'Creation Date'},
		{field: 'fileType', width: 100},
		{field: 'secretID', width: 100, hide: true}
	]);
	console.log(user.jwt);
	const removeSelected = () => {

		const selectedRow = gridRef.current.api.getSelectedRows();
		var selectedID = selectedRow.length === 1 ? selectedRow[0].secretID : '';
		console.log("Deleted: " + selectedID);
		console.log(userToken);
		deletesecret(String(selectedID), userToken);

		updateButton();
	}

	const updateButton = () => {
		console.log(arrayVal);
		setRowData(arrayVal);
	}

	const getSelected = () => {
		const selectedRow = gridRef.current.api.getSelectedRows();
		var selectedID = selectedRow.length === 1 ? selectedRow[0].secretID : '';

		return selectedID;
	}

	const goToEditSecret = () => {
		props.history.push("/edit-secret-form");
	};

	const EditSecret = () => {

		const selectedRow = gridRef.current.api.getSelectedRows();
		var selectedID = selectedRow.length === 1 ? selectedRow[0].secretID : '';
		console.log("Edited: " + selectedID);
		console.log(userToken);
		console.log(document.getElementById('editCreateFile').files[0]);
		console.log(document.getElementById('editSecretName').value);

		updatesecret(selectedID, document.getElementById('editCreateFile').files[0], document.getElementById('editSecretName').value, user.jwt);
	}

	const UploadSecret= () => {
		console.log(userToken);
		console.log(document.getElementById('secretFile').files[0]);
		console.log(document.getElementById('secretName').value);

		createsecret(document.getElementById('secretFile').files[0], document.getElementById('secretName').value, user.jwt);
	}

	const ShareSecret = () => {
		const selectedRow = gridRef.current.api.getSelectedRows();
		var selectedID = selectedRow.length === 1 ? selectedRow[0].secretID : '';
		console.log("Shared: " + selectedID);
		console.log(document.getElementById('usernameShare').value);
		sharesecret(selectedID, document.getElementById('usernameShare').value, user.jwt);
	}

	var page;
	
	if (user.role != "ROLE_STAFF" && user.role != "ROLE_USER" && user.role != "ROLE_ADMIN") {
		page = 
			<SimplePageLayout>
				<h1>Vega Vault</h1>
				<h3>Vega Vault service is only available to registered Users</h3>
				<p>Login or create an account below!</p>
				<view style={{ paddingLeft: 20, width: 200}}>
					<Button onClick={goToLogin} size="sm">Login / Create Account</Button>
				</view>
			</SimplePageLayout>;
	} else {
		page =
			<SimplePageLayout>
				<h1>Vega Vault</h1>
				<div id="button-box">
					{/*<button onClick={goToCreateSecret} className="button-blue" size = "sm">+ New Secret</button>*/}
					{/*/!*<button onClick={goToEditSecret} className="button-blue" size = "sm">Edit Secret</button>*!/*/}
					{/*<button className="button-blue" size = "sm">Share Secret</button>*/}
					<button onClick={updateButton} className="button-blue" size = "sm">Refresh Table</button>
					<button onClick={removeSelected} className="button-red" size = "sm">Delete Secret</button>

				</div>
				<div style={containerStyle}>
					<div style={{height: '475px', boxSizing: 'border-box'}}>
						<div style = {gridStyle} className="ag-theme-alpine">
							<AgGridReact ref={gridRef}
										 rowData={rowData}
										 columnDefs={columnDefs}
										 defaultColDef={defaultColDef}
										 rowSelection={'single'}
										 animateRows={true}>
							</AgGridReact>
						</div>
					</div>
					<div className="actionBar">
						<div>
							<h1>Upload Secret</h1>
								<form action="" method="get">
									<div>Secret Name:</div>
									<input type="text" id="secretName" name="secretName"/><br/><br/>
									<input type="file" id="secretFile" name="filename" className="inputFile"/><br/><br/>
								</form>
								<button className="button-blue" onClick={UploadSecret}>Create New Secret</button><br/>
						</div>
						<div>
							<h1>Edit Secret</h1>
							<form action="" method="get">
								<div>Secret Name:</div>
								<input type="text" id="editSecretName" name="editSecretName"/><br/><br/>
								<input type="file" id="editCreateFile" name="filename" className="inputFile"/><br/><br/>
							</form>
							<button className="button-blue" onClick={EditSecret}>Edit Selected Secret</button><br/>
						</div>
						<div>
							<h1>Share Secret</h1>
							<form action="" method="get">
								<div>User to Share:</div>
								<input type="text" id="usernameShare" name="usernameShare"/><br/><br/>
							</form>
							<button className="button-blue" onClick={ShareSecret}>Share Secret</button><br/>
						</div>
					</div>
				</div>
			</SimplePageLayout>;
	}

	return (page);
}

export default withRouter(VegaVault);