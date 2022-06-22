import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Button, Table} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';
import {useContext} from 'react';
import {withRouter} from 'react-router-dom'

const VegaVault = (props) => {
	const {user} = useContext(UserContext);
  	
	const nextPath = () => {
		props.history.push("/login");
	}

	var page;
	
	if (user.role != "ROLE_STAFF" || user.role != "ROLE_USER" || user.role != "ROLE_ADMIN") {
		page = 
			<SimplePageLayout>
				<h3>Vega Vault service is only available to registered Users</h3>
				<p>Login or create an account below!</p>
				<view style={{ paddingLeft: 20, width: 200}}>
					<Button onClick={nextPath} size="sm">Login / Create Account</Button>
				</view>
			</SimplePageLayout>;
	} else {
		page = 
			<SimplePageLayout>
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