import {Alert, Container, Button, Modal, Form} from 'react-bootstrap';
import {useContext, useState, useEffect} from 'react';
import {fetchContactUs} from '../../../service/ContactUs/ContactUsManager.js';

import UserRegistrationPageLayout from '../../templates/UserRegistrationPageLayout.js';

const ContactUsDetails = ({contactus, setContactUs}) => {

	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else if (form.checkValidity() === true) {
			setShow(false);
		}

		setValidated(true);
	}

	return (
		<Container className="d-flex flex-column justify-content-between">
		</Container>
	
	);
}
export default ContactUsDetails;