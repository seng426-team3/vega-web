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
	const [isUserRoleChangedAlert, setIsUserRoleChangedAlert] = useState(false);
	const [unauthorizedDisableAlert, setUnauthorizedDisableAlert] = useState(false);
	const [unathorizedRoleChangeAlert, setUnauthorizedRoleChangeAlert] = useState(false);

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
		
		// Update state so alert visible
		setIsUserEnabledAlert(true);
	}

	const disableUser = (username) => {
		console.log("Disable user called with", username);

		// Prevent user from disabling themselves
		if (user.username === username) {
			setUnauthorizedDisableAlert(true);
			console.log("Unauthorized to disable yourself.");
			return;
		}

		disableAccount(username, user.jwt)
		.then(resp =>
			console.log("User disabled"));
		
		// Update state so alert visible
		setIsUserDisabledAlert(true);
	}


	const changeRole = (evt, username) => {
		console.log(evt.target.value, username)
		var role = evt.target.value

		// Prevent user from changing their own role (e.g. admin setting themselves to staff/user)
		if (user.username === username) {
			setUnauthorizedRoleChangeAlert(true);
			console.log("Unauthorized to change own role.");
			return;
		}

		changeAccountRole(username, role, user.jwt)
		.then(resp => 
			console.log("Changed Roles"));

		// Update state so alert visible
		setIsUserRoleChangedAlert(true);
	}

	const listOfUsersHTML = () => {
		if(listOfUsers.length){
			return listOfUsers.map((userInfoCollection) => 
				<tr id={userInfoCollection.userInfo.username + "-entry"} key={userInfoCollection.userInfo.username + "-entry"}>
					<td id={userInfoCollection.userInfo.username + "-first-name"} key={userInfoCollection.userInfo.username + "-first-name"}>{userInfoCollection.userInfo.firstName}</td>
					<td id={userInfoCollection.userInfo.username + "-last-name"} key={userInfoCollection.userInfo.username + "-last-name"} >{userInfoCollection.userInfo.lastName}</td>
					<td id={userInfoCollection.userInfo.username + "-username"} key={userInfoCollection.userInfo.username + "-username"} >{userInfoCollection.userInfo.username}</td>
					{userInfoCollection.enabled ? 
						<td id={userInfoCollection.userInfo.username + "-disable"} key={userInfoCollection.userInfo.username + "-disable"} onClick={() => disableUser(userInfoCollection.userInfo.username)}>
							<a id={userInfoCollection.userInfo.username + "-disable-button"} key={userInfoCollection.userInfo.username + "-disable-button"} href="#">Disable User</a>
						</td>
					: 
						<td id={userInfoCollection.userInfo.username + "-enable"} key={userInfoCollection.userInfo.username + "-enable"} onClick={() => enableUser(userInfoCollection.userInfo.username)}>
							<a id={userInfoCollection.userInfo.username + "-enable-button"} key={userInfoCollection.userInfo.username + "-enable-button"} href="#">Enable User</a>
						</td>
					}
					<td id={userInfoCollection.userInfo.username + "-role"} key={userInfoCollection.userInfo.username + "-role"}>{userInfoCollection.role}</td>
					<td id={userInfoCollection.userInfo.username + "-change-roles"} key={userInfoCollection.userInfo.username + "-change-roles"}>
						<Form.Select id={userInfoCollection.userInfo.username + "-roles-form-select"} key={userInfoCollection.userInfo.username + "-roles-form-select"} aria-label="Floating label select example" onChange={(evt) => changeRole(evt, userInfoCollection.userInfo.username)}>
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
				<Alert id="enabled-user-alert" key="enabled-user-alert" variant="success">
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
				<Alert id="disabled-user-alert" key="disabled-user-alert" variant="success">
					User has been successfully disabled!
					<hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={() => setIsUserDisabledAlert(false)} variant="outline-success">
							Close
						</Button>
					</div>	
				</Alert>			
			}
			{ unathorizedRoleChangeAlert &&
				<Alert id="unauthorized-role-change-alert" key="unauthorized-role-change-alert" variant="danger">
				Error: cannot change your own role.
				<hr/>
				<div className="d-flex justify-content-end">
					<Button onClick={() => setUnauthorizedRoleChangeAlert(false)} variant="outline-danger">
						Close
					</Button>
				</div>	
				</Alert>
			}
			{ unauthorizedDisableAlert && 
				<Alert id="unauthorized-disable-alert" key="unauthorized-disable-alert" variant="danger">
				Error: you cannot disable yourself from the application.
				<hr/>
				<div className="d-flex justify-content-end">
					<Button onClick={() => setUnauthorizedDisableAlert(false)} variant="outline-danger">
						Close
					</Button>
				</div>	
				</Alert>
			}
			{ isUserRoleChangedAlert &&
				<Alert id="user-role-changed-alert" key="unauthorized-role-change-alert" variant="success">
				User role has been changed successfully.
				<hr/>
				<div className="d-flex justify-content-end">
					<Button onClick={() => setIsUserRoleChangedAlert(false)} variant="outline-success">
						Close
					</Button>
				</div>	
			</Alert>
			}

			{ user.role === "ROLE_ADMIN" ? (
				<ListUsersAdminPanel users={listOfUsersHTML()}/>
			) : (
				<Alert id="alert-not-authorized-admin-page" variant="danger">You do not have permission to view this page.<Alert.Link href="/">Go to Home</Alert.Link></Alert>
			)}
		</SimplePageLayout>
	);
}

export default AdminPanel;