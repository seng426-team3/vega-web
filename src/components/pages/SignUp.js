import { useState } from "react";
import UserRegistrationPageLayout from "../templates/UserRegistrationPageLayout.js";
import SignUpUser from "../UI/organisms/SignUpUser";
import { signUp } from "../../service/auth/AuthenticationManager.js";
import { Toast, Col } from "react-bootstrap";

import { Redirect } from "react-router-dom";

const SignUp = (props) => {
  const [userCreated, setUserCreated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const toggleShowSuccess = () => setShowSuccess(!showSuccess);
  const toggleShowFailure = () => setShowFailure(!showFailure);

  function onSubmit(userInfo) {
    signUp(userInfo)
      .then((res) => {
        console.log("Response", res);
        setUserCreated(true);
        setShowSuccess(true);
      })
      .catch((res) => {
        console.log("Error", res);
        setUserCreated(true);
        setShowFailure(true);
      });
  }

  if (!userCreated) {
    return (
      <UserRegistrationPageLayout>
        <SignUpUser onSubmit={onSubmit} />
      </UserRegistrationPageLayout>
    );
  } else {
    return (
      <UserRegistrationPageLayout>
        <Col className="mx-auto" xs={6}>
          <Toast show={showSuccess} onClose={toggleShowSuccess}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">You've created an account</strong>
            </Toast.Header>
            <Toast.Body>
              It is currently under review. Please check back later for updates
              on your account.
            </Toast.Body>
          </Toast>
          <Toast show={showFailure} onClose={toggleShowFailure}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2 Warning"
                alt=""
              />
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>
              We ran into an error when trying to create your account. Please
              try again later.
            </Toast.Body>
          </Toast>
        </Col>
      </UserRegistrationPageLayout>
    );
  }
};

export default SignUp;
