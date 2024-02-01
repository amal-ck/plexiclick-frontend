import './VariantSmallSlider.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const VariantSmallSlider = ({ variants, handleImage }) => {
    
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
        slidesToShow: Math.min(5, variants.length),
        slidesToScroll: 2,
        swipe: true,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    return (
        <div className="w-full mx-auto variant-small-slider-container">
            <section className='relative overflow-hidden'>
                <Slider {...settings}>
                    {variants && variants.map((el, i) => (
                        <div key={i} onClick={() => handleImage(el.variant_image)}>
                            <img draggable="false" className="h-20 object-cover" src={el.variant_image} alt={el.variant_image} />
                        </div>
                    ))}
                </Slider> 
            </section>
        </div>
    );
};

export default VariantSmallSlider;