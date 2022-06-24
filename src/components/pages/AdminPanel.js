import SimplePageLayout from '../templates/SimplePageLayout.js';
import ListUsersAdminPanel from '../UI/molecules/ListUsersAdminPanel.js';
import {fetchuser, enableAccount, changeAccountRole} from  '../../service/AdminPanel/AdminPanel.js';
import {UserContext} from '../../auth/UserProvider.js';
import {useState, useContext, useEffect} from 'react';

import {Form, Button, Row, Col, Table, Alert} from 'react-bootstrap';
import {Redirect} from "react-router-dom";

const AdminPanel = (props) => {
	const {user} = useContext(UserContext);
	const [listOfUsers, setUsers] = useState([]);
	useEffect(() => {
			console.log("Inside useEffect")
			fetchuser(user.jwt)
				.then(resp => {
					setUsers(resp)
					});
	}, [user]);

	const enableUser = (username) => {
		console.log("Enable User called with",username)
		enableAccount(username, user.jwt)
		.then(resp => 
			console.log("User enabled"))
	}


	const changeRole = (evt, username) => {
		console.log(evt.target.value, username)
		var role = evt.target.value
		changeAccountRole(username, role, user.jwt)
		.then(resp => 
			console.log("Changed Roles"))
	}

	const listOfUsersHTML = () => {
		if(listOfUsers.length){
			return listOfUsers.map((userInfoCollection) => 
				<tr>
					<td>{userInfoCollection.userInfo.firstName}</td>
					<td>{userInfoCollection.userInfo.lastName}</td>
					<td>{userInfoCollection.userInfo.username}</td>
					{userInfoCollection.enabled ? 
						<td>Enabled</td>
					: 
						<td onClick={() => enableUser(userInfoCollection.userInfo.username)}>
							<a href="#">Enable User</a>
						</td>
					}
					<td>
						<Form.Select aria-label="Floating label select example" onChange={(evt) => changeRole(evt, userInfoCollection.userInfo.username)}>
							<option>Change role</option>
							<option value="ROLE_STAFF">STAFF</option>
							<option value="ROLE_USER">USER</option>
						</Form.Select>
					</td>
				</tr>) 
		}
	}

	return (
		<SimplePageLayout>
			{ user.role == "ROLE_ADMIN" ? (
				<ListUsersAdminPanel users={listOfUsersHTML()}/>
			) : (
				<Alert variant="danger">You do not have permission to view this page.<Alert.Link href="/">Go to Home</Alert.Link></Alert>
			)}
		</SimplePageLayout>
	);
}

export default AdminPanel;