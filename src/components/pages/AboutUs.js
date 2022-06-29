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
      </p>
      <h2 id="why-vega-header">Why Vega?</h2>
      <p>With our variety of products, Vega can help companies stop advanced threats like DDOS and third-party attacks, zero days, and APTs.
        We have real-time detection and global visibility, helping security organisations stay ahead of today's cyber attacks.
        In addition to our spectactular products, we give back to our communicates through our outreach teaching teenagers and senior citizens how to safe on the web. 
        We aim to help everyone stay secure. 
      </p>
      <h2 id="industry-validation-header">Industry Validation</h2>
      <p>
        Our Vega NextGen platform been recognized as the top detection and response provider in the world by Insider Threat Magazine and FutureCon Intelligence Agency.
        With our in-house researchers having published over 10 new cybersecurity papers in Cyber Science America on new detection and response techniques, we are well respected within the industry.
        And we haven't stopped working, with over 30 awards from the Cybersecurity Engineering Organization and Hackaton Conference over the last 3 years. 
      </p>
      <h2 id="our-customers-header">Our Customers</h2>
      <p>
        Our customers come from a variety of industries, from IG Design Group to NCSoft, we can help anyone achieve their security goals.
        We have 24/7 customer support with over 99% customer approval ratings, we are always looking to add more customers, no matter their size or background.
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