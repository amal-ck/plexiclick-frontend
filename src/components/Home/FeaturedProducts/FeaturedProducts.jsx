import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../../actions/productAction";
import { useSnackbar } from "notistack";
import { addToWishlist, clearWishlistErrors, getWishlist } from "../../../actions/wishlistAction";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { WISHLIST_RESET } from "../../../constants/wishlistConstants";

const FeaturedProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { products = [] } = useSelector((state) => state.products);
    const { wishlistItems, wishlistError, wishlistSuccess } = useSelector((state) => state.wishlistItems);
    const { isAuthenticated } = useSelector((state) => state.user);

    const featuredProducts = products.filter((product) => product.is_featured);
    const isProductInWishlist = (id) => wishlistItems && wishlistItems.some((item) => item.product_id === id);

    const handleWishlist = async (id) => {
        if (isAuthenticated) {
            await dispatch(addToWishlist({ product: id }, accessToken));
            dispatch(getWishlist(accessToken));
        } else {
            navigate('/login')
            enqueueSnackbar("Login to use wishlist", { variant: "info" })
        }
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (wishlistError) {
            enqueueSnackbar(wishlistError, { variant: "error" });
            dispatch(clearWishlistErrors());
        }
        if (wishlistSuccess) {
            enqueueSnackbar("Item added to wishlist", { variant: "success" });
            dispatch({ type: WISHLIST_RESET })
        }
    }, [dispatch, wishlistError, wishlistSuccess, enqueueSnackbar]);

    return (
        <>
            <div className="flex m-auto flex-col items-center gap-2 text-center p-1">
                <p className="font-bold">TOP SALE OF THE WEEK</p>
                <h1 className="sm:text-5xl text-2xl font-serif text-pink-500 font-semibold">Featured Products</h1>
                <p className="text-gray-500 font-thin">Some of our featured products is live on, check it out now and get the latest offers at the earliest</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 w-9/12 m-auto overflow-hidden pb-4">
                {featuredProducts.map((item) => (
                    <div className="flex flex-col gap-2 px-6 py-6 relative hover:shadow-lg rounded-sm m-5" key={item.id}>
                        {/* <!-- image & product title --> */}
                        <Link to={`/product/${item.product_name}`} className="flex flex-col items-center text-center group">
                            <img draggable="false" className="sm:w-full h-full  object-contain" src={item.product_image} alt={item.product_name} />
                            <h2 className="text-sm mt-4 group-hover:text-primary-darkBlue text-primary-darkGrey opacity-80 text-left">{item.product_name}</h2>
                            <h2 className="text-sm mt-4 group-hover:text-primary-darkBlue text-left">{item.price_range}</h2>
                        </Link>
                        {/* <!-- image & product title --> */}

                        {/* <!-- wishlist badge --> */}
                        <span
                            onClick={() => handleWishlist(item.id)}
                            className={`text-gray-300 hover:text-red-500 absolute top-6 right-6 cursor-pointer ${isProductInWishlist(item.id) ? 'text-red-500' : ''
                                }`}
                        >
                            <FavoriteIcon sx={{ fontSize: '20px' }} />
                        </span>
                        {/* <!-- wishlist badge --> */}
                    </div>
                ))}

            </div>
            <div className="flex m-auto">
                <Link to='/products' className='bg-primary-darkBlue px-16 py-3 rounded-3xl text-white font-semibold text-center hover:bg-gray-500'>Shop Now</Link>
            </div>
        </>
    )
}
export default FeaturedProducts;