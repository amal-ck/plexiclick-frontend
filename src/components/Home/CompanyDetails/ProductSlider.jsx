import FlapDoorBox1 from '../../../assets/images/Plexi Media/Flap door boxes/1.jpg';
import FlapDoorBox2 from '../../../assets/images/Plexi Media/Flap door boxes/2.jpg';
import RemDoorBox1 from '../../../assets/images/Plexi Media/Removable door boxes/1.jpg';
import RemDoorBox2 from '../../../assets/images/Plexi Media/Removable door boxes/2.jpg';
import ShoueBox1 from '../../../assets/images/Plexi Media/Shouebox type boxes/1.jpg';
import ShoueBox2 from '../../../assets/images/Plexi Media/Shouebox type boxes/2.jpg';
import Topers1 from '../../../assets/images/Plexi Media/Topers/1.jpg';
import Topers2 from '../../../assets/images/Plexi Media/Topers/2.jpg';
import TrayBendedEdges1 from '../../../assets/images/Plexi Media/Tray bended edges/1.jpg';
import TrayBendedEdges2 from '../../../assets/images/Plexi Media/Tray bended edges/2.jpg';
import Tray1 from '../../../assets/images/Plexi Media/Trays/1.jpg';
import Tray2 from '../../../assets/images/Plexi Media/Trays/2.jpg';
import './ProductSlider.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getRandomProducts } from '../../../utils/functions';

const ProductSlider = () => {

  const PreviousBtn = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIosIcon />
      </div>
    );
  };
  
  const NextBtn = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIosIcon />
      </div>
    );
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
              {
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1
                  }
              },
          ]
  };


  const products = [FlapDoorBox1, FlapDoorBox2, RemDoorBox1, RemDoorBox2, ShoueBox1, ShoueBox2, Topers1, Topers2, TrayBendedEdges1, TrayBendedEdges2, Tray1, Tray2];

  return (
    <div className="w-10/12 mx-auto product-slider-container">
      <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
        <Slider {...settings}>
          {products && getRandomProducts(products, 12).map((el, i) => (
            <div key={i}>
              <img draggable="false" className="h-44 sm:h-72 w-full object-cover" src={el} alt="products" />
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};
export default ProductSlider;
