import {Button, Container, Form, Row} from 'react-bootstrap';
import Header from '../UI/organisms/Header.js';
import Footer from '../UI/organisms/Footer.js';
import ListNewsDetails from '../UI/organisms/ListNewsDetails.js'
import { UserContext } from '../../auth/UserProvider.js';
import { useContext } from 'react';

const BlogPageLayout = ({listOfNews, submitEvent}) => {
	const {user} = useContext(UserContext);

	return(
		<Container className="d-flex flex-column min-vh-100 justify-content-between">
			<Row>
				<Header />
				{ (user.role == "ROLE_ADMIN" || user.role == "ROLE_STAFF") &&
					<div>
						<h2>Submit new News Article</h2>
						<Form.Group classname="mb-3" controlId="submitNewsTitle">
							<Form.Label>Article Title</Form.Label>
							<Form.Control type="text" placeholder="Enter title"></Form.Control>
						</Form.Group>
						<Form.Group classname="mb-3" controlId="submitNewsAuthor">
							<Form.Label>Author</Form.Label>
							<Form.Control type="text" placeholder="Enter author"></Form.Control>
						</Form.Group>
						<Form.Group classname="mb-3" controlId="submitNewsText">
							<Form.Label>Text</Form.Label>
							<Form.Control as="textarea" rows={10}/>
						</Form.Group>

						<Button variant="primary" type="submit" onClick={submitEvent}>
							Submit
						</Button>
					</div>
				}
				<ListNewsDetails listOfNews={listOfNews}/>
			</Row>
			<Footer />
		</Container>
		);
}
export default BlogPageLayout;