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
				<p>Vega Vault Only Available to Registered Users</p>
				<Button onClick={nextPath} size="sm">Login</Button>
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