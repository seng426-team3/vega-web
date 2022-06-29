import {Container, Row, Button, Modal, Form} from 'react-bootstrap';
import {useState, useContext} from 'react';
import Header from '../UI/organisms/Header.js';
import Footer from '../UI/organisms/Footer.js';
import ListNewsDetails from '../UI/organisms/ListNewsDetails.js'
import {addNews} from '../../service/NewsPosting/NewsPostingManager.js';
import {UserContext} from '../../auth/UserProvider.js';

const BlogPageLayout = ({listOfNews}) => {
	const [show, setShow] = useState(false);
	const [title, setTitle]  = useState('');
	const [author, setAuthor] = useState('');
	const [body, setBody] = useState('');
	const {user} = useContext(UserContext);

	const handleShow = () => {
		setShow(true);
	}	

	const handleClose = () => {
		setShow(false);
	}

	const handleSubmit = () => {
		setShow(false);
		let date = new Date();
		const data = {
			'newsid': 50,
			'title': title,
			'bodytext': body,
			'newsdate': date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
			'author': author,
			'timepublished': Math.floor(Date.now() / 1000)
		}

		addNews(data, user.jwt)
			.then(res => {
				console.log("Response:", res);
			});
	}

	return(
		<Container className="d-flex flex-column min-vh-100 justify-content-between">
			<Row>
				<Header />
				<Container className="d-flex justify-content-end">
					<Button variant="primary" color="primary" onClick={handleShow}>Add Post</Button>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Add a Post</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group className="mb-3">
									<Form.Label>TITLE</Form.Label>
									<Form.Control type="text" onChange={e => setTitle(e.target.value)}/>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Author</Form.Label>
									<Form.Control type="text" onChange={e => setAuthor(e.target.value)}/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
									<Form.Label>BODY</Form.Label>
									<Form.Control as="textarea" rows={10} onChange={e => setBody(e.target.value)}/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleSubmit}>
								Add Post
							</Button>
						</Modal.Footer>
					</Modal>
				</Container>
				<ListNewsDetails listOfNews={listOfNews}/>
			</Row>
			<Footer />
		</Container>
		);
}
export default BlogPageLayout;