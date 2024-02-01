import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearOrderErrors } from '../../actions/orderAction';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MetaData from '../Layouts/MetaData';
import { getAdminContactusDetails } from '../../actions/userAction';

const ViewMessage = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    const { contactusDetails = {}, error, loading } = useSelector((state) => state.contactusDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearOrderErrors());
        }
        dispatch(getAdminContactusDetails(params.id, accessToken));
    }, [dispatch, error, params.id, enqueueSnackbar, accessToken]);

    return (
        <>
            <MetaData title="Admin: View Message | PlexiClick" />

            {loading ? <Loading /> : (
                <>
                    {contactusDetails && (
                        <div className="flex flex-col gap-4">
                            <Link onClick={() => navigate(-1)} className="ml-1 flex items-center gap-0 font-medium text-primary-darkBlue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

                            <div className="flex flex-col bg-white shadow-lg rounded-lg w-full">
                                <div className="flex flex-col gap-3 my-8 mx-10">
                                    {/* billing address */}
                                    <h3 className="font-medium text-lg">Message</h3>
                                    <div className="flex gap-2 text-sm">
                                        <p className="font-medium">Name</p>
                                        <p>{contactusDetails.name}</p>
                                    </div>
                                    <div className="flex gap-2 text-sm">
                                        <p className="font-medium">Email</p>
                                        <p>{contactusDetails.email}</p>
                                    </div>
                                    <div className="flex gap-2 text-sm">
                                        <p className="font-medium">message</p>
                                        <TextField
                                            label="Message"
                                            multiline
                                            rows={6}
                                            variant="outlined"
                                            value={contactusDetails.message}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ViewMessage;
