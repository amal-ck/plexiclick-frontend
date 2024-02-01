import { FormControl, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearOrderErrors, getAdminOrderDetails, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { formatDate } from '../../utils/functions';
import TrackStepper from '../Order/TrackStepper';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MetaData from '../Layouts/MetaData';
import { getAdminReviewDetails, updateReview } from '../../actions/productAction';
import { UPDATE_REVIEW_RESET } from '../../constants/productConstants';
import { clearErrors, getUserDetails, updateUser } from '../../actions/userAction';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';

const UpdateUser = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    const [role, setRole] = useState();

    const { user = {}, error, loading } = useSelector((state) => state.userDetails);
    const { isUpdated, error: updateError, loading: updateLoading } = useSelector((state) => state.profile);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("User Updates Successfully", { variant: "success" });
            dispatch({ type: UPDATE_USER_RESET });
            navigate("/admin/users");
        }
        dispatch(getUserDetails(params.id, accessToken));
    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar, accessToken]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("is_staff", role);
        dispatch(updateUser(params.id, formData, accessToken));
    } 

    return (
        <>
            <MetaData title="Admin: Update User | PlexiClick" />
            {updateLoading && <BackdropLoader />}
            {loading ? <BackdropLoader /> : (
                <>
                    {user && (
                        <div className="flex flex-col gap-4">
                            <Link onClick={() => navigate(-1)} className="ml-1 flex items-center gap-0 font-medium text-primary-darkBlue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

                            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        {/* billing address */}
                                        <h3 className="font-medium text-lg">Update User</h3>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Username</p>
                                            <p>{user.username}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email</p>
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Joined Date</p>
                                            <p>{formatDate(user.date_joined)}</p>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={updateUserSubmitHandler} className="flex flex-col gap-3 p-8">
                                    <h3 className="font-medium text-lg">Update Role</h3>
                                    <div>
                                        <p className="text-sm font-medium">Current Role: {(user.is_staff ? 'admin' : 'user')}</p>
                                    </div>
                                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                                        <InputLabel id="order-status-select-label">Status</InputLabel>
                                        <Select
                                            labelId="role-select-label"
                                            id="role-select"
                                            value={role}
                                            label="Role"
                                            required
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <MenuItem value={true}>Admin</MenuItem>
                                            <MenuItem value={false}>User</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <button type="submit" className="bg-primary-darkBlue p-2.5 text-white font-medium rounded shadow hover:shadow-lg">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UpdateUser;
