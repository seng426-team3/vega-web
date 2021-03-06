import {Form, Button, Row, Col} from 'react-bootstrap';
import React, { useState } from 'react';

const LoginUser = ({onSubmit}) => {
	
	const [username, setUsername]  = useState('');
	const [password, setPassword] = useState('');

	const submitForm:function = (evt) => {
		evt.preventDefault();
		onSubmit({
			'username' : username,
			'password' : password
		})
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
	      			<Button id="login-form-submit-button" variant="primary" type="submit" onClick={submitForm}>
	        			Submit
							</Button>{' '}
							<Button variant="outline-primary" href="/signup">Sign Up</Button> 
    			</Form>
      		</Col>
   	 	</Row>
		);
}
export default LoginUser;