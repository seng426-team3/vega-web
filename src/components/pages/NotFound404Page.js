import SimplePageLayout from "../templates/SimplePageLayout.js";
import {Container, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";

const NotFound404Page = (props) => {
    return (
        <Container>
            <div>
                <Alert variant="danger">404 Error: page not found! <Alert.Link href="/">Go to Home</Alert.Link></Alert>
            </div>
        </Container>
    )
}

export default NotFound404Page;