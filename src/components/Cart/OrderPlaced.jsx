import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderAction';
import MetaData from '../Layouts/MetaData';
import OrderDetails from '../Order/OrderDetails';
import BackdropLoader from '../Layouts/BackdropLoader';
import ErrorIcon from '@mui/icons-material/Error';

const OrderPlaced = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const accessToken = localStorage.getItem('access')

    const { order = {}, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        dispatch(getOrderDetails(params.order, accessToken))
    }, [dispatch])

    return (
        <>
            {loading ?
                <BackdropLoader />
                :
                <div className="flex m-auto lg:w-7/12 w-full flex-col p-1">
                    {Object.keys(order).length > 0 ?
                        <>
                            <div className='m-auto mt-14'>
                                <p
                                    className='border border-dashed p-5 border-2 border-primary-darkBlue text-primary-darkBlue font-semibold sm:text-2xl text-md font-sans text-center'
                                >Thank you for shopping with us. Your account has been charged and your transaction is successful. We will be processing your order soon.</p>
                            </div>
                            <div className='flex lg:flex-row flex-col justify-between mt-10 p-5 text-center gap-5 font-sans'>
                                <div className='border-b lg:border-none pb-4'>
                                    <p>Order number:</p>
                                    <p>{order.id}</p>
                                </div>

                                <div className='border-b lg:border-none pb-4'>
                                    <p>Date:</p>
                                    <p>{order.order_date}</p>
                                </div>
                                <div className='border-b lg:border-none pb-4'>
                                    <p>Total:</p>
                                    <p translate='no'>{order.order_total} د.ك</p>
                                </div>
                                <div className='border-b lg:border-none pb-4'>
                                    <p>Payment method:</p>
                                    <p>cash on delivery</p>
                                </div>
                            </div>
                            <p className='mt-10 text-gray-800 font-sans'>Pay with cash upon delivery</p>
                            <OrderDetails order={order} />
                        </>
                        :
                        <div className='bg-red-600 text-white p-5 pl-10 mt-10'>
                            <MetaData title="Not found | Plexi Click" />
                            <ErrorIcon className='mr-5' />
                            Invalid order
                        </div>}
                </div>
            }
            <MetaData title="Order Placed | Plexi Click" />

        </>
    )
};

export default OrderPlaced;