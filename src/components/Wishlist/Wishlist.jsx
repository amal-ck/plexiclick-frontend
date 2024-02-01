import MetaData from '../Layouts/MetaData';
import Product from './Product';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, deleteWishlist } from '../../actions/wishlistAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ReportProblemSharpIcon from '@mui/icons-material/ReportProblemSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { WISHLIST_RESET } from '../../constants/wishlistConstants';
import { addItemsToCart, getCart } from '../../actions/cartAction';

const Wishlist = () => {

    const { wishlistItems = [], wishlistDelete } = useSelector((state) => state.wishlistItems);
    const accessToken = localStorage.getItem('access');
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const handleCheckboxChange = (itemId) => {
        const updatedSelectedItems = selectedItems.includes(itemId)
            ? selectedItems.filter((id) => id !== itemId)
            : [...selectedItems, itemId];
        setSelectedItems(updatedSelectedItems);
    };

    const handleDelete = async ( itemId ) => {
        await dispatch(deleteWishlist(itemId, accessToken));
        dispatch(getWishlist(accessToken));
    };

    const handleMultiDelete = async () => {
        if (selectedItems.length === 0){
            return enqueueSnackbar("please select items to remove", {variant:"info"})
        }
        await dispatch(deleteWishlist(selectedItems, accessToken));
        dispatch(getWishlist(accessToken));
    };

    const handleAlltoCart = async () => {
        // Filter wishlistItems that have variant_id
        const itemsWithVariantId = wishlistItems.filter(item => item.variant_id);

        if (itemsWithVariantId.length > 0) {
            const itemsToAddToCart = itemsWithVariantId.map(item => ({
                variant: item.variant_id,
                quantity: 1,
            }));
            const itemIds = itemsWithVariantId.map(item => item.id);

            try {
                await dispatch(addItemsToCart(itemsToAddToCart, accessToken));
                enqueueSnackbar("Items added to cart successfully", { variant: "success" });
                dispatch(deleteWishlist(itemIds, accessToken))
                dispatch (getCart(accessToken));
                dispatch(getWishlist(accessToken));
            } catch (error) {
                enqueueSnackbar("Failed to add items to cart Try again", { variant: "error" });
            }
        } else {
            enqueueSnackbar("Choose any options for adding to cart", { variant: "info" });
        }
    };

    const handleSelectedtoCart = async() => {

        const itemsWithVariantId = wishlistItems.filter(item => selectedItems.includes(item.id) && item.variant_id);

        if (itemsWithVariantId.length > 0) {
            const itemsToAddToCart = itemsWithVariantId.map(item => ({
                variant: item.variant_id,
                quantity: 1,
            }));
            const itemIds = itemsWithVariantId.map(item => item.id);

            try {
                await dispatch(addItemsToCart(itemsToAddToCart, accessToken));
                enqueueSnackbar("Items added to cart successfully", { variant: "success" });
                dispatch(deleteWishlist(itemIds, accessToken))
                dispatch (getCart(accessToken));
                dispatch(getWishlist(accessToken));
            } catch (error) {
                enqueueSnackbar("Failed to add items to cart Try again", { variant: "error" });
            }
        } else {
            enqueueSnackbar("Choose any options for adding to cart", { variant: "info" });
        }
    }

    useEffect(() => {
        if (wishlistDelete) {
            enqueueSnackbar("Item deleted from wishlist", { variant: "warning" });
            dispatch({ type: WISHLIST_RESET })
        }
    }, [dispatch, wishlistDelete, enqueueSnackbar]);

    useEffect(() => {
        // Handle "Select All" logic
        if (selectAll) {
            setSelectedItems(wishlistItems.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    }, [selectAll, wishlistItems]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
      };

    useEffect(() => {
        dispatch(getWishlist(accessToken))
    }, [dispatch, accessToken])

    return (
        <>
            <MetaData title="Wishlist | Plexi Click" />

            <main className="w-full mt-12 sm:mt-0">

                <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                    <div className="flex-1 shadow bg-white">
                        {/* <!-- wishlist container --> */}
                        <div className="flex flex-col">
                            <span className="font-medium text-lg px-4 sm:px-8 py-4">My Wishlist ({wishlistItems.length})</span>

                            {wishlistItems.length === 0 ? (
                                <>
                                    <div className='flex flex-row bg-primary-darkBlue p-4 text-white font-sans mt-5'>
                                        <p><WebAssetOutlinedIcon />  Your Wishlist is currently empty.</p>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <Link to="/products" className="px-4 py-2 ml-2 bg-primary-darkBlue uppercase shadow hover:shadow-lg text-white rounded-3xl">Return to Shop</Link>
                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                    <div className='hidden md:block'>
                                        <table className="w-full">
                                            <thead>
                                                <tr className='border'>
                                                    <th className='py-4 border'>
                                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                                    </th>
                                                    <th className='border'></th>
                                                    <th className='border'></th>
                                                    <th className='border'>Product Name</th>
                                                    <th className='border'>Unit Price</th>
                                                    <th className='border'>Date Added</th>
                                                    <th className='border'>Stock Status</th>
                                                    <th className='border'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {wishlistItems.map((item, index) => (
                                                    <Product
                                                        {...item}
                                                        key={index}
                                                        selected={selectedItems.includes(item.id)}
                                                        onCheckboxChange={() => handleCheckboxChange(item.id)}
                                                        onDelete={() => handleDelete([item.id])}
                                                    />
                                                )).reverse()}
                                            </tbody>
                                        </table>
                                        </div>
                                        <div className='block md:hidden w-11/12 m-auto'>
                                        {wishlistItems.map((item, index) => (
                                                    <>
                                                    {/* Display each wishlist item individually */}
                                                    <div className="p-4 border-2 mb-2" key={index}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div>
                                                                <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                                                                <span className="ml-2">{item.product_name}</span>
                                                            </div>
                                                            <button className="text-gray-400 hover:text-red-500" onClick={() => handleDelete([item.id])}>
                                                                <span><DeleteIcon /></span>
                                                            </button>
                                                        </div>
                                        
                                                        <div className="w-1/6 h-28">
                                                            <img draggable="false" className="h-full w-full object-contain" src={item.product_image} alt={item.product_name} />
                                                        </div>
                                        
                                                        <div className="p-2">
                                                            {item.subcategory && <><p className='font-black'>{item.product_name}: </p>
                                                                <p className='text-sm'>{item.subcategory}</p></>}
                                                            {item.color && <><p className='font-black'>Color: </p>
                                                                <p className='text-sm'>{item.color}</p></>}
                                                            {item.size && <><p className='font-black mt-2'>Size: </p>
                                                                <p className='text-sm'>{item.size}</p></>}
                                                            {item.thickness && <><p className='font-black mt-2'>Thickness: </p>
                                                                <p className='text-sm'>{item.thickness}</p></>}
                                                        </div>
                                        
                                                        <div className='p-2'>
                                                            <p className="w-56 sm:w-full font-black" translate='no'>
                                                                {item.price} د.ك
                                                            </p>
                                                        </div>
                                        
                                                        <div className='p-2'>
                                                            <p>{item.added_date}</p>
                                                        </div>
                                        
                                                        <div className='p-2'>
                                                            <p >{item.stock > 0
                                                                ? <><CheckIcon />
                                                                    <span>In stock</span>
                                                                    </>
                                                                : <> <ReportProblemSharpIcon />
                                                                    <span>Out of stock</span>
                                                                 </>}
                                                            </p>
                                                        </div>
                                        
                                                        <div className='text-center'>
                                                            <button
                                                                className="bg-primary-darkBlue text-base px-4 py-2 rounded-3xl text-white text-center hover:bg-primary-darkGrey"
                                                            // onClick={variant_id ? addToCartHandler : selectOptionHandler}
                                                            >
                                                                <p>{item.variant_id
                                                                    ? 'ADD TO CART'
                                                                    : 'CHOOSE AN OPTION'
                                                                }
                                                                </p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                                )).reverse()}
                                        </div>
                                        <div className='flex sm:flex-row flex-col p-4 gap-4 justify-between'>
                                            <button
                                                className="bg-primary-darkBlue text-base px-4 py-2 rounded-3xl text-white text-center hover:bg-primary-darkGrey"
                                                onClick={() => handleMultiDelete()}>
                                                Remove Selected
                                            </button>
                                            <div className="flex sm:flex-row flex-col gap-4">
                                                <button
                                                    className="bg-primary-darkBlue text-base px-4 py-2 rounded-3xl text-white text-center hover:bg-primary-darkGrey"
                                                    onClick={handleSelectedtoCart}>
                                                    Add Selected to Cart
                                                </button>
                                                <button
                                                    className="bg-primary-darkBlue text-base px-4 py-2 rounded-3xl text-white text-center hover:bg-primary-darkGrey"
                                                    onClick={handleAlltoCart}>
                                                    Add All to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                        </div>
                        {/* <!-- wishlist container --> */}

                    </div>

                </div>
            </main>
        </>
    );
};

export default Wishlist;
