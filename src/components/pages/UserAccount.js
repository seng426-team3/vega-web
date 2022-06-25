import {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Row, Col} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import ListRoundedImages from '../UI/molecules/ListRoundImages.js';
import {UserContext} from '../../auth/UserProvider.js';
import {Alert} from 'react-bootstrap';

const UserAccount = (props) => {
	const {user, setUserInfo,logout} = useContext(UserContext);
	const history = useHistory();
	
	const logoutAndRouteChange = () => {
		logout();
		history.push("/");
	}	

	return (
		<SimplePageLayout>
			{ user.username ? 
				<Row>
					<Col sm={6}>
						<p>Hello,</p>
						<p id="username-text">{user.username}</p>
						<Button onClick={logoutAndRouteChange} size="sm">signout</Button>
					</Col>
				</Row>			
			:
			<Alert id="alert-not-authorized-account-page" variant="danger">You do not have permission to view this page.<Alert.Link href="/">Go to Home</Alert.Link></Alert>
			}

		</SimplePageLayout>
		);
}
export default UserAccount;