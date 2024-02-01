import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ForgotPassword = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#254d8f',
            },
        },
    });

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [usernameoremail, setUsernameorEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("usernameorEmail", usernameoremail);
        dispatch(forgotPassword(formData));
        setUsernameorEmail("");
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
    }, [dispatch, error, message, enqueueSnackbar]);


    return (
        <>
            <MetaData title="Forgot Password" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 lg:w-2/6 sm:mt-4 m-auto mb-7 bg-white">



                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center font-medium mt-6 text-gray-800">Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</h2>

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-4">
                                    <ThemeProvider theme={theme}>

                                        <TextField
                                            fullWidth
                                            label="Username or email"
                                            type="text"
                                            value={usernameoremail}
                                            onChange={(e) => setUsernameorEmail(e.target.value)}
                                            required
                                        />
                                    </ThemeProvider>

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <button type="submit" className="text-white py-3 w-full bg-primary-darkBlue shadow hover:shadow-lg rounded-3xl font-medium">Reset password</button>
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

export default ForgotPassword