import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, getWishlist } from '../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = ({ id, product_name, product_image, price_range }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { wishlistItems } = useSelector((state) => state.wishlistItems);
    const { isAuthenticated } = useSelector((state) => state.user)

    const isProductInWishlist = wishlistItems && wishlistItems.some((item) => item.product_id === id);

    const handleWishlist = async (event) => {
        event.preventDefault();
        if(isAuthenticated){
            await dispatch(addToWishlist({ product: id }, accessToken));
            dispatch(getWishlist(accessToken));
        }else{
            navigate('/login')
            enqueueSnackbar("Login to use wishlist", {variant: "info"})
        }
        
    };


    return (
        <div className="flex flex-col items-start gap-2 px-6 py-6 relative hover:shadow-lg rounded-sm">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${product_name}`} className="flex flex-col items-center text-center group">
                <img draggable="false" className="sm:w-full sm:h-full w-3/4 object-contain" src={product_image} alt={product_name} />
                <h2 className="text-sm mt-4 group-hover:text-primary-darkBlue text-primary-darkGrey opacity-80 text-left">{product_name}</h2>
                <h2 className="text-sm mt-4 group-hover:text-primary-darkBlue text-left" translate='no'>{price_range}</h2>
            </Link>
            {/* <!-- image & product title --> */}

            {/* <!-- wishlist badge --> */}
            <span
                onClick={handleWishlist}
                className={`text-gray-300 hover:text-red-500 absolute top-6 right-6 cursor-pointer ${isProductInWishlist ? 'text-red-500' : ''
                    }`}
            >
                <FavoriteIcon sx={{ fontSize: '20px' }} />
            </span>
            {/* <!-- wishlist badge --> */}
        </div>
    );

};

export default Product;
