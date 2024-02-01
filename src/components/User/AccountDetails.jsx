import { TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, clearErrors, loadUser, updatePassword } from "../../actions/userAction";
import BackdropLoader from "../Layouts/BackdropLoader";
import { useSnackbar } from "notistack";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const AccountDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { user = {} } = useSelector((state) => state.user);
    const { loading, isUpdated, error } = useSelector((state) => state.profile)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.username);
            setEmail(user.email);
            setFirstName(user.first_name);
            setLastName(user.last_name);
        }
        if ( isUpdated ) {
            enqueueSnackbar(isUpdated, {variant: 'success'});
            dispatch({ type: UPDATE_USER_RESET});
            setCurrentPassword('');
            setConfirmPassword('');
            setNewPassword('');
        }
        if ( error ) {
            if ( error.email ){
                enqueueSnackbar(error.email, {variant: 'error'});
            }
            if ( error.message ){
                enqueueSnackbar(error.message, {variant: 'error'});
            }
            if ( error.current_password ){
                enqueueSnackbar(error.current_password, {variant: 'error'});
            }
            if ( error.new_password ){
                enqueueSnackbar(error.new_password, {variant: 'error'});
            }
            if ( error.non_field_errors ){
                enqueueSnackbar(error.non_field_errors, {variant: 'error'});
            }
            dispatch(clearErrors());
        }
    },[dispatch, user, isUpdated, error, enqueueSnackbar]);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const userData = new FormData();
        userData.set("first_name", firstName);
        userData.set("last_name", lastName);
        userData.set("email", email);
        userData.set("username", displayName)
        await dispatch(updateProfile(userData, accessToken));
        dispatch(loadUser(accessToken))
    };

    const handlePasswordUpdate = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password do not match", { variant: "warning" });
            return;
        }

        const passwords = new FormData();
        passwords.set("current_password", currentPassword)
        passwords.set("new_password", newPassword) 
        dispatch(updatePassword(passwords, accessToken));
    }

    return (
        <>
        {loading && <BackdropLoader />}
        <div className="flex flex-col gap-5 font-sans">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-5 mb-4">
                    <TextField
                        fullWidth
                        id='firstName'
                        label="First name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>

                    <TextField
                        fullWidth
                        id="displayName"
                        label="Display name"
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <p className="italic mt-3 mb-4">This will be how your name will be displayed in the account section and in reviews</p>
                </div>
                <TextField
                    fullWidth
                    id="email"
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                <button type="submit" className="text-white py-3 sm:w-1/3 w-1/2 bg-primary-darkBlue shadow hover:shadow-lg rounded-3xl font-medium mt-4">Save changes</button>

            </form>
            <form onSubmit={handlePasswordUpdate}>
                {/* Password change */}

                <div className="flex flex-col gap-5 border-2 p-2 sm:p-5">
                    <p className="italic font-semibold">Password change</p>
                    <TextField
                        fullWidth
                        required
                        id="currentPassword"
                        label="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        type={showCurrentPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        id="NewPassword"
                        label="New password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        id="confirmPassword"
                        label="Confirm new password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <button type="submit" className="text-white py-3 sm:w-1/3 w-1/2 bg-primary-darkBlue shadow hover:shadow-lg rounded-3xl font-medium">Update Password</button>
                </div>
                {/* Password change */}
            </form>
        </div>
        </>
    )

}
export default AccountDetails;
