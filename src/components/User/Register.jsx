import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { ThemeProvider, createTheme } from '@mui/material';
import { addItemsToCart, emptyUnauthorizedCart, getCart } from '../../actions/cartAction';

const Register = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#254d8f',
            },
        },
    });

    const accessToken = localStorage.getItem('access')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);
    const { unauthorizedCartItems=[] } = useSelector((state) => state.unauthorizedCart)

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password, } = user;

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }

        const formData = new FormData();
        formData.set("email", email);
        formData.set("password", password);

        dispatch(registerUser(formData));
    }

    const handleDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/dashboard')
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
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Register | Plexi Click" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0 text-center p-1">
                <h1 className='text-2xl font-serif'>Register</h1>

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 lg:w-3/6 xl:w-2/6 sm:mt-4 m-auto mb-7 bg-white border-2 border-dashed">

                    {/* <!-- signup column --> */}
                    <div className="flex-1 overflow-hidden">
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- personal info procedure container --> */}
                            <form onSubmit={handleRegister}>
                                <div className="flex flex-col gap-4 w-full">

                                    {/* <!-- input container column --> */}
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleDataChange}
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={handleDataChange}
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
                                    </ThemeProvider>

                                    {/* policy */}
                                    <div className='text-start'>
                                        <p className='text-sm leading-6 font-serif'>Your personal data will be used to support your experience throughout this website,
                                            to manage access to your account, and for other purposes described in our
                                            <Link to='/privacy-policy' target="_blank" className='hover:text-primary-darkBlue'> privacy policy.</Link></p>
                                    </div>
                                    {/* policy */}

                                    {/* <!-- input container column --> */}
                                    <button type="submit" className="text-white py-3 w-full bg-primary-darkBlue shadow hover:shadow-lg rounded-3xl font-medium mb-24">Signup</button>
                                    <Link to="/login" className="font-medium text-sm text-primary-darkBlue">Existing User? Log in</Link>
                                </div>

                            </form>
                        </div>
                        {/* <!-- personal info procedure container --> */}

                    </div>
                    {/* <!-- signup column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Register;
