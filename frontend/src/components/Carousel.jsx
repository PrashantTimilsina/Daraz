import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="mt-24">
      <Slider {...settings}>
        <div>
          <img src="https://img.lazcdn.com/us/domino/fdcd7bd7-41cc-4318-b929-6ab65e3f11e3_NP-1976-688.jpg_2200x2200q80.jpg" />
        </div>
        <div>
          <img src="https://img.lazcdn.com/us/domino/fb22e4c3-c283-4dc3-90b6-25cc2137ead8_NP-1976-688.jpg_2200x2200q80.jpg" />
        </div>
        <div>
          <img src="https://img.lazcdn.com/us/domino/9ff52f9b574ef5f34975e231516f3cbe.jpg_2200x2200q80.jpg" />
        </div>
        <div>
          <img src="https://img.lazcdn.com/us/domino/70d96363-eff1-41d6-beb4-0d24afc1ba70_NP-1976-688.png_2200x2200q80.png" />
        </div>
      </Slider>
    </div>
  );
}
