import {useState, useContext} from 'react';
import UserRegistrationPageLayout from '../templates/UserRegistrationPageLayout.js';
import LoginUser from '../UI/organisms/LoginUser.js';
import {login} from '../../service/auth/AuthenticationManager.js';

import {UserContext} from '../../auth/UserProvider.js';
import  { Redirect } from 'react-router-dom'

import {Alert, Button, Row, Col} from 'react-bootstrap';

const Login = (props) => {
	
	const {user, setUserInfo} = useContext(UserContext);
	const [auth, setAuth] = useState(false);
	const [unsuccessfulLogin, setUnsuccessfulLogin] = useState(false);
	const [invalidUser, setInvalidUser] = useState(false);


	console.log("Userinfo", user);
	function onSubmit(userInfo){
		login(userInfo)
			.then(res => {
				console.log("Response", res);

				if (res.message === "Unauthorized") {
					setUnsuccessfulLogin(true);
					return;
				} else if (res.message === "Forbidden") {
					setInvalidUser(true);
					return;
				}

				console.log(res.jwt);
				var role = res.authorities[0].authority;
				setUserInfo(userInfo.username, res.jwt, role)
				setAuth(true);
			})
	}

		if(!auth){
			return (
				<UserRegistrationPageLayout>
					<Row>
      		<Col className="mx-auto" xs={6}>
					{ unsuccessfulLogin && 
						<Alert id="failed-login-alert" key="failed-login-alert" variant="danger">
							Invalid username and/or password, failed to login...
							<hr/>
							<div className="d-flex justify-content-end">
								<Button onClick={() => setUnsuccessfulLogin(false)} variant="outline-danger">
									Close
								</Button>
							</div>	
						</Alert>						
					}
					{ invalidUser && 
						<Alert id="invalid-user-alert" key="invalid-user-alert" variant="warning">
							User account is still under review. Please try again later.
							<hr/>
							<div className="d-flex justify-content-end">
								<Button onClick={() => setInvalidUser(false)} variant="outline-warning">
									Close
								</Button>
							</div>	
						</Alert>						
							}
						</Col>
						</Row>
					<LoginUser onSubmit={onSubmit}/>
				</UserRegistrationPageLayout>
			);
		} else {
			return <Redirect to='/' />;
		}
}

export default Login;