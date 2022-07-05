import {Alert, Container, Button, Modal, Form} from 'react-bootstrap';
import {UserContext} from '../../../auth/UserProvider.js';
import {useContext, useState} from 'react';
import {fetchNews, editNews, deleteNews} from '../../../service/NewsPosting/NewsPostingManager.js';

const NewsDetails = ({news, setNews}) => {
	const {user} = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [title, setTitle]  = useState(news.title);
	const [author, setAuthor] = useState(news.author);
	const [body, setBody] = useState(news.bodyText);
	const [successfulDeletePost, setSuccessfulDeletePost] = useState(false);
	const [successfulEditPost, setSuccessfulEditPost] = useState(false);
	const [validated, setValidated] = useState(false);

	const handleDelete = (event) => {
		event.preventDefault();
		setSuccessfulDeletePost(true);
		const data = {
			newsid: news.newsId,
		}
		console.log(news.newsId);

		deleteNews(data, user.jwt)
			.then(res => {
				console.log("Response:", res);
				fetchNews(user.jwt)
					.then(resp => {
						setNews(resp);
					});
			});
	}

	const handleEdit = (event) => {
		event.preventDefault();
		setSuccessfulEditPost(true);
		setShow(false);
		let date = new Date();
		const data = {
			'newsid': news.newsId,
			'title': title,
			'bodytext': body,
			'newsdate': date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
			'timepublished': Math.floor(Date.now() / 1000),
			'author': author,
		}
		console.log(news.newsId);

		editNews(data, user.jwt)
			.then(res => {
				console.log("Response:", res);
				fetchNews(user.jwt)
					.then(resp => {
						setNews(resp);
						setSuccessfulEditPost(true);
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
			handleEdit(event);
		}

		setValidated(true);
	}

	const handleShow = () => {
		setShow(true);
	}	

	const handleClose = () => {
		setShow(false);
	}

	return (
		<Container className="d-flex flex-column justify-content-between">
			{ successfulDeletePost && 
						<Alert variant="success" onClose={() => setSuccessfulDeletePost(false)} id="delete-post-alert-success">
						<Alert.Heading>Successfully Deleted News Article</Alert.Heading>
						<Button variant="outline-success" href="/news">
							Close
						</Button>
					</Alert>							
					}
			{ successfulEditPost && 
						<Alert variant="success" onClose={() => setSuccessfulEditPost(false)} id="edit-post-alert-success">
						<Alert.Heading>Successfully Edited News Article</Alert.Heading>
						<Button variant="outline-success" href="/news">
							Close
						</Button>
					</Alert>							
					}
			<div className="mt-2">
				<Container className="d-flex min-vw-50 justify-content-end">
					{(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && <Button onClick={handleShow} id="edit-post-btn" >Edit</Button>}
					{(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && <Button onClick={handleDelete} id="delete-post-btn" >Delete</Button>}
				</Container>
				<p class="text-left">{news.newsDate}</p>
				<h1 class="news-title">{news.title}</h1>
				<h2>{news.author}</h2>
				<p>{news.bodyText}</p>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="title">
							<Form.Label>TITLE</Form.Label>
							<Form.Control 
								type="text" 
								defaultValue={news.title} 
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
								defaultValue={news.author}
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
								defaultValue={news.bodyText}
								required 
								onChange={(e) => setBody(e.target.value)}
							/>
						</Form.Group>
						<Form.Control.Feedback type="invalid" id="invalid-article-content">
							Please enter in the article content
						</Form.Control.Feedback>
						<Button variant="secondary" onClick={handleClose} >Cancel</Button> {'  '}
						<Button variant="primary" type="submit" id="edit-post-submit-button" >Post</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</Container>
	);
}
export default NewsDetails;