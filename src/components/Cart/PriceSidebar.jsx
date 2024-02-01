import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PriceSidebar = ({ cartItems,unauthorizedCartItems, isAuthenticated }) => {

    const navigate = useNavigate();
    const isAnyItemOutOfStock = cartItems.some(item => item.stock < 1);

    const totalAmount = cartItems.reduce((total, cart) => total + parseFloat(cart.sub_total), 0).toFixed(3);
    const unauthorizedTotalAmount = unauthorizedCartItems.reduce((total, item) => total + parseFloat(item.quantity*item.sale_price), 0).toFixed(3);

    const handleCheckOut = () =>{
        navigate('/checkout')
    }
    return (
        <div className="flex sticky top-16 sm:h-full flex-col lg:w-4/12 sm:px-1">

            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-white rounded-sm border">
                <h1 className="px-6 py-3 text-lg text-gray-500">Cart Totals</h1>

                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between border-b py-2">Subtotal<span className="text-primary-darkBlue" translate="no">{isAuthenticated ? totalAmount : unauthorizedTotalAmount} د.ك</span></p>
                    <p className="flex justify-between text-lg font-bold">Total<span className="text-primary-darkBlue" translate="no">{isAuthenticated ? totalAmount : unauthorizedTotalAmount} د.ك</span></p>
                {isAnyItemOutOfStock && <p className='text-red-500 text-xs font-sans'> *Remove 'out of stock' items from cart</p>}
                </div>
                <button
                    className={`bg-primary-darkBlue m-4 p-3 rounded-3xl text-white text-center hover:bg-black font-semibold ${(isAuthenticated ? (isAnyItemOutOfStock || cartItems.length <= 0 ) : unauthorizedCartItems <= 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={ isAuthenticated ? (isAnyItemOutOfStock || cartItems.length === 0) : unauthorizedCartItems <= 0}
                    onClick={handleCheckOut}
                >
                    PROCEED TO CHECKOUT
                </button>

            </div>
            {/* <!-- nav tiles --> */}

        </div>
    );
};

export default PriceSidebar;
