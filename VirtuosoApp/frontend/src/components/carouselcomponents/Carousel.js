import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageCard from './ImageCard';
import '../styles/carouselarrow.module.css';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: '1', display: "block", color: "gray", width: "40px", height: "20px", textAlign: "center", lineHeight: "20px", fontSize: "36px"}}
        onClick={onClick}
      >
        {'>'}
      </div>
    );
    }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: '1', display: "block", color: "gray", width: "40px", height: "20px", textAlign: "center", lineHeight: "20px", fontSize: "36px"}}
        onClick={onClick}
      >
        {'<'}
      </div>
    );
  }

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow/>,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    
    <Slider {...settings}>
        {images.map((image, index) => (
        <div key={index}>
          <a href = './reviews'><ImageCard src={image} alt={`Slide ${index + 1}`} /></a>
          
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
