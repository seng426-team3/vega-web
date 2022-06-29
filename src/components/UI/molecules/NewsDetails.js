import {Container, Button, Modal, Form} from 'react-bootstrap';
import {UserContext} from '../../../auth/UserProvider.js';
import {useContext, useState} from 'react';
import {fetchNews, editNews, deleteNews} from '../../../service/NewsPosting/NewsPostingManager.js';

const NewsDetails = ({news, setNews}) => {
	const {user} = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [title, setTitle]  = useState(news.title);
	const [author, setAuthor] = useState(news.author);
	const [body, setBody] = useState(news.bodyText);

	const handleDelete = () => {
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

	const handleEdit = () => {
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
					});
			});
	}

	const handleShow = () => {
		setShow(true);
	}	

	const handleClose = () => {
		setShow(false);
	}

	return (
		<Container className="d-flex flex-column justify-content-between">
			<div className="mt-2">
				<Container className="d-flex min-vw-50 justify-content-end">
					{(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && <Button onClick={handleShow} >Edit</Button>}
					{(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && <Button onClick={handleDelete} >Delete</Button>}
				</Container>
				<p class="text-left">{news.newsDate}</p>
				<h1>{news.title}</h1>
				<h2>{news.author}</h2>
				<p>{news.bodyText}</p>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>TITLE</Form.Label>
							<Form.Control defaultValue={news.title} type="text" onChange={e => setTitle(e.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Author</Form.Label>
							<Form.Control defaultValue={news.author} type="text" onChange={e => setAuthor(e.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>BODY</Form.Label>
							<Form.Control defaultValue={news.bodyText} as="textarea" rows={10} onChange={e => setBody(e.target.value)}/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleEdit}>
						Post
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}
export default NewsDetails;