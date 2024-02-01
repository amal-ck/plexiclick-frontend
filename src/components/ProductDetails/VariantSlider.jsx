import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './VariantSlider.css';

const VariantSlider = ({variants, handleImage}) => {

  const PreviousBtn = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <ExpandLessIcon />
      </div>
    );
  };
  
  const NextBtn = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <ExpandMoreIcon />
      </div>
    );
  };


  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: Math.min(5, variants.length),
    slidesToScroll: 3,
    swipe: false,
    vertical: true,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  return (
    <div className="variant-slider-container md:w-16">
      <section>
        <Slider {...settings}>
          {variants.map((el, i) => (
            <div key={i} onClick={() => handleImage(el.variant_image)}>
              <img draggable="false" className="md:h-auto md:w-full object-cover cursor-pointer" src={el.variant_image} alt="variant" />
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};
export default VariantSlider;
