import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser, loadUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material';
import { getWishlist } from '../../actions/wishlistAction';
import { addItemsToCart, emptyUnauthorizedCart, getCart } from '../../actions/cartAction';

const Login = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#254d8f',
            },
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);
    const { unauthorizedCartItems=[] } = useSelector((state) => state.unauthorizedCart)

    const [username_or_email, setUsernameorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(username_or_email, password, rememberMe));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            dispatch(loadUser(accessToken));
            if(user && user.role === "admin"){
                navigate(`/admin/dashboard`);
            }
            if(user && user.role === "user"){
                navigate(`/dashboard`);
                dispatch(getWishlist(accessToken));
                if(unauthorizedCartItems.length > 0){
                const itemsToAddToCart = unauthorizedCartItems.map(item => ({
                    variant: item.id,
                    quantity: parseInt(item.quantity),
                }));
                dispatch(addItemsToCart(itemsToAddToCart, accessToken));
                dispatch(emptyUnauthorizedCart())
                dispatch(getCart(accessToken));
            }
            }
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar, accessToken]);

    return (
        <>
            <MetaData title="Login | Plexi Click" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0 text-center p-1">

                <h1 className='text-2xl font-serif'>Login</h1>
                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 lg:w-3/6 xl:w-2/6 sm:mt-4 m-auto mb-7 bg-white border-dashed border-2">

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            fullWidth
                                            id="usernameoremail"
                                            label="Username or email address"
                                            type="text"
                                            value={username_or_email}
                                            onChange={(e) => setUsernameorEmail(e.target.value)}
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            required
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={rememberMe}
                                                    onChange={() => setRememberMe(!rememberMe)}
                                                />
                                            }
                                            label="Remember Me"
                                        />
                                    </ThemeProvider>

                                    {/* <span className="text-xxs text-red-500 font-medium text-left mt-0.5">Please enter valid Username/ Email ID/Mobile number</span> */}

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-24">
                                        <button type="submit" className="text-white py-3 w-full bg-primary-darkBlue shadow hover:shadow-lg rounded-3xl font-medium">Login</button>
                                        <Link to="/password/forgot" className="hover:text-primary-darkBlue text-center py-3 w-full font-medium">Lost your password?</Link>
                                    </div>
                                    {/* <!-- button container --> */}

                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            <Link to="/register" className="font-medium text-sm text-primary-darkBlue">New to Plexi Click? Create an account</Link>
                        </div>
                        {/* <!-- edit info container --> */}

                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Login;
