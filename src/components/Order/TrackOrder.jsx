import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearOrderErrors, trackOrderAction } from '../../actions/orderAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import OrderDetails from './OrderDetails';
import { TRACK_ORDER_RESET } from '../../constants/orderConstants';
import { useSnackbar } from 'notistack';

const TrackOrder = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  const { trackOrder = {}, error, loading } = useSelector((state) => state.trackOrder);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#254d8f',
      },
    },
  });

  const handleTrackOrder = (e) => {
    e.preventDefault();
    dispatch(trackOrderAction(orderId, email));
  };

  useEffect(() => {
    return () => {
      dispatch({ type: TRACK_ORDER_RESET});
    };
  }, []);

  useEffect(() => {
    if(error){
      enqueueSnackbar(" Sorry, the order could not be found. Please contact us if you are having difficulty finding your order details.", {variant:"error"})
      dispatch (clearOrderErrors)
    }
  },[error])

  return (
    <>
      {loading && <BackdropLoader />}
      <MetaData title="Track Order | Plexi Click" />
      <div className="sm:w-10/12 p-2 m-auto justify-between items-top font-sans mt-10">
        {Object.keys(trackOrder).length === 0 ?
          (
            <>
              <p className="sm:text-lg text-md font-serif">
                To track your order, please enter your Order ID in the box below and press the "TRACK" button.
                This was given to you on your receipt and in the confirmation email you should have received.
              </p>
              <form onSubmit={handleTrackOrder}>
                <div className="flex sm:flex-row flex-col gap-4 sm:gap-10 mt-16">
                  <ThemeProvider theme={theme}>
                    <TextField
                      id="orderid"
                      type="text"
                      name="orderid"
                      fullWidth
                      label="Order ID"
                      placeholder="Found in your order confirmation email."
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                    />
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      fullWidth
                      label="Email"
                      placeholder="Email you used during checkout."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </ThemeProvider>
                </div>
                <button
                  type="submit"
                  className="mt-6 bg-primary-darkBlue w-28 p-2 rounded-3xl text-white text-center hover:bg-black"
                >
                  Track
                </button>
              </form>
            </>
          ) : (
            <div className='lg:w-7/12 w-full m-auto p-1'>
              <div>
                <p className="font-sans">
                  Order <span className="bg-primary-yellow">#{trackOrder.id}</span> was placed on{' '}
                  <span className="bg-primary-yellow">{trackOrder.order_date}</span> and is currently{' '}
                  <span className="bg-primary-yellow">{trackOrder.order_status}</span>
                </p>
              </div>

              <div>
                <OrderDetails order={trackOrder} />
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default TrackOrder;
