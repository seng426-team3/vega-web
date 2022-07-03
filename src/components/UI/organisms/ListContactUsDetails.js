import ContactUsDetails from '../molecules/ContactUsDetails.js';
import {Row} from 'react-bootstrap';
const ListContactUsDetails = ({listOfContactUs, setContactUs}) => {
	let generateHTMLForListOfContactUs; 
	
	// console.log(listOfContactUs);
	if (listOfContactUs.length) {
		generateHTMLForListOfContactUs = listOfContactUs.slice(0).reverse().map((contactus) => <ContactUsDetails contactus={contactus} setContactUs={setContactUs}/>);
	}
	return (
		<Row>
			{generateHTMLForListOfContactUs}
		</Row>
		);
}
export default ListContactUsDetails;