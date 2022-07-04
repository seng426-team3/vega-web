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
        <Carousel.Caption id="carousel-text-1">
          <h3>Welcome to Vega Absolute!</h3>
          <p>The nation's leading Cyber Security company</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sec_image}
          alt="Second slide"
          height="600"
        />

        <Carousel.Caption id="carousel-text-2">
          <h3>Unparalleled Security Solutions</h3>
          <p>Hire us to attend to your most precious assets and resources</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={third_image}
          alt="Third slide"
          height="600"
        />

        <Carousel.Caption id="carousel-text-3">
          <h3>Customer Security Products</h3>
          <p>
            Our flagship product, Vega Vault, will keep your secrets secure and safe.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel></Row>)
}
export default MainPageCarousel;