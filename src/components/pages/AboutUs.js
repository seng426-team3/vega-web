import SimplePageLayout from '../templates/SimplePageLayout.js';
import { Button } from 'react-bootstrap';


const GenerateHTMLForContent = () => {
	return (
		<div className="mt-2">
      <h1>Vega Absolute</h1>
      <h4>The nation's leading Cyber Security company</h4>
      <p>We started in over a decade ago with the radical idea that anyone deserves to feel secure and have their information protected.
        Today, we are the market leader in global enterprise cybersecurity software, with our innovative, award-winning Venus NextGen network defense platform.
        Our mission continues to thrive, with our state of the art AI technology disrupting the market place.
        With thousands of businesses powered by Vega Absolute, we are growing more than ever, enabling our customers to scale with us.
       </p>
      
      <h4>Want to learn more?</h4>
      <Button variant="primary" href="/contactus">Contact Us</Button>
    </div>
		);
}

const AboutUs = (props) => {	
	return (
		<SimplePageLayout>
			<GenerateHTMLForContent />
		</SimplePageLayout>
		);
}

export default AboutUs;