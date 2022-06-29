import {Container, Button} from 'react-bootstrap';
import {deleteNews} from '../../../service/NewsPosting/NewsPostingManager.js';
import {UserContext} from '../../../auth/UserProvider.js';
import {useContext} from 'react';
import {fetchNews} from '../../../service/NewsPosting/NewsPostingManager.js';

const NewsDetails = ({news, setNews}) => {
	const {user} = useContext(UserContext);

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

	return (
		<Container className="d-flex flex-column justify-content-between">
			<div className="mt-2">
				<Container className="d-flex min-vw-50 justify-content-end">
					<Button onClick={handleDelete} >Delete</Button>
				</Container>
				<p class="text-left">{news.newsDate}</p>
				<h1>{news.title}</h1>
				<h2>{news.author}</h2>
				<p>{news.bodyText}</p>
			</div>
		</Container>
	);
}
export default NewsDetails;