import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Button, Table} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';
import {useContext, useMemo, useState} from 'react';
import {withRouter} from 'react-router-dom'
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import './VegaVault.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const VegaVault = (props) => {

	const {user} = useContext(UserContext);
  	
	const goToLogin = () => {
		props.history.push("/login");
	}

	const goToCreateSecret = () => {
		props.history.push("/secret-form");
	};

	const [listOfSecrets] = useState([
		{Name: "name1", CreationDate: "2022-06-26", Data: "txt"}, {Name: "name2", CreationDate: "2022-06-25", Data: "png"},
		{Name: "name3", CreationDate: "2022-06-02", Data: "txt"}, {Name: "name4", CreationDate: "2022-06-27", Data: "png"},
		{Name: "name5", CreationDate: "2022-06-20", Data: "txt"}, {Name: "name6", CreationDate: "2022-06-22", Data: "png"}
	]);

	const [columnDefs] = useState([
		{field: 'Name'},
		{field: 'CreationDate'},
		{field: 'Data'},
		{field: 'Manage'}
	]);

	const defaultColDef = useMemo( () => ({
		sortable: true
	}))

	var page;
	
	if ((user.role != "ROLE_STAFF" || user.role != "ROLE_USER" || user.role != "ROLE_ADMIN")) {
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
				</div>
				<div style={{height: '500px'}}>
					<div className="ag-theme-alpine" style={{height: '100%', width: '100%'}}>
						<AgGridReact rowData={listOfSecrets} columnDefs={columnDefs} defaultColDef={defaultColDef}>
						</AgGridReact>
					</div>
				</div>
			</SimplePageLayout>;
	}

	return (page);
}
export default withRouter(VegaVault);