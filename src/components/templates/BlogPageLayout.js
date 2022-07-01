import {Alert, Container, Row, Button, Modal, Form} from 'react-bootstrap';
import {useState, useContext} from 'react';
import Header from '../UI/organisms/Header.js';
import Footer from '../UI/organisms/Footer.js';
import ListNewsDetails from '../UI/organisms/ListNewsDetails.js'
import {addNews} from '../../service/NewsPosting/NewsPostingManager.js';
import {UserContext} from '../../auth/UserProvider.js';
import {fetchNews} from '../../service/NewsPosting/NewsPostingManager.js';

const BlogPageLayout = ({listOfNews, setNews}) => {
	const [show, setShow] = useState(false);
	const [successfulAddPost, setSuccessfulAddPost] = useState(false);
	const [validated, setValidated] = useState(false);

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

	const submitPost = (event) => {
		event.preventDefault();
		setSuccessfulAddPost(true);
		let date = new Date();
		const data = {
			'title': title,
			'bodytext': body,
			'newsdate': date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
			'timepublished': Math.floor(Date.now() / 1000),
			'author': author,
		}

		addNews(data, user.jwt)
			.then(res => {
				console.log("Response:", res);
				fetchNews(user.jwt)
					.then(resp => {
						setNews(resp);
						setSuccessfulAddPost(true);
					});
			});
	}

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else if (form.checkValidity() === true) {
			setShow(false);
			submitPost(event);
		}
		
		setValidated(true);
	}

	return(
		<Container className="d-flex flex-column min-vh-100 justify-content-between">
			<Row>
				<Header />
				{ successfulAddPost && 
						<Alert variant="success" onClose={() => setSuccessfulAddPost(false)} id="add-post-alert-success">
						<Alert.Heading>Successfully Submitted News Article</Alert.Heading>
						<Button variant="outline-success" href="/news">
							Close
						</Button>
					</Alert>							
					}
				<Container className="d-flex justify-content-center">
				{(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && 
					<Button className='mt-3' color="primary" id="add-post-btn" style={{width: '20%'}} onClick={handleShow}>Add Post</Button>}
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Add a Post</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group className="mb-3" controlId="title">
									<Form.Label>TITLE</Form.Label>
									<Form.Control 
										type="text" 
										placeholder="Title" 
										required 
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Form.Group>
								<Form.Control.Feedback type="invalid" id="invalid-title">
									Please enter a valid news title
								</Form.Control.Feedback>
								<Form.Group className="mb-3" controlId="author">
									<Form.Label>AUTHOR</Form.Label>
									<Form.Control 
										type="text" 
										placeholder="Author" 
										required 
										onChange={(e) => setAuthor(e.target.value)}
									/>
								</Form.Group>
								<Form.Control.Feedback type="invalid" id="invalid-author">
									Please enter a valid name
								</Form.Control.Feedback>
								<Form.Group className="mb-3" controlId="content-body">
									<Form.Label>BODY</Form.Label>
									<Form.Control 
										as="textarea" rows={10} 
										placeholder="Article Content" 
										required 
										onChange={(e) => setBody(e.target.value)}
									/>
								</Form.Group>
								<Form.Control.Feedback type="invalid" id="invalid-article-content">
									Please enter in the article content
								</Form.Control.Feedback>
        						<Button variant="secondary" onClick={handleClose} >Cancel</Button> {'  '}
								<Button variant="primary" type="submit" id="add-post-submit-button" >Add Post</Button>
							</Form>
						</Modal.Body>
					</Modal>
				</Container>
				<ListNewsDetails listOfNews={listOfNews} setNews={setNews}/>
			</Row>
			<Footer />
		</Container>
		);
}
export default BlogPageLayout;