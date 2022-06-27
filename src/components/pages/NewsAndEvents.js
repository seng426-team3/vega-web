import BlogPageLayout from '../templates/BlogPageLayout.js';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../auth/UserProvider.js';
import { fetchNews } from '../../service/News/News.js';

const NewsAndEvents = (props) => {
	const {user} = useContext(UserContext);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [news, setNews] = useState([]);

	useEffect(() => {
		console.log("JWT is", user.jwt, dataLoaded);
		console.log("Inside useEffect");
		fetchNews(user.jwt)
			.then(resp => {
				setDataLoaded(true);
				setNews(resp);
			});
	}, [user])

	return (
		<BlogPageLayout listOfNews={news} />
		);
}
export default NewsAndEvents;