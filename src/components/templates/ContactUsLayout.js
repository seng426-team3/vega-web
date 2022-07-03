import UserRegistrationPageLayout from '../templates/UserRegistrationPageLayout.js';
import UserRegistrationForm from '../UI/organisms/UserRegistrationForm.js';
import { Alert, Col, Row, Form, Button, Table } from "react-bootstrap";
import { useState, useContext, useEffect} from "react";
import {UserContext} from '../../auth/UserProvider.js';
import {fetchContactUs} from '../../service/ContactUs/ContactUsManager.js';
import {addContactUs} from '../../service/ContactUs/ContactUsManager.js';

import ListContactUsDetails from '../UI/organisms/ListContactUsDetails.js';


const ContactUsLayout = ({listOfContactUs, setContactUs}) => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [successfulAddContactUs, setSuccessfulAddContactUs] = useState(false);
    const [validated, setValidated] = useState(false);

    const [user_name, setUser_Name] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const {user} = useContext(UserContext);
  
    const submitContactUs = (event) => {
      event.preventDefault();
      setSuccessfulAddContactUs(true);

      const data = {
        'user_name': user_name,
        'email': email,
        'message': message,
      }
  
      addContactUs(data, user.jwt)
        .then(res => {
          console.log("Response:", res);
          fetchContactUs(user.jwt)
            .then(resp => {
              setContactUs(resp);
              setSuccessfulAddContactUs(true);
            });
        });
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      } else if (form.checkValidity() === true) {
          setShowSuccess(true);
          submitContactUs(event);
      }

      setValidated(true);
    };

    return (
      <UserRegistrationPageLayout>
        
        {(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && 
            <>
            <h2>Contacted Messages</h2>
            <h6>Below is the list of public users questions and concerns.</h6>
            <Table id="contact-us-table">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Message Content</td>
                </tr>               
            </thead>
            <tbody>
                { listOfContactUs.length && listOfContactUs.map((contacted) => 
                    <tr id={contacted.user_name + "-entry"} key={contacted.user_name + "-entry"}>
                    <td id={contacted.userName + "-user_name"} key={contacted.userName + "-user_name"}>{contacted.userName}</td>
                    <td id={contacted.email + "-email"} key={contacted.email + "-email"}>{contacted.email}</td>
                    <td id={contacted.message + "-message"} key={contacted.message + "-message"} >{contacted.message}</td>
                    </tr>)}
            </tbody>
            </Table>
            <span>
                </span>
            <span>
                <h3>{'\n'}Public Contact Form</h3>
                <h6>Below is the public Contact-Us form</h6>
            </span>
                <hr>
                </hr>
            </>
        }
        <Row>
          <Col className="mx-auto" xs={6}>
            { successfulAddContactUs && 
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible show={showSuccess} id="contactus-alert-success">
                    <Alert.Heading>Successfully Submitted Message to Vega-Absolute</Alert.Heading>
                    <p>Your message is being reviewed by our employees. We will reach out once we have an answer.</p>
                    <Button variant="outline-success" href="/contactus">
                        Close
                    </Button>
                </Alert>	
                }
                <h2>Contact Vega-Absolute</h2>
                <h6>For any questions or concerns</h6>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="contactus-name">
                    <Form.Label>NAME</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setUser_Name(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contactus-email">
                    <Form.Label>EMAIL</Form.Label>
                    <Form.Control
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <small className="form-text text-muted">
                        (Your username)
                    </small>
                    <Form.Control.Feedback type="invalid" id="invalid-email">
                        Please enter a valid email
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contactus-message">
                    <Form.Label>MESSAGE</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">Submit</Button>{' '}
                    <Button variant="outline-primary" href="/contactus">Cancel</Button> 
                </Form>
              <ListContactUsDetails listOfContactUs={listOfContactUs} setContactUs={setContactUs} />
          </Col>
        </Row>
      </UserRegistrationPageLayout>
      
    );
}
export default ContactUsLayout;