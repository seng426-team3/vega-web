import {useState, useContext, useEffect} from 'react';
import BlogPageLayout from '../templates/BlogPageLayout.js';
import {fetchNews} from '../../service/NewsPosting/NewsPostingManager.js';
import {UserContext} from '../../auth/UserProvider.js';

const NewsAndEvents = () => {
	const {user} = useContext(UserContext);
	const [news, setNews] = useState([]);

	useEffect(() => {
		fetchNews(user.jwt)
			.then(resp => {
				setNews(resp);
			});
	}, [user]);

	return (
		<BlogPageLayout listOfNews={news} setNews={setNews}/>
		);
}
export default NewsAndEvents;