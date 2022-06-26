import SimplePageLayout from '../templates/SimplePageLayout.js';
import ListUsersAdminPanel from '../UI/molecules/ListUsersAdminPanel.js';
import {fetchuser, enableAccount, disableAccount, changeAccountRole} from  '../../service/AdminPanel/AdminPanel.js';
import {UserContext} from '../../auth/UserProvider.js';
import {useState, useContext, useEffect} from 'react';

import {Form, Button, Alert} from 'react-bootstrap';

const AdminPanel = (props) => {
	const {user} = useContext(UserContext);
	const [listOfUsers, setUsers] = useState([]);
	const [isUserEnabledAlert, setIsUserEnabledAlert] = useState(false);
	const [isUserDisabledAlert, setIsUserDisabledAlert] = useState(false);

	useEffect(() => {
			console.log("Inside useEffect")
			fetchuser(user.jwt)
				.then(resp => {
					setUsers(resp)
					});
	}, [user]);

	const enableUser = (username) => {
		console.log("Enable User called with", username);
		enableAccount(username, user.jwt)
		.then(resp => 
			console.log("User enabled"));
		
		// Update list of users so state change occurs
		setIsUserEnabledAlert(true);
	}

	const disableUser = (username) => {
		console.log("Disable user called with", username);
		disableAccount(username, user.jwt)
		.then(resp =>
			console.log("User disabled"));
		
		// Update list of users so state change occurs
		setIsUserDisabledAlert(true);
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
				<tr key={userInfoCollection.userInfo.username + "-entry"}>
					<td key={userInfoCollection.userInfo.username + "-first-name"}>{userInfoCollection.userInfo.firstName}</td>
					<td key={userInfoCollection.userInfo.username + "-last-name"}>{userInfoCollection.userInfo.lastName}</td>
					<td key={userInfoCollection.userInfo.username + "-username"}>{userInfoCollection.userInfo.username}</td>
					{userInfoCollection.enabled ? 
						<td key={userInfoCollection.userInfo.username + "-disable"} onClick={() => disableUser(userInfoCollection.userInfo.username)}>
							<a href="#">Disable User</a>
						</td>
					: 
						<td key={userInfoCollection.userInfo.username + "-enable"} onClick={() => enableUser(userInfoCollection.userInfo.username)}>
							<a href="#">Enable User</a>
						</td>
					}
					<td key={userInfoCollection.userInfo.username + "-roles"}>
						<Form.Select key={userInfoCollection.userInfo.username + "-roles-form-select"} aria-label="Floating label select example" onChange={(evt) => changeRole(evt, userInfoCollection.userInfo.username)}>
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
			{ isUserEnabledAlert &&
				<Alert key="enabled-user-alert" variant="success">
					User has been successfully enabled!
					<hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={() => setIsUserEnabledAlert(false)} variant="outline-success">
							Close
						</Button>
					</div>					
				</Alert>
			}
			{ isUserDisabledAlert && 
				<Alert key="disabled-user-alert" variant="success">
					User has been successfully disabled!
					<hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={() => setIsUserDisabledAlert(false)} variant="outline-success">
							Close
						</Button>
					</div>	
				</Alert>			
			}

			{ user.role == "ROLE_ADMIN" ? (
				<ListUsersAdminPanel users={listOfUsersHTML()}/>
			) : (
				<Alert variant="danger">You do not have permission to view this page.<Alert.Link href="/">Go to Home</Alert.Link></Alert>
			)}
		</SimplePageLayout>
	);
}

export default AdminPanel;