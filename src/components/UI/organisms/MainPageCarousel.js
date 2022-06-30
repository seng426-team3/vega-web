import {Carousel, Row} from 'react-bootstrap';
import {useState} from 'react';
import first_image from "../../../assets/images/carousel_first.jpg";
import sec_image from "../../../assets/images/carousel_two.jpg";
import third_image from "../../../assets/images/carousel_third.jpg";

const MainPageCarousel = (props) => {
	const [index, setIndex] = useState(0);

  	const handleSelect = (selectedIndex, e) => {
    	setIndex(selectedIndex);
  	};

  	return (
  	<Row>
  	<Carousel activeIndex={index} onSelect={handleSelect} className="mt-2 mb-10">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={first_image}
          alt="First slide"
          height="600"
        />
        <Carousel.Caption>
          <h3>Vega Vault is ultra Secure</h3>
          <p>We're all about security.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sec_image}
          alt="Second slide"
          height="600"
        />

        <Carousel.Caption>
          <h3>News Articles Updated Daily</h3>
          <p>Enjoy the best security articles updated daily.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={third_image}
          alt="Third slide"
          height="600"
        />

        <Carousel.Caption>
          <h3>Vega Vault Secrets</h3>
          <p>
            Add secrets and share them with friends.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel></Row>)
}
export default MainPageCarousel;