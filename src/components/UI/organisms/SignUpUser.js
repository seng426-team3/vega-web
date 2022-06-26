import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

const SignUpUser = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  
  const submitForm = (event) => {
    event.preventDefault();
    onSubmit({
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
    });
  };

  const [validated, setValidated] = useState(false);

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
    <Row>
      <Col className="mx-auto" xs={6}>
        <h2>Create an account</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Enter Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <small class="form-text text-muted">
              This will be used as your username.
            </small>
            <Form.Control.Feedback type="invalid">
              Please enter a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label>Enter First Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter first name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom03">
            <Form.Label>Enter Last Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter last name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom04">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid password
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
export default SignUpUser;
