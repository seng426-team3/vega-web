import NewsDetails from '../molecules/NewsDetails.js';
import {Row} from 'react-bootstrap';
const ListNewsDetails = ({listOfNews}) => {
	let generateHTMLForListOfNews; 
	
	console.log(listOfNews);
	if (listOfNews.length) {
		console.log("hello!");
		generateHTMLForListOfNews = listOfNews.map((news) => <NewsDetails news={news} />);
	}
	return (
		<Row>
			{generateHTMLForListOfNews}
		</Row>
		);
}
export default ListNewsDetails;