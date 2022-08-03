import {Form, Button, Row, Col} from 'react-bootstrap';
import React, { useState } from 'react';

const LoginUser = ({onSubmit}) => {
	
	const [username, setUsername]  = useState('');
	const [password, setPassword] = useState('');
	const [loginAttempt, setLoginAttempt] = useState(localStorage.loginAttempt)

	const submitForm:function = (evt) => {
		getLoginAttempt();
		evt.preventDefault();
		onSubmit({
			'username' : username,
			'password' : password
		})
	}



	function getLoginAttempt(){
		setLoginAttempt(localStorage.loginAttempt);
		console.log("Submit login attempts: " + localStorage.loginAttempt);
	}

	return (
		<Row>
      		<Col className="mx-auto" xs={6}>
        		<Form onSubmit={submitForm}>
	      			<Form.Group className="mb-3">
	        			<Form.Label>USERNAME</Form.Label>
	        			<Form.Control type="text" id="login-form-username" onChange={e => setUsername(e.target.value)}/>
	      			</Form.Group>
	      			<Form.Group className="mb-3">
	        			<Form.Label>PASSWORD</Form.Label>
	        			<Form.Control type="PASSWORD" id="login-form-password" onChange={e => setPassword(e.target.value)}/>
	      			</Form.Group>
	      			<Button disabled={loginAttempt > 0} id="login-form-submit-button" variant="primary" type="submit" onClick={submitForm}> {/*number of actual login attempts is target - 2*/}
	        			Submit
							</Button>{' '}
							<Button variant="outline-primary" href="/signup">Sign Up</Button> 
    			</Form>
      		</Col>
   	 	</Row>
		);
}
export default LoginUser;