import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, getVariants, getAllReviews, clearErrors } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { newReview } from '../../actions/productAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { WISHLIST_RESET } from '../../constants/wishlistConstants';
import { addToWishlist, clearWishlistErrors, getWishlist } from '../../actions/wishlistAction';
import { addItemsToCart, addItemsToUnauthorizedCart, clearCartErrors, getCart } from '../../actions/cartAction';
import { CART_RESET } from '../../constants/cartConstants';
import VariantSlider from './VariantSlider';
import VariantSmallSlider from './VariantSmallSlider';

const ProductDetails = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [rememberMe, setRememberMe] = useState(false);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const { productDetails = {}, loading } = useSelector((state) => state.productDetails);
    const { variants = [], variantLoading } = useSelector((state) => state.variants);
    const { reviews = [] } = useSelector((state) => state.reviews);
    const { success, reviewError } = useSelector((state) => state.newReview);
    const { wishlistSuccess, wishlistError, wishlistItems } = useSelector((state) => state.wishlistItems);
    const { user = {}, isAuthenticated } = useSelector((state) => state.user)
    const { cartSuccess, cartError, cartLoading} = useSelector((state) => state.cart)

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedThickness, setSelectedThickness] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [isFirstEffectCompleted, setIsFirstEffectCompleted] = useState(false);
    const [image, setImage] = useState('');

    const accessToken = localStorage.getItem('access')

    let minPrice = 0;
    let maxPrice = 0;

    if (Array.isArray(variants) && variants.length > 0) {
        // Initialize minPrice and maxPrice with the first variant's sale_price
        minPrice = variants[0].sale_price;
        maxPrice = variants[0].sale_price;

        // Iterate through the variants array to find the min and max sale_price
        variants.forEach((variant) => {
            const salePrice = variant.sale_price;

            if (salePrice < minPrice) {
                minPrice = salePrice;
            }

            if (salePrice > maxPrice) {
                maxPrice = salePrice;
            }
        });
    }


    const product_name = params.product_name;

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: '#254d8f',
            },
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating) {
            enqueueSnackbar("Please select a rating", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("product", productDetails.id);
        formData.set("name", name);
        formData.set("email", email)
        formData.set("rating", rating);
        formData.set("review", message);
        dispatch(newReview(formData, accessToken));

        if (rememberMe) {
            const savedData = {
                name,
                email,
            };
            localStorage.setItem('productReviewData', JSON.stringify(savedData));
        }
    }

    useEffect(() => {
        // Check if the user is authenticated and update state accordingly
        if (isAuthenticated && user) {
            setName(user.username);
            setEmail(user.email);
            setRememberMe(false);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        // Load saved data from local storage when the component mounts
        const savedData = localStorage.getItem('productReviewData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (!isAuthenticated) {
                setName(parsedData.name);
                setEmail(parsedData.email);
                setRememberMe(true);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
            setName('');
            setEmail('');
            setRating(0);
            setMessage('');
        }
        if (wishlistError) {
            enqueueSnackbar(wishlistError, { variant: "error" });
            dispatch(clearWishlistErrors());
        }
        if (wishlistSuccess) {
            enqueueSnackbar("Item added to wishlist", { variant: "success" });
            dispatch({ type: WISHLIST_RESET })
        }
        if (cartSuccess) {
            enqueueSnackbar(cartSuccess, { variant: "success" });
            dispatch({ type: CART_RESET})
        }
        if (cartError) {
            enqueueSnackbar(cartError, { variant: "error" });
            dispatch(clearCartErrors());
        }
    }, [dispatch, reviewError, success, wishlistError, wishlistSuccess, cartError, cartSuccess, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getProductDetails(product_name));
        dispatch(getVariants(product_name));
        dispatch(getAllReviews(product_name));

        setSelectedColor('');
        setSelectedSubcategory('');
        setSelectedSize('');
        setSelectedThickness('');

        setIsFirstEffectCompleted(true);
    }, [dispatch, product_name]);




    const handleClearButtonClick = (event) => {
        event.preventDefault();
        setSelectedColor('');
        setSelectedSubcategory('');
        setSelectedSize('');
        setSelectedThickness('');
        setQuantity(1);
    };

    const handleCart = async (event) => {
        event.preventDefault();
        
        if (selectedVariant) {
            const cartItem = {
                variant: selectedVariant.id,
                quantity: quantity,
            };
            if (isAuthenticated){
                await dispatch(addItemsToCart([cartItem], accessToken));
                dispatch(getCart(accessToken));
            }else{
                dispatch(addItemsToUnauthorizedCart([cartItem]));
                enqueueSnackbar("item added to cart", {variant:"success"});
            }
            
        }
    };

    const handleWishlist = async (event) => {
        event.preventDefault();
        if (isAuthenticated){
            await dispatch(addToWishlist({ variant: variant_id }, accessToken))
            dispatch(getWishlist(accessToken));
        }else{
            navigate('/login')
            enqueueSnackbar("Login to use wishlist", {variant: "info"})
        }
        
    };
    const selectedVariant = variants.find(
        variant =>
            variant.color === selectedColor &&
            variant.size === selectedSize &&
            variant.thickness === selectedThickness &&
            variant.subcategory === selectedSubcategory
    );
    
    const displayImage = selectedVariant ? selectedVariant.variant_image : productDetails.product_image;
    const price = selectedVariant ? (selectedVariant.sale_price * quantity).toFixed(3) : '0.000';
    const variant_id = selectedVariant ? selectedVariant.id : null;
    const isProductInWishlist = wishlistItems && wishlistItems.some((item) => item.variant_id === variant_id);
    const stockAvailabilty = selectedVariant ? selectedVariant.stock : null

    const handleImage = (img) => {
        setImage(img);
    }

    useEffect(() => {
        // Run the second effect only after the first effect has completed
        if (isFirstEffectCompleted && variants.length > 0) {
            if (selectedColor === '') {
                setSelectedColor(variants[0].color);
            }
            if (selectedSize === '') {
                setSelectedSize(variants[0].size);
            }
            if (selectedThickness === '') {
                setSelectedThickness(variants[0].thickness);
            }
            if (selectedSubcategory === '' ) {
                setSelectedSubcategory(variants[0].subcategory);            
            }
            setImage(displayImage);
        }
    }, [isFirstEffectCompleted, variants, selectedColor, selectedSize, selectedThickness, selectedSubcategory, displayImage]);

    return (
        <>
            {loading || variantLoading || cartLoading ? (
                <Loader />
            ) : (

                <div>
                    {productDetails && Object.keys(productDetails).length > 0 ? (
                        <div>
                            <div className="bg-primary-grey">
                                <div className="flex flex-col md:flex-row w-full lg:w-9/12 m-auto py-20 p-2">
                                    <div className="md:w-1/2 flex md:flex-row flex-col">
                                    <div className='md:w-2/12 hidden md:block' translate="no">
                                        <VariantSlider variants={variants} handleImage={handleImage}/>
                                    </div>
                                    <div className='md:w-10/12' translate="no">
                                        <img src={image} alt={productDetails.product_name} draggable="false" />
                                    </div>
                                    <div className='md:hidden p-5 mt-10' translate="no">
                                        <VariantSmallSlider variants={variants} handleImage={handleImage}/>
                                    </div>
                                    </div>
                                    <div className="md:w-1/2 text-2xl md:ml-10">
                                        <h1 className='mb-2'>{productDetails.product_name}</h1>
                                        <h1 className='mb-2 text-lg' translate='no'>{minPrice} د.ك {maxPrice} – د.ك</h1>
                                        <form>
                                            {variants.length > 0 && variants[0].subcategory && (
                                                <>
                                                    <p className="text-sm font-black mb-2">{productDetails.product_name}</p>
                                                    <select
                                                        className="text-lg p-2 mb-2 border-2 text-sm"
                                                        value={selectedSubcategory}
                                                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                                                    >
                                                        <option translate="no">Choose an option</option>
                                                        {Array.from(new Set(variants.map(variant => variant.subcategory))).map((uniquesubcategory, index) => (
                                                            <option key={index} translate="no">{uniquesubcategory}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            )}

                                            <p className="text-sm font-black mb-2">COLOUR</p>
                                            <select
                                                className="text-lg p-2 mb-2 border-2 text-sm"
                                                value={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                            >
                                                <option translate="no">Choose an option</option>
                                                {Array.from(new Set(variants.map(variant => variant.color))).map((uniqueColor, index) => (
                                                    <option key={index} translate="no">{uniqueColor}</option>
                                                ))}
                                            </select>
                                            <p className="text-sm font-black mb-2">SIZE</p>
                                            <select
                                                className="text-lg p-2 mb-2 border-2 text-sm"
                                                value={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                            >
                                                <option translate="no">Choose an option</option>
                                                {Array.from(new Set(variants.map(variant => variant.size))).map((uniqueSize, index) => (
                                                    <option key={index} translate="no">{uniqueSize}</option>
                                                ))}
                                            </select>
                                            <p className="text-sm font-black mb-2">THICKNESS</p>
                                            <select
                                                className="text-lg p-2 mb-2 border-2 text-sm"
                                                value={selectedThickness}
                                                onChange={(e) => setSelectedThickness(e.target.value)}
                                            >
                                                <option translate="no">Choose an option</option>
                                                {Array.from(new Set(variants.map(variant => variant.thickness))).map((uniqueThickness, index) => (
                                                    <option key={index} translate="no">{uniqueThickness}</option>
                                                ))}
                                            </select>
                                            <button className="border-2 text-sm bg-white p-1 px-2 ml-2 "
                                                onClick={handleClearButtonClick}
                                            >
                                                <LoopOutlinedIcon sx={{ fontSize: "20px" }} /> Clear
                                            </button>
                                            {selectedVariant && stockAvailabilty > 0 ?(
                                            <>
                                                <p className='mb-5 mt-5 text-lg font-black' ><span>Order total: </span><span translate="no"> {price} د.ك</span></p> 
                                            </>
                                            ):(
                                            <>
                                                <p className='mb-5 mt-5 text-lg font-black' ><span>Item not available yet. choose another options</span></p>
                                            </>
                                            )}
                                            <div className='flex flex-row'>

                                                <div className='bg-white flex items-center justify-between rounded-3xl w-40 p-2 border-2'>
                                                    <span className='px-2 cursor-pointer' onClick={decrementQuantity}>
                                                        <RemoveIcon />
                                                    </span>
                                                    <input
                                                        type='text'
                                                        value={quantity}
                                                        min={1}
                                                        readOnly
                                                        className='w-8 text-center text-base focus:outline-none'
                                                    />
                                                    <span className='px-2 cursor-pointer' onClick={incrementQuantity}>
                                                        <AddIcon />
                                                    </span>
                                                </div>
                                                <button
                                                    className={`${selectedVariant && stockAvailabilty > 0
                                                        ? "bg-primary-darkBlue"
                                                        : "bg-primary-darkGrey opacity-50 cursor-not-allowed"
                                                        } text-base font-black ml-2 px-8 rounded-3xl text-white text-center hover:bg-primary-darkGrey`}
                                                    disabled={!selectedVariant || stockAvailabilty < 1}
                                                    onClick={handleCart}>
                                                    ADD TO CART
                                                </button>
                                            </div>
                                            <button className={`${selectedVariant ? "cursor-pointer" : "cursor-not-allowed"} text-base hover:text-primary-darkBlue mt-4`}
                                                disabled={!selectedVariant}
                                                onClick={handleWishlist}>
                                                {isProductInWishlist ? (
                                                    // If the product is in the wishlist, show the FavoriteIcon
                                                    <>
                                                        <FavoriteIcon sx={{ fontSize: '18px' }} />

                                                    </>
                                                ) : (
                                                    // If the product is not in the wishlist, show the Add to Wishlist button
                                                    <>
                                                        <FavoriteBorderIcon sx={{ fontSize: '18px' }} />
                                                        <span>

                                                        Add to Wishlist
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                        <p className='text-sm mt-4'>SKU: </p>
                                        <p className='text-sm mt-4'><span>Category: </span><span>{productDetails.category_name}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between md:gap-0 gap-4 md:w-4/12 m-auto text-xl mt-10 mb-6'>
                                <button
                                    className={`hover:text-primary-darkBlue ${activeTab === 'description' ? 'text-primary-darkBlue' : ''}`}
                                    onClick={() => handleTabClick('description')}
                                >
                                    Description
                                </button>
                                <button
                                    className={`hover:text-primary-darkBlue ${activeTab === 'additional' ? 'text-primary-darkBlue' : ''}`}
                                    onClick={() => handleTabClick('additional')}
                                >
                                    Additional information
                                </button>
                                <button
                                    className={`hover:text-primary-darkBlue ${activeTab === 'reviews' ? 'text-primary-darkBlue' : ''}`}
                                    onClick={() => handleTabClick('reviews')}
                                >
                                    Reviews ({reviews.length})
                                </button>
                            </div>

                            <div className='pb-20 mt-10 '>
                                {/* Description */}
                                {activeTab === 'description' && (
                                    <div className='md:w-2/4 w-10/12 flex m-auto text-sm'>
                                        <p className='leading-8 font-serif'>{productDetails.product_desc}</p>
                                    </div>
                                )}

                                {/* Additional information */}
                                {activeTab === 'additional' && (
                                    <div className='md:w-2/4 w-10/12 flex m-auto text-sm'>
                                        <table className="w-full border-2">
                                            <tr>
                                                <td className="bg-gray-100 p-2 border-2 w-1/4">Colour</td>
                                                <td className="p-2 border-2 w-3/4">
                                                    {Array.from(new Set(variants.map(variant => variant.color))).join(', ')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="bg-gray-100 p-2 border-2 w-1/4">Size</td>
                                                <td className="p-2 border-2 w-3/4">
                                                    {Array.from(new Set(variants.map(variant => variant.size))).join(', ')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="bg-gray-100 p-2 border-2 w-1/4">Thickness</td>
                                                <td className="p-2 border-2 w-3/4">
                                                    {Array.from(new Set(variants.map(variant => variant.thickness))).join(', ')}
                                                </td>
                                            </tr>
                                        </table>

                                    </div>
                                )}

                                {/* Reviews */}
                                {activeTab === 'reviews' && (
                                    <div className='md:w-2/4 w-10/12 flex m-auto flex-col gap-4'>
                                        {reviews.length > 0 ? (
                                            reviews.map((review) => (
                                                <div className='border-b'>
                                                    <div key={review.id}>
                                                        <AccountCircleIcon /> {review.name}
                                                    </div>
                                                    <div className='flex flex-col mx-8' translate='no'>
                                                        <Rating
                                                            name={`rating-${review.id}`}
                                                            value={review.rating}
                                                            precision={1}
                                                            readOnly
                                                        />
                                                        {review.review}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>There are no reviews yet.</p>
                                        )}
                                        <p>Your email address will not be published. Required fields are marked *</p>
                                        <p>Your rating *</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className='mt-2'>
                                                <Rating
                                                    onChange={(e) => setRating(e.target.value)}
                                                    value={rating}
                                                    size='medium'
                                                />
                                            </div>
                                            <div className='gap-5 flex flex-col'>

                                                <ThemeProvider theme={theme}>
                                                    <TextField
                                                        id="message"
                                                        name="message"
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        label="Your review"
                                                        fullWidth
                                                        multiline
                                                        rows={9}
                                                        defaultValue={""}
                                                        required
                                                    />
                                                    {isAuthenticated ? null : (
                                                        <>
                                                            <TextField
                                                                id="name"
                                                                type="text"
                                                                name="name"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                fullWidth
                                                                label="Name"
                                                                required
                                                            />
                                                            <TextField
                                                                id="email"
                                                                name="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                type="email"
                                                                fullWidth
                                                                label="Email"
                                                                required
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={rememberMe}
                                                                        onChange={() => setRememberMe(!rememberMe)}
                                                                    />
                                                                }
                                                                label="Save my name, email, and website in this browser for the next time I comment."
                                                            />
                                                        </>
                                                    )}
                                                </ThemeProvider>
                                                <button type="submit" className="mt-4 bg-primary-darkBlue w-28 p-2 rounded-3xl text-white text-center hover:bg-black">
                                                    SUBMIT
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div >
                        </div>

                    ) : (
                        // No product details available, display a message
                        <div className="mt-44 flex flex-col gap-4 items-center text-center h-screen">
                            <p className="text-xl leading-8 text-gray-600 mb-5">Opps! The product you are looking for <br /> is missing for some reasons. Please <br /> come back to shop.</p>
                            <Link to="/products" className="px-4 py-2 bg-primary-darkBlue uppercase shadow hover:shadow-lg text-white rounded-3xl">Continue Shopping</Link>
                        </div>
                    )}


                </div>
            )}
        </>
    )

}
export default ProductDetails;