import VenusListGroup from '../atoms/VenusListGroup.js';
import {Row, Col} from 'react-bootstrap';
const FooterNavBar = (props) => {
	const [headOne, ...listOne] = ['PLATFORMS', { name: 'Deep Packet Inspection (DPI)', ref: '/platform#dpi-header' }, { name: 'Intrusion Detection and Prevention System (IDS/IPS)', ref: '/platform#idp-ips-header'}];
	const [headTwo, ...listTwo] = ['Learn More', { name: 'Why Vega?', ref: '/aboutus#why-vega-header' }, { name: 'Industry Validation', ref: '/aboutus#industry-validation-header' }, { name: 'Our Customers', ref: '/aboutus#our-customers-header' }];
	const [headThree, ...listThree] = ['News', { name: 'IG Design Group Selects Vega NextGen for Cybersecurity', ref: '/news#9.8.21' }, { name: 'Vega Announces Record Growth', ref: '/news#9.7.21' }];
	return (
			<Row>
				<Col>
					<VenusListGroup header={headOne} list={listOne}/>
				</Col>
				<Col>
					<VenusListGroup header={headTwo} list={listTwo}/>
				</Col>
				<Col>
					<VenusListGroup header={headThree} list={listThree}/>
				</Col>
			</Row>
		);
}
export default FooterNavBar;