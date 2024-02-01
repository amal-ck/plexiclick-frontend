import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearOrderErrors, getAdminOrderDetails, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { formatDate } from '../../utils/functions';
import TrackStepper from '../Order/TrackStepper';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MetaData from '../Layouts/MetaData';

const UpdateOrder = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const accessToken = localStorage.getItem('access');

    const [status, setStatus] = useState("");

    const { order={}, error, loading } = useSelector((state) => state.orderDetails);
    const { isUpdated, error: updateError } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearOrderErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearOrderErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updates Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
        }
        dispatch(getAdminOrderDetails(params.id, accessToken));
    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar, accessToken]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("order_status", status);
        dispatch(updateOrder(params.id, formData, accessToken));
    }

    return (
        <>
            <MetaData title="Admin: Update Order | PlexiClick" />

            {loading ? <Loading /> : (
                <>
                    {order && order.username && (
                        <div className="flex flex-col gap-4">
                            <Link to="/admin/orders" className="ml-1 flex items-center gap-0 font-medium text-primary-darkBlue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

                            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        {/* billing address */}
                                        <h3 className="font-medium text-lg">Billing Address</h3>
                                        <h4 className="font-medium">{order.billing_address.first_name} {order.billing_address.last_name}</h4>
                                        <p className="text-sm">{`${order.billing_address.house_no_street_name},${order.billing_address.apartment ? ` ${order.billing_address.apartment},` : ''} ${order.billing_address.town_or_city} - ${order.billing_address.post_code_zip}`}</p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Governorates</p>
                                            <p>{order.billing_address.governorates_name}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email</p>
                                            <p>{order.billing_address.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Phone Number</p>
                                            <p>{order.billing_address.phone_no}</p>
                                        </div>

                                        {/* shipping address */}
                                        {order.shipping_address.first_name &&
                                        <>
                                        <h3 className="font-medium text-lg">Shipping Address</h3>
                                        <h4 className="font-medium">{order.shipping_address.first_name} {order.shipping_address.last_name}</h4>
                                        <p className="text-sm">{`${order.shipping_address.house_no_street_name},${order.shipping_address.apartment ? ` ${order.shipping_address.apartment},` : ''} ${order.shipping_address.town_or_city} - ${order.shipping_address.post_code_zip}`}</p>
                                        {order.shipping_address.company_name &&
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Company Name</p>
                                            <p>{order.shipping_address.company_name}</p>
                                        </div>
                                        }
                                        </>
                                        }
                                    
                                        {/* total amount */}
                                        <h3 className="font-medium text-lg bg-yellow-300">Total Amount : {order.order_total} د.ك</h3>
                                        <h3 className="font-medium text-lg bg-yellow-300">Payment Status : {order.payment_status} د.ك</h3>

                                    </div>
                                </div>

                                <form onSubmit={updateOrderSubmitHandler} className="flex flex-col gap-3 p-8">
                                    <h3 className="font-medium text-lg">Update Status</h3>
                                    <div>
                                        <p className="text-sm mb-2">
                                            {order.order_status === "delivered" ? (`Delivered on ${formatDate(order.deliverd_at)}`) : (`Ordered on ${formatDate(order.order_date)}`)}
                                        </p>
                                        <p className="text-sm font-medium">Current Status: {order.order_status}</p>
                                    </div>
                                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                                        <InputLabel id="order-status-select-label">Status</InputLabel>
                                        <Select
                                            labelId="order-status-select-label"
                                            id="order-status-select"
                                            value={status}
                                            label="Status"
                                            required
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <MenuItem value={"processing"}>Processing</MenuItem>
                                            <MenuItem value={"ready for dispatch"}>Ready for Dispatch</MenuItem>
                                            <MenuItem value={"dispatched"}>Dispatched</MenuItem>
                                            <MenuItem value={"delivered"}>Delivered</MenuItem>
                                            <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <button type="submit" className="bg-primary-darkBlue p-2.5 text-white font-medium rounded shadow hover:shadow-lg">
                                        Update
                                    </button>
                                </form>
                            </div>

                            {order.order_items && order.order_items.map((item,i) => {

                                const { product_name, quantity, color, size, thickness, total, price, subcategory } = item;

                                return (
                                    <div className="flex flex-col sm:flex-row min-w-full shadow-lg rounded-lg bg-white px-2 py-5" key={i}>

                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-1">
                                            <div className="flex flex-col gap-1 overflow-hidden sm:ml-5">
                                                <p className="text-sm">{product_name.length > 45 ? `${product_name.substring(0, 45)}...` : product_name} 
                                                (
                                                    {subcategory ? subcategory : ''} {color ? color: ''}, {size ? size: ''}, {thickness ? thickness: ''}
                                                )</p>
                                                <p className="text-xs text-gray-600 mt-2">Quantity: {quantity}</p>
                                                <p className="text-xs text-gray-600">Price: {parseFloat(price).toFixed(3)} د.ك</p>
                                                <span className="font-medium">Total: {total} د.ك</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UpdateOrder;
