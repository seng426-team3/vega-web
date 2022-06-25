import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Button, Table} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';
import {useContext} from 'react';
import {withRouter} from 'react-router-dom'
import './VegaVault.css'

const VegaVault = (props) => {
	const {user} = useContext(UserContext);
  	
	const goToLogin = () => {
		props.history.push("/login");
	}

	const listOfSecrets = [["name", "2022-06-24", "txt"], ["name2", "1999-09-19", "txt"],
		["name", "2022-06-24", "txt"], ["name2", "1999-09-19", "txt"],
		["name", "2022-06-24", "txt"], ["name2", "1999-09-19", "txt"],
		["name", "2022-06-24", "txt"], ["name2", "1999-09-19", "txt"],
		["name", "2022-06-24", "txt"], ["name2", "1999-09-19", "txt"],
		["name", "2022-06-24", "txt"], ["name2", "1999-09-19", "txt"]];

	const listOfSecretsHTML = () => {
		if(listOfSecrets.length){
			return listOfSecrets.map(secretData=>
				<tr>
					<td>{secretData[0]}</td>
					<td>{secretData[1]}</td>
					<td>{secretData[2]}</td>
				</tr>)
		}
	}

	const scrollBox ={
		display: 'block'
	};

	const scrollBar = {
		position: 'relative',
		height: '200px',
		overflow: 'auto'
	};

	var page;
	
	if (!(user.role != "ROLE_STAFF" || user.role != "ROLE_USER" || user.role != "ROLE_ADMIN")) {
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
				<div className="table-wrapper-scroll-y my-custom-scrollbar">
					<Table className = "table table-striped mb-0">
						<thead>
							<tr>
								<td>Name</td>
								<td>Creation Date</td>
								<td>Data</td>
							</tr>
						</thead>
						<tbody>
							{listOfSecretsHTML()}
						</tbody>
					</Table>
				</div>
			</SimplePageLayout>;
	}


	return (page);
}
export default withRouter(VegaVault);