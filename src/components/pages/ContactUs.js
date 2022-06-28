import UserRegistrationPageLayout from '../templates/UserRegistrationPageLayout.js';
import UserRegistrationForm from '../UI/organisms/UserRegistrationForm.js';
import { Alert, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";


const ContactUs = (props) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [validated, setValidated] = useState(false);


      const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            setShowSuccess(true);
            setValidated(true);
        }
        setValidated(true);
      };

      return (
        <UserRegistrationPageLayout>
          <Row>
            <Col className="mx-auto" xs={6}>
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible show={showSuccess} id="contactus-alert-success">
                    <Alert.Heading>Successfully Submitted Message to Vega-Absolute</Alert.Heading>
                    <p>Your message is being reviewed by our employees. We will reach out once we have an answer.</p>
                    <Button variant="outline-success" href="/contactus">
                        Close
                    </Button>
                </Alert>	
          <h2>Contact Vega-Absolute</h2>
          <h6>For any questions or concerns</h6>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="contactus-name">
              <Form.Label>NAME</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
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
        </Col>
      </Row>
        </UserRegistrationPageLayout>
      );
}
export default ContactUs;