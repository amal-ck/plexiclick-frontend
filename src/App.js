import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { loadUser, refreshTokenAction } from './actions/userAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import UpdateProfile from './components/User/UpdateProfile';
// import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
// import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
// import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/OrderTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import ProductTable from './components/Admin/ProductTable';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewsTable from './components/Admin/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';
import ContactUs from './components/Home/CompanyDetails/ContactUs';
import AboutUs from './components/Home/CompanyDetails/AboutUs';
import GotoTop from './components/Layouts/GotoTop';
import TrackOrder from './components/Order/TrackOrder';
import UserDashBoard from './components/User/UserDashBoard';
import Orders from './components/Order/Orders';
import Dash from './components/User/Dash';
import Downloads from './components/User/Downloads';
import Addresses from './components/User/Addresses';
import AccountDetails from './components/User/AccountDetails';
import BillingAddress from './components/User/BillingAddress';
import ShippingAddress from './components/User/ShippingAddress';
import Checkout from './components/Cart/Checkout';
import DetailedOrder from './components/User/DetailedOrder';
import OrderPlaced from './components/Cart/OrderPlaced';
import CategoryTable from './components/Admin/CategoryTable';
import MessageTable from './components/Admin/MessageTable';
import UpdateCategory from './components/Admin/UpdateCategory';
import NewCategory from './components/Admin/NewCategory';
import UpdateVariant from './components/Admin/UpdateVariant';
import NewVariant from './components/Admin/NewVariant';
import UpdateReview from './components/Admin/UpdateReview';
import ViewMessage from './components/Admin/ViewMessage';
import Config from './components/Admin/Config';
import UserTable from './components/Admin/UserTable';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const accessToken = localStorage.getItem('access')
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    const refreshAccessToken = async() => {
       await dispatch(refreshTokenAction());
       dispatch(loadUser(accessToken))
    };
  
    // Call refreshAccessToken once immediately after the component mounts
    refreshAccessToken();
  
    // Set up an interval to call refreshAccessToken every 15 minutes
    const refreshTokenInterval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(refreshTokenInterval);
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  const [isInAdminDashboard, setIsInAdminDashboard] = useState(false);

  // Use the 'useEffect' hook to update the state based on the current route
  useEffect(() => {
    // Check if the current route is within the admin dashboard
    const isAdminDashboard = window.location.pathname.startsWith('/admin');
    setIsInAdminDashboard(isAdminDashboard);
  }, [pathname]);

  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode == 123) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  // });
  
  return (
    <>
      {/* {isInAdminDashboard ? null : <Header />} */}
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/product/:product_name" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path='/order-placed/:order' element={<OrderPlaced />} />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } />
        
        

        <Route path='/dashboard' element={
          <ProtectedRoute>
            <UserDashBoard />
          </ProtectedRoute>
        } >
          <Route path='' element={<Dash/> }/>
          <Route path='orders' element={<Orders/>} />
          <Route path='orders/order-detail/:order' element={<DetailedOrder/>} />
          <Route path='downloads' element={<Downloads/>} />
          <Route path='addresses' element={<Addresses/>} />
          <Route path='addresses/billing' element={<BillingAddress/>} />
          <Route path='addresses/shipping' element={<ShippingAddress/>} />
          <Route path='account-details' element={<AccountDetails/>} />
        </Route>
        
        <Route path='/checkout' element={<ProtectedRoute> <Checkout /></ProtectedRoute>} />

        {/* order process */}
        {/* <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } ></Route>

        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        } ></Route> */}

        <Route path="/process/payment" element={
          <ProtectedRoute>
            {/* // stripeApiKey && ( */}
            {/* // <Elements stripe={loadStripe(stripeApiKey)}> */}
            <Payment />
            {/* // </Elements> */}
            {/* ) */}
          </ProtectedRoute>
        } ></Route>
{/* 
        <Route path="/orders/success" element={<OrderSuccess success={true} />} />
        <Route path="/orders/failed" element={<OrderSuccess success={false} />} /> */}
        {/* order process */}

        {/* <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }></Route>

        <Route path="/order_details/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }></Route> */}

        {/* <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } ></Route>

        <Route path="/account/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } ></Route>

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } ></Route> */}

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/category" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <CategoryTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/category/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <UpdateCategory />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_category" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <NewCategory />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_product" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <NewProduct />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/product/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <UpdateProduct />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/variant/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <UpdateVariant />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_variant/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <NewVariant />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/review/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <UpdateReview />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/configurations" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <Config />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/messages" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <MessageTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/messages/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <ViewMessage />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={6}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={6}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
      <GotoTop />
      <Footer />
    </>
  );
}

export default App;
