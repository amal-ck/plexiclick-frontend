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

const UpdateReview = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    const [status, setStatus] = useState("");

    const { reviewDetails = {}, error, loading } = useSelector((state) => state.reviewDetails);
    const { isUpdated, error: updateError } = useSelector((state) => state.review);

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
            enqueueSnackbar("Reviwe Updates Successfully", { variant: "success" });
            dispatch({ type: UPDATE_REVIEW_RESET });
            navigate(-1)
        }
        dispatch(getAdminReviewDetails(params.id, accessToken));
    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar, accessToken]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("review_status", status);
        dispatch(updateReview(params.id, formData, accessToken));
    }

    return (
        <>
            <MetaData title="Admin: Update Review | PlexiClick" />

            {loading ? <Loading /> : (
                <>
                    {reviewDetails && (
                        <div className="flex flex-col gap-4">
                            <Link onClick={() => navigate(-1)} className="ml-1 flex items-center gap-0 font-medium text-primary-darkBlue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

                            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        {/* billing address */}
                                        <h3 className="font-medium text-lg">Update Review</h3>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Product</p>
                                            <p>{reviewDetails.product_name}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Name</p>
                                            <p>{reviewDetails.name}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email</p>
                                            <p>{reviewDetails.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Rating</p>
                                            <Rating readOnly value={reviewDetails.rating} size="small" precision={1} />
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Review</p>
                                            <TextField
                                                label="Review"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                value={reviewDetails.review}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={updateOrderSubmitHandler} className="flex flex-col gap-3 p-8">
                                    <h3 className="font-medium text-lg">Update Status</h3>
                                    <div>
                                        <p className="text-sm font-medium">Current Status: {reviewDetails.review_status}</p>
                                    </div>
                                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                                        <InputLabel id="order-status-select-label">Status</InputLabel>
                                        <Select
                                            labelId="review-status-select-label"
                                            id="review-status-select"
                                            value={status}
                                            label="Status"
                                            required
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <MenuItem value={"accepted"}>Accept</MenuItem>
                                            <MenuItem value={"hide"}>Hide</MenuItem>
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

export default UpdateReview;
