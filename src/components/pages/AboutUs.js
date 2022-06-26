import SimplePageLayout from '../templates/SimplePageLayout.js';


const GenerateHTMLForContent = (props) => {
	return (
		<div className="mt-2">
      <h1>Vega Absolute</h1>
      <h4>The nation's leading Cyber Security company</h4>
      <p>We started in over a decade ago with the radical idea that anyone deserves to feel secure and have their information protected. Today, we are the market leader in global enterprise cybersecurity software, with our innovative, award-winning Venus NextGen network defense platform.
      With tens of businesses powered by Vega Absolute, we strive to continuously grow and scale to enable our customers meet any of their goals.
        We use state of the art technology with our highly classified AI technology. Our product is disrupting the market place with it's blockchain and data mining technology. </p>
      
      <h4>Want to learn more?</h4>
      <a href="/contactus">Contact Us</a>
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