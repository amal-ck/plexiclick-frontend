import CloseIcon from '@mui/icons-material/Close';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCart, addItemsToCart, deleteCart, addItemsToUnauthorizedCart, removeItemsFromUnauthorizedCart } from '../../actions/cartAction';
import AddIcon from '@mui/icons-material/Add';
import BackdropLoader from '../Layouts/BackdropLoader';
import RemoveIcon from '@mui/icons-material/Remove';

const SideBarCart = ({ setSideBarCart, SideBarcart }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const accessToken = localStorage.getItem('access')

  const { cart = [''], cartLoading } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.user)
  const { unauthorizedCartItems = [], unautherizedCartLoading } = useSelector((state) => state.unauthorizedCart)

  const isAnyItemOutOfStock = cart.some(item => item.stock < 1);
  const cartToMap = isAuthenticated ? cart : unauthorizedCartItems;

  const totalAmount = cart.reduce((total, cart) => total + parseFloat(cart.sub_total), 0).toFixed(3);
  const unauthorizedTotalAmount = unauthorizedCartItems.reduce((total, item) => total + parseFloat(item.quantity*item.sale_price), 0).toFixed(3);

  const calculateTotalQuantity = (cart) => {
    return cart.reduce((total, item) => total + parseInt(item.quantity), 0);
  };

  const handleCheckOut = () =>{
    navigate('/checkout');
    setSideBarCart(false)
}

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setSideBarCart(false);
      }

    };

    document.body.classList.add('noscroll');
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.body.classList.remove('noscroll');
      document.removeEventListener('click', handleClickOutside);
    };
  },[setSideBarCart]);

  useEffect(() => {
    dispatch(getCart(accessToken))
  }, [dispatch, accessToken])

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
      {cartLoading && <BackdropLoader />}
      {unautherizedCartLoading && <BackdropLoader />}
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50"
        style={{ display: SideBarcart ? 'block' : 'none' }}
      >
        <div ref={cartRef} className="fixed top-0 right-0 w-3/4 md:w-1/2 lg:w-1/4 h-full bg-white shadow-2xl flex flex-col text-lg p-4 z-10">
          <div className='flex flex-row justify-between mt-4'>
            <div className='flex flex-row'>
              <h2 className='text-sm mt-1'>SHOPPING CART</h2>
              <div className="w-5 h-5 p-2 bg-primary-darkBlue text-xs rounded-full flex justify-center items-center text-white ml-2 mt-1">
                {!cartLoading && ( isAuthenticated ? calculateTotalQuantity(cart) : calculateTotalQuantity(unauthorizedCartItems))}
              </div>
            </div>

            <button onClick={() => setSideBarCart(false)} className="text-gray-500">
              <CloseIcon />
            </button>
          </div>
          <hr className='mt-4' />

          {(isAuthenticated ? cart.length <= 0 : unauthorizedCartItems <= 0) ?
            <div className='flex flex-col items-center my-20'>
              <div className="w-20 h-20 p-2 bg-gray-100 text-xs rounded-full flex justify-center items-center ml-2">
                <ShoppingCartOutlinedIcon sx={{ fontSize: "30px" }} />
              </div>
              <h2 className='text-sm mt-4'>No products in the cart.</h2>
              <Link to='/products' className='bg-primary-darkBlue p-2 px-4 rounded-3xl text-white text-center mt-8 text-sm hover:bg-black'
                onClick={() => setSideBarCart(false)} >Continue Shopping</Link>

            </div>
            : (
              // cart items
              <>
                <div className='flex flex-col overflow-y-auto gap-4 mt-3'>
                  {cartToMap.map((item) => (
                    <div className='flex flex-row gap-4 mb-2' key={item.id}>
                    <div className='w-1/4'>
                      <img src={item.variant_image} alt={item.product_name} draggable="false"/>
                    </div>
                    <div className='text-xs text-gray w-3/4'>
                      <div className='flex flex-row justify-between'>
                        <div>
                          <p className='text-sm mb-2'>{item.product_name}</p>
                          {item.subcategory && <><p>{item.product_name}: {item.subcategory}</p></>}
                          {item.color && <><p>Color: {item.color}</p></>}
                          {item.size && <><p>Size: {item.size}</p></>}
                          {item.thickness && <><p>Thickness: {item.thickness}</p></>}
                        </div>
                        <div>
                          <button>
                            <CloseIcon 
                              sx={{ fontSize: "14px", color: "red" }}
                              onClick={(e) => {handleDelete(item.id);
                                e.stopPropagation();}}
                            />
                          </button>
                        </div>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <div className='border-2 rounded-3xl flex items-center w-24 justify-between'>
                          <span className='px-2 cursor-pointer' onClick={(e) => { e.preventDefault(); decrementQuantity(item); }}>
                            <RemoveIcon sx={{ fontSize: "14px" }} />
                          </span>
                          <input
                            type='text'
                            value={item.quantity}
                            readOnly
                            className='w-7 text-center text-base focus:outline-none'
                          />
                          <span className='px-2 cursor-pointer' onClick={(e) => { e.preventDefault(); incrementQuantity(item); }}>
                            <AddIcon sx={{ fontSize: "14px" }} />
                          </span>
                        </div>
                        <div className='mt-3 text-sm'>
                          {item.stock > 0 ? <p translate="no">{isAuthenticated ? item.sub_total : parseFloat(item.quantity*item.sale_price).toFixed(3)} د.ك</p> : <p className='text-red-500'>Out of stock</p> }

                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                <div className='mt-auto'>
                  <hr />
                  <div className='flex flex-row justify-between mt-4'>
                    <p className='text-sm font-black'>SUBTOTAL :</p>
                    <p className='text-primary-darkBlue text-sm font-black' translate="no">{!cartLoading && (isAuthenticated ? totalAmount : unauthorizedTotalAmount)} د.ك</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <Link to='/cart' className='text-sm mt-4 font-black hover:text-primary-darkBlue'
                      onClick={() => setSideBarCart(false)}>VIEW CART</Link>
                  
                    <button
                    className={`bg-primary-darkBlue py-4 w-full p-2 rounded-3xl text-white text-center hover:bg-black mt-4 mb-3 text-sm ${isAnyItemOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isAnyItemOutOfStock}
                    onClick={handleCheckOut}
                >
                  CHECKOUT
                </button>
                {isAnyItemOutOfStock && <p className='text-red-500 text-xs font-sans'>*Remove 'out of stock' items from cart</p>}
                  </div>
                </div>
              </>

            )}

        </div>
      </div>
    </>
  )
}

export default SideBarCart;
