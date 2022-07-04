import {useState, useContext, useEffect} from 'react';
import ContactUsLayout from '../templates/ContactUsLayout.js';
import {fetchContactUs} from '../../service/ContactUs/ContactUsManager.js';
import {UserContext} from '../../auth/UserProvider.js';

const ContactUs = () => {
	const {user} = useContext(UserContext);
	const [contactUs, setContactUs] = useState([]);

	useEffect(() => {
		fetchContactUs(user.jwt)
			.then(resp => {
				setContactUs(resp);
			});
	}, [user]);

	return (
		<ContactUsLayout listOfContactUs={contactUs} setContactUs={setContactUs}/>
		);
}
export default ContactUs;
