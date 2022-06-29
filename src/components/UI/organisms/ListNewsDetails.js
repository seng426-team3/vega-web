import NewsDetails from '../molecules/NewsDetails.js';
import {Row} from 'react-bootstrap';
const ListNewsDetails = ({listOfNews, setNews}) => {
	let generateHTMLForListOfNews; 
	
	console.log(listOfNews);
	if (listOfNews.length) {
		generateHTMLForListOfNews = listOfNews.slice(0).reverse().map((news) => <NewsDetails news={news} setNews={setNews}/>);
	}
	return (
		<Row>
			{generateHTMLForListOfNews}
		</Row>
		);
}
export default ListNewsDetails;