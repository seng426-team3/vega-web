import { useState } from "react";
import UserRegistrationPageLayout from "../templates/UserRegistrationPageLayout.js";
import { signUp } from "../../service/auth/AuthenticationManager.js";
import { Alert, Col, Row, Form, Button } from "react-bootstrap";

const SignUp = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  function onSubmit(userInfo) {
    signUp(userInfo)
      .then((res) => {
        if (res.code) {
          console.log("Error", res);
          setShowFailure(true);
          setValidated(false);
        } else {
          if (res.includes("User Created Successfully")) {
            console.log("Response", res);
            setShowSuccess(true);
            setValidated(true);
          } else {
            console.log("Error", res);
            setShowFailure(true);
            setValidated(false);
          }
        }
      })
        
  }
  
  const submitForm = (event) => {
    event.preventDefault();
    onSubmit({
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      submitForm(event);
    }
    setValidated(true);

  };

  return (
    <UserRegistrationPageLayout>
      <Row>
        <Col className="mx-auto" xs={6}>
          <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible show={showSuccess} id="sign-up-alert-success">
            <Alert.Heading>You've successfully registered for an account</Alert.Heading>
            <p>It is currently under review. Please check back later to see if it is approved.</p>
          </Alert>
          <Alert variant="danger" onClose={() => setShowFailure(false)} dismissible show={showFailure} id="sign-up-alert-failure">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>We ran into an error when trying to register your account. Please try again later.</p>
          </Alert>
      <h2>Create an account</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="validation-sign-up-email">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <small class="form-text text-muted">
            This will be used as your username.
          </small>
          <Form.Control.Feedback type="invalid" id="invalid-first-email">
            Please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validation-sign-up-first-name">
          <Form.Label>Enter First Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid" id="invalid-first-name">
            Please enter first name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validation-sign-up-last-name">
          <Form.Label>Enter Last Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid" id="invalid-last-name">
            Please enter last name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validation-sign-up-password">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="PASSWORD"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid" id="invalid-password">
            Please enter valid password
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>{' '}
        <Button variant="outline-primary" href="/login">Cancel</Button> 
      </Form>
    </Col>
  </Row>
    </UserRegistrationPageLayout>
  );
};

export default SignUp;
