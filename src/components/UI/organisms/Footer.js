import {Row} from 'react-bootstrap';
import FooterNavBar from '../molecules/FooterNavBar.js';

const style = {
	backgroundColor: "#FFFFFF",
	textAlign: "center",
	left: "0",
	bottom: "0",
	width: "100%",
  };

const Footer = (props) => {
	return (
		<div style={style}>
			<Row className="mt-10">
				<FooterNavBar />
			</Row>
		</div>
		
		);
}
export default Footer;