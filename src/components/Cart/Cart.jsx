import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import AddIcon from '@mui/icons-material/Add';
import BackdropLoader from '../Layouts/BackdropLoader';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { getCart, addItemsToCart, deleteCart, addItemsToUnauthorizedCart, removeItemsFromUnauthorizedCart } from '../../actions/cartAction';
// import { TextField } from '@mui/material';

const Cart = () => {

    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access')
    const dispatch = useDispatch();

    const { cart = [''], cartLoading } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user)
    const { unauthorizedCartItems=[], unautherizedCartLoading } = useSelector((state) => state.unauthorizedCart)

    const itemsToMap = isAuthenticated ? cart : unauthorizedCartItems;

    const incrementQuantity = async (item) => {
        const newQuantity = 1;
        if (isAuthenticated){
          const cartItem = {
            variant: item.variant_id,
            quantity: newQuantity,
          };
          await dispatch(addItemsToCart([cartItem], accessToken));
          dispatch(getCart(accessToken));
        }else{
          const cartItem = {
            variant: item.id,
            quantity: newQuantity,
          };
          dispatch(addItemsToUnauthorizedCart([cartItem]));
        }
    };

    const decrementQuantity = async (item) => {
        if (item.quantity > 1) {
            const newQuantity = - 1; 
            if (isAuthenticated){
              const cartItem = {
                variant: item.variant_id,
                quantity: newQuantity,
              };
              await dispatch(addItemsToCart([cartItem], accessToken));
              dispatch(getCart(accessToken));
            }else{
              const cartItem = {
                variant: item.id,
                quantity: newQuantity,
              };
              dispatch(addItemsToUnauthorizedCart([cartItem]));
            }
        }
    }
    const handleDelete = async(cartId) => {
        if (isAuthenticated){
          await dispatch(deleteCart(cartId, accessToken));
          dispatch(getCart(accessToken));
        }else{
          dispatch(removeItemsFromUnauthorizedCart(cartId))
        }
      };

    return (
        <>
            <MetaData title="Shopping Cart | Plexi Click" />
            {cartLoading && <BackdropLoader />}
            {unautherizedCartLoading && <BackdropLoader />}
            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col lg:flex-row gap-3.5 w-full lg:w-10/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        {/* <!-- cart items container --> */}
                        <div className="flex flex-col bg-white">

                            {(isAuthenticated ? cart.length <= 0 : unauthorizedCartItems <= 0) ? (
                                <EmptyCart />
                            ) : (
                                <>
                                    <table className="hidden md:table">
                                        <thead className='font-semibold border-b'>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td className='py-5'>Product</td>
                                                <td>Price</td>
                                                <td>Quantity</td>
                                                <td>Subtotal</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemsToMap.map((item) => (
                                                <>
                                                    <tr key={item.id} className='border-b text-sm'>
                                                        <td>
                                                            <button>
                                                                <CloseIcon
                                                                    sx={{ fontSize: "14px", color: "red" }}
                                                                    onClick={() => handleDelete(item.id)}
                                                                />
                                                            </button>
                                                        </td>
                                                        <td className='py-2'>
                                                            <img src={item.variant_image} alt={item.product_name} width='90' draggable="false"/>
                                                        </td>
                                                        <td>
                                                            <p className='mb-1 font-semibold'>{item.product_name}</p>
                                                            {item.subcategory && <><p>{item.product_name}: {item.subcategory}</p></>}
                                                            {item.color && <><p>Color: {item.color}</p></>}
                                                            {item.size && <><p>Size: {item.size}</p></>}
                                                            {item.thickness && <><p>Thickness: {item.thickness}</p></>}
                                                        </td>
                                                        <td>{isAuthenticated ? item.price : item.sale_price} د.ك</td>
                                                        <td>
                                                            <div className='bg-white flex items-center justify-between rounded-3xl w-24 p-1 border-2 mt-1 h-8'>
                                                                <span className='px-2 cursor-pointer' onClick={() => decrementQuantity(item)}>
                                                                    <RemoveIcon sx={{ fontSize: "14px" }} />
                                                                </span>
                                                                <input
                                                                    type='text'
                                                                    value={item.quantity}
                                                                    readOnly
                                                                    className='w-7 text-center text-base focus:outline-none'
                                                                />
                                                                <span className='px-2 cursor-pointer' onClick={() => incrementQuantity(item)}>
                                                                    <AddIcon sx={{ fontSize: "14px" }} />
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className='font-semibold text-primary-darkBlue'><p translate='no'>{isAuthenticated ? item.sub_total : parseFloat(item.quantity * item.sale_price).toFixed(3)} د.ك</p> {item.stock < 1 && <p className='text-red-500'>Out of stock</p>} </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* for small screen */}

                                    <div className="md:hidden">
                                        {itemsToMap.map((item) => (
                                            <div key={item.id} className="flex flex-col border-b p-4 font-sans">
                                                <div className="flex items-center w-full">
                                                    <img src={item.variant_image} alt={item.product_name} width="90" draggable="false"/>
                                                    <div className="flex flex-col ml-4 w-full">
                                                        <div className="flex justify-between items-center w-full border-b">
                                                            <div>
                                                                <p className="font-semibold">{item.product_name}</p>
                                                                {item.subcategory && <p>{item.product_name}: {item.subcategory}</p>}
                                                                {item.color && <p>Color: {item.color}</p>}
                                                                {item.size && <p>Size: {item.size}</p>}
                                                                {item.thickness && <p>Thickness: {item.thickness}</p>}
                                                            </div>
                                                            <button>
                                                                <CloseIcon
                                                                    sx={{ fontSize: "14px", color: "red" }}
                                                                    onClick={() => handleDelete(item.id)}
                                                                />
                                                            </button>
                                                        </div>
                                                        <div className="mt-2 w-full flex justify-between border-b">
                                                            <p>Price: </p>
                                                            <p translate='no'>{item.price} د.ك</p>
                                                        </div>
                                                        <div className="flex items-center justify-between w-full border-b py-1">
                                                            <div>
                                                                <p>Quantity: </p>
                                                            </div>
                                                            <div className='border-2 rounded-3xl flex items-center w-20 justify-between'>
                                                                <span className="px-2 cursor-pointer" onClick={() => decrementQuantity(item)}>
                                                                    <RemoveIcon sx={{ fontSize: "14px" }} />
                                                                </span>
                                                                <p>{item.quantity}</p>
                                                                <span className="px-2 cursor-pointer" onClick={() => incrementQuantity(item)}>
                                                                    <AddIcon sx={{ fontSize: "14px" }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 w-full flex justify-between">
                                                            <p>Subtotal: </p>
                                                            <p className='text-primary-darkBlue font-semibold' translate='no'>{item.sub_total} د.ك</p> 
                                                            {item.stock < 1 && <p className='text-red-500'>Out of stock</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* <div className='mt-5 flex p-2 lg:flex-row flex-col'>
                                        <TextField
                                            fullWidth
                                            name="coupon"
                                            type="text"
                                            label="Coupon code"

                                        />
                                        <button className='lg:ml-5 lg:mt-1 mt-4 bg-primary-darkBlue w-full p-3 rounded-3xl text-white text-center hover:bg-black font-semibold'>Apply coupon</button>
                                    </div> */}
                                </>
                            )}


                        </div>
                        {/* <!-- cart items container --> */}

                    </div>
                    {/* <!-- cart column --> */}

                    <PriceSidebar cartItems={cart} unauthorizedCartItems={unauthorizedCartItems} isAuthenticated={isAuthenticated} />

                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Cart;
