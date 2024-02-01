import OrderDetails from "../Order/OrderDetails";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderAction';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from "../Layouts/BackdropLoader";
import ErrorIcon from '@mui/icons-material/Error';

const DetailedOrder = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const accessToken = localStorage.getItem('access')

    const { order = {}, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        dispatch(getOrderDetails(params.order, accessToken))
    }, [dispatch, accessToken])

    return (
        <>
            {loading ? <BackdropLoader />
                :
                <>
                    <MetaData title="Order Details | Plexi Click" />
                    {Object.keys(order).length > 0
                        ? (
                            <>
                                <div>
                                    <p className="font-sans">Order <span className="bg-primary-yellow">#{order.id}</span> was placed on <span className="bg-primary-yellow">{order.order_date}</span> and is currently <span className="bg-primary-yellow">{order.order_status}</span></p>
                                </div>

                                <div>
                                    <OrderDetails order={order} />
                                </div>
                            </>

                        ) : (
                            <div className='bg-red-600 text-white p-5 pl-10 mt-10'>
                                <MetaData title="Not found | Plexi Click" />
                                <ErrorIcon className='mr-5' />
                                Invalid order
                            </div>
                        )}
                </>
            }


        </>

    )
}

export default DetailedOrder;