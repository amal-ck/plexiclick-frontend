import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { myOrders } from '../../actions/orderAction';
import BackdropLoader from '../Layouts/BackdropLoader';

const Orders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access')

    const { orders = [], loading } = useSelector((state) => state.myOrders)

    useEffect(() => {
        dispatch(myOrders(accessToken));
    }, [dispatch])

    const handleView = (id) =>{
        navigate(`order-detail/${id}`)
    }

    return (
        <>
            {loading && <BackdropLoader />}
            {orders.length === 0
                ?
                <div className='flex flex-row bg-primary-darkBlue p-4 text-white font-sans'>
                    <p><WebAssetOutlinedIcon /> No orders has been made yet.</p>
                    <Link to='/products' className='hidden md:block hover:bg-black rounded-3xl px-5'>Browse products</Link>
                </div>
                :
                <div>
                    <table className='w-full border-collapse'>
                        <thead className='font-semibold'>
                            <tr>
                                <td className='border p-2'>Order</td>
                                <td className='border p-2'>Date</td>
                                <td className='border p-2'>Status</td>
                                <td className='border p-2'>Total</td>
                                <td className='border p-2'>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className='border p-2'>#{order.id}</td>
                                    <td className='border p-2'>{order.created_at}</td>
                                    <td className='border p-2'>{order.order_status}</td>
                                    <td className='border p-2'>{order.total_amount} د.ك</td>
                                    <td className='border p-2'>
                                        <button
                                         className='bg-primary-darkBlue p-1 pl-3 pr-3 rounded-2xl text-white text-center hover:bg-black'
                                         onClick={() => handleView(order.id)}
                                         >View</button>
                                    </td>
                                </tr>
                            )).reverse()}
                        </tbody>
                    </table>

                </div>
            }


        </>
    )
}

export default Orders;