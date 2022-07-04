import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Button} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';
import {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {withRouter} from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import './VegaVault.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {fetchsecrets, fetchallsecrets, createsecret} from '../../service/VegaVault/Vault.js'
import {Row, Col, Form} from 'react-bootstrap';

const VegaVault = (props) => {
	const {user} = useContext(UserContext);

	function getSecrets(){
		var listOfSecrets;

		listOfSecrets = fetchallsecrets(user.jwt);

		return listOfSecrets;
	}

	const goToLogin = () => {
		props.history.push("/login");
	}

	const goToCreateSecret = () => {
		props.history.push("/secret-form");
	};

	const goToEditSecret = () => {
		props.history.push("/edit-secret-form");
	};

	const listOfSecrets = getSecrets();
	var arrayVal;
	listOfSecrets.then(function (result) {
		arrayVal = result;
		console.log(arrayVal);
		return result;
	});
	console.log(arrayVal);
	const gridRef = useRef(null);

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
		{field: 'fileType', width: 100}
	]);

	// const removeSelected = useCallback(() => {
	//
	// 	const selectedRowNodes = gridRef.current.api.getSelectedNodes();
	// 	const selectedIDs = selectedRowNodes.map(function (rowNode){
	// 		return rowNode.id;
	// 	});
	// 	const filterData = rowData.filter(function (dataItem){
	// 		return selectedIDs.indexOf(dataItem.Name) < 0;
	// 	});
	// 	setRowData(filterData);
	//
	// }, [rowData]);

	const updateButton = () => {
		console.log(arrayVal);
		setRowData(arrayVal);
	}

	var page;
	
	if (!(user.role != "ROLE_STAFF" || user.role != "ROLE_USER" || user.role != "ROLE_ADMIN")) {
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
					<button onClick={goToCreateSecret} className="button-blue" size = "sm">+ New Secret</button>
					<button onClick={goToEditSecret} className="button-blue" size = "sm">Edit Secret</button>
					<button className="button-blue" size = "sm">Share Secret</button>
					<button onClick={updateButton} className="button-red" size = "sm">Delete Secret</button>
				</div>
				<div style={containerStyle}>
					<div style={{height: '475px', boxSizing: 'border-box'}}>
						<div style = {gridStyle} className="ag-theme-alpine">
							<AgGridReact ref={gridRef}
										 rowData={rowData}
										 columnDefs={columnDefs}
										 defaultColDef={defaultColDef}
										 rowSelection={'multiple'}
										 animateRows={true}>
							</AgGridReact>
						</div>
					</div>
				</div>
			</SimplePageLayout>;
	}

	return (page);
}
export default withRouter(VegaVault);