import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { deleteWishlist, getWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import CheckIcon from '@mui/icons-material/Check';
import ReportProblemSharpIcon from '@mui/icons-material/ReportProblemSharp';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../constants/cartConstants';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { addItemsToCart, getCart } from '../../actions/cartAction';
import { useSnackbar } from 'notistack';

const Product = (props) => {
    const { id, product_image, product_name, price, added_date, stock, subcategory, color, size, thickness, variant_id, selected, onCheckboxChange, onDelete } = props;
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('access')
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleCart = async () => {
        const newQuantity = 1
        const cartItem = {
            variant: variant_id,
            quantity: newQuantity,
        };
        await dispatch(addItemsToCart([cartItem], accessToken));
        enqueueSnackbar("Item added to cart", { variant: "success" });
        dispatch(deleteWishlist([id], accessToken))
        dispatch(getCart(accessToken));
        dispatch(getWishlist(accessToken));
    };

    const selectOptionHandler = () => {
        navigate(`/product/${product_name}`)
    }

    return (
        <>
            <tr className="border-b" key={id}>
                <td className='border text-center'>
                    <input type="checkbox" checked={selected} onChange={onCheckboxChange} />
                </td>

                <td className='border text-center'>
                    <button className="text-gray-400 hover:text-red-500" onClick={onDelete}>
                        <span><DeleteIcon /></span>
                    </button>
                </td>

                <td className="w-1/6 h-28 border">
                    <img draggable="false" className="h-full w-full object-contain" src={product_image} alt={product_name} />
                </td>

                <td className="p-2 border">
                    <Link to={`/product/${product_name}`} className="flex flex-col mb-2">
                        <p className="group-hover:text-primary-blue w-56 sm:w-full">
                            {product_name}
                        </p>
                    </Link>
                    {subcategory && <><p className='font-black'>{product_name}: </p>
                        <p className='text-sm'>{subcategory}</p></>}
                    {color && <><p className='font-black'>Color: </p>
                        <p className='text-sm'>{color}</p></>}
                    {size && <><p className='font-black mt-2'>Size: </p>
                        <p className='text-sm'>{size}</p></>}
                    {thickness && <><p className='font-black mt-2'>Thickness: </p>
                        <p className='text-sm'>{thickness}</p></>}
                </td>

                <td className='border p-2'>
                    <p className="w-56 sm:w-full">
                        <span translate='no'>{price} د.ك</span>
                    </p>
                </td>

                <td className='border p-2'>
                    <p>{added_date}</p>
                </td>

                <td className='border p-2'>
                    <p className='flex flex-row'>{stock > 0
                        ? <><CheckIcon />
                            <span className='hidden lg:block'>In stock</span> </>
                        : <><ReportProblemSharpIcon />
                            <span className='hidden lg:block'>Out of stock </span> </>}</p>
                </td>

                <td className='border text-center'>
                    <button
                        className="bg-primary-darkBlue text-base px-4 py-2 rounded-3xl text-white text-center hover:bg-primary-darkGrey"
                        disabled={stock < 1}
                        onClick={() => variant_id ? handleCart([variant_id]) : selectOptionHandler()}
                    >
                        <p className='flex flex-row'>{variant_id
                            ? <>
                                <span className='block lg:hidden'>

                                    <ShoppingCartOutlinedIcon />
                                </span>
                                <span className='hidden lg:block'>ADD TO CART</span> </>
                            : <>
                                <span className='block lg:hidden'>

                                    <ListOutlinedIcon />
                                </span>
                                <span className='hidden lg:block'>CHOOSE AN OPTION</span> </>}</p>

                    </button>
                </td>

            </tr>
        </>

    );
};

export default Product;
