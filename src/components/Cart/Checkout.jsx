import { useEffect, useState } from 'react';
import AddressDetails from './AddressDetails';
import { TextField } from '@mui/material';
import CheckoutSidebar from './CheckoutSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { clearErrors, updateBillingAddress } from '../../actions/userAction';
import { UPDATE_BILLING_RESET } from "../../constants/userConstants";
import BackdropLoader from "../Layouts/BackdropLoader";
import { newOrder, clearOrderErrors } from '../../actions/orderAction';
import { NEW_ORDER_RESET } from '../../constants/orderConstants';
import { initiatePayment } from '../../actions/productAction';
import logo from '../../assets/images/logo/logo.png';

const Checkout = () => {

    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('access')
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [showCouponSection, setShowCouponSection] = useState(false);
    const [notes, setNotes] = useState("");
    const [total, setTotal] = useState(0);

    const { cart = [] } = useSelector((state) => state.cart)
    const { order , orderLoading, orderError } = useSelector((state) => state.newOrder)
    const { governorate = [] } = useSelector((state) => state.governorate)
    const { billing = {}, loading, error, success } = useSelector((state) => state.billing)
    const { razorpay_amount, razorpay_order_id } = useSelector((state) => state.initiatePayment)

    const [address, setAddress] = useState({
        first_name: "",
        last_name: "",
        house_no_street_name: "",
        apartment: "",
        town_or_city: "",
        post_code_zip: "",
        phone_no: "",
        email: "",
        governorates: "",
    });

    const getGovernorateInfo = (governorates) => {
        const selectedGovernorate = governorate.find((gov) => gov.id === governorates);
        return selectedGovernorate;
    };
    const selectedGovernorateInfo = getGovernorateInfo(address.governorates);

    useEffect(() => {
        
        if ( error ) {
            if ( error.email ){
                enqueueSnackbar(error.email, {variant: 'error'});
            }
            if ( error.phone_no ){
                enqueueSnackbar("A valid phone number is required", {variant: 'error'});
            }
            dispatch(clearErrors());
        }
        if ( orderError ) {
            enqueueSnackbar(orderError, {variant: 'error'});
            dispatch(clearOrderErrors());
        }
        if (cart.length === 0) {
            navigate('/cart');
        }
        if ( success ) {
            dispatch({ type: UPDATE_BILLING_RESET});
            const data = new FormData();
            data.set("total_amount", total)
            data.set("notes", notes)
            dispatch(newOrder(data, accessToken))
        }
        if ( order ) {
            enqueueSnackbar("Order Placed", {variant: 'success'});
            navigate(`/order-placed/${order}`)
            // dispatch(initiatePayment(order, accessToken))
            dispatch({ type: NEW_ORDER_RESET});
        }
        // if(razorpay_order_id){
        //     let options = {
        //         "key": "rzp_test_68YPXpM9KxFOBW", 
        //         "amount": razorpay_amount,
        //         "currency": "KWD",
        //         "name": "Plexi Click",
        //         "description": "Test Transaction",
        //         "image": logo,
        //         "order_id": razorpay_order_id,
        //         "handler": function (response){
        //             alert(response.razorpay_payment_id);
        //             alert(response.razorpay_order_id);
        //             alert(response.razorpay_signature)
        //         },
        //         "prefill": {
        //             "name": "Gaurav Kumar",
        //             "email": "gaurav.kumar@example.com",
        //             "contact": "9000090000"
        //         },
        //         "notes": {
        //             "address": "Razorpay Corporate Office"
        //         },
        //         "theme": {
        //             "color": "#254d8f"
        //         }
        //     };
        //     var rzp1 = new window.Razorpay(options);
        //     rzp1.on('payment.failed', function (response){
        //             alert(response.error.code);
        //             alert(response.error.description);
        //             alert(response.error.source);
        //             alert(response.error.step);
        //             alert(response.error.reason);
        //             alert(response.error.metadata.order_id);
        //             alert(response.error.metadata.payment_id);
        //     });
        //     rzp1.open();
        // }
    }, [dispatch, success, error, order, razorpay_order_id, orderError, total, cart, enqueueSnackbar, navigate, accessToken]);

    useEffect(() => {
        const calculateTotal = () => {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(3);
            const governoratesAmount = selectedGovernorateInfo ? selectedGovernorateInfo.governorates_amount : 0;
            const calculatedTotal = (parseFloat(subtotal) + parseFloat(governoratesAmount)).toFixed(3);
            
            setTotal(calculatedTotal);
        };

        calculateTotal();
    }, [cart, selectedGovernorateInfo]);

    useEffect(() => {
        if (!loading) {
            setAddress({
                first_name: billing.first_name || '',
                last_name: billing.last_name || '',
                house_no_street_name: billing.house_no_street_name || '',
                apartment: billing.apartment || '',
                town_or_city: billing.town_or_city || '',
                post_code_zip: billing.post_code_zip || '',
                phone_no: billing.phone_no || '',
                email: billing.email || '',
                governorates: billing.governorates || governorate[0]?.id || '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [billing,governorate]);
    

    const handleDataChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    const handleCouponClick = () => {
        setShowCouponSection(!showCouponSection);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };



    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (!address.first_name || !address.last_name || !address.house_no_street_name || !address.town_or_city || !address.post_code_zip || !address.phone_no || !address.email || !address.governorates) {
            enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
            return;
        }
        const formData = new FormData();
        formData.set("first_name", address.first_name);
        formData.set("last_name", address.last_name);
        formData.set("house_no_street_name", address.house_no_street_name);
        formData.set("apartment", address.apartment);
        formData.set("town_or_city", address.town_or_city);
        formData.set("post_code_zip", address.post_code_zip);
        formData.set("phone_no", address.phone_no);
        formData.set("email", address.email);
        formData.set("governorates", address.governorates);

        dispatch(updateBillingAddress(formData, accessToken));
    }

    return (
        <>
        {loading && <BackdropLoader />}
        {orderLoading && <BackdropLoader />}
            <div className="w-full mt-5 text-center">
                <p>
                    Have a coupon?{' '}
                    <button
                        className="hover:text-primary-darkBlue font-semibold"
                        onClick={handleCouponClick}
                    >
                        Click here to enter your code
                    </button>
                </p>
            </div>
            <div
                className={`${
                    showCouponSection
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                } overflow-hidden transition-all duration-500`}
            >
                {/* Coupon code input field */}
                <div className="xl:w-5/12 lg:w-8/12 md:w-10/12 w-11/12 m-auto mt-4 border-dashed border-2 p-8">
                    <TextField
                        fullWidth
                        name="coupon"
                        type="text"
                        label="Coupon code"
                    />

                    {/* Apply button */}
                    <button className=' mt-4 bg-primary-darkBlue w-full p-3 rounded-3xl text-white text-center hover:bg-black font-semibold'>Apply coupon</button>
                </div>
            </div>
            <div className="w-10/12 m-auto flex lg:flex-row flex-col gap-16">
                <div className="lg:w-3/5 w-full mt-16">
                    <AddressDetails 
                    address={address}
                    handleDataChange={handleDataChange}
                    notes={notes}
                    handleNotesChange={handleNotesChange}
                    handlePlaceOrder={handlePlaceOrder}
                  />
                </div>
                <div className='lg:w-2/5 w-full mt-16'>
                    <CheckoutSidebar 
                    cartItems={cart}
                    handlePlaceOrder={handlePlaceOrder}
                    selectedGovernorateInfo={selectedGovernorateInfo}
                    total={total}
                    
                    />
                </div>
            </div>
        </>
    );
};

export default Checkout;
