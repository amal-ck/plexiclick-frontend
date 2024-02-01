import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import BackdropLoader from "../Layouts/BackdropLoader";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { billingAddressAction, getGovernorates, updateBillingAddress, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { UPDATE_BILLING_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

const BillingAddress = () => {

    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('access')
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { governorate = [] } = useSelector((state) => state.governorate)
    const { billing = {}, loading, error, success } = useSelector((state) => state.billing)

    const [address, setAddress] = useState({
        first_name: "",
        last_name: "",
        house_no_street_name: "",
        apartment: "",
        town_or_city: "",
        post_code_zip: "",
        phone_no: "",
        email: "",
        governorates: "",
    });

    const { 
        first_name,
        last_name,
        house_no_street_name,
        apartment,
        town_or_city,
        post_code_zip,
        phone_no,
        email,
        governorates,
    } = address;

    const handleDataChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        dispatch(getGovernorates());
        dispatch(billingAddressAction(accessToken));
    },[dispatch, accessToken]);

    useEffect(() => {
        
        if ( success ) {
            enqueueSnackbar(success, {variant: 'success'});
            dispatch({ type: UPDATE_BILLING_RESET});
            navigate(`/dashboard/addresses`)
        }
        if ( error ) {
            if ( error.email ){
                enqueueSnackbar(error.email, {variant: 'error'});
            }
            if ( error.phone_no ){
                enqueueSnackbar("A valid phone number is required", {variant: 'error'});
            }
            dispatch(clearErrors());
        }
    }, [dispatch, success, error, enqueueSnackbar, navigate]);

    useEffect(()=>{
        if (!loading) {
            setAddress({
                first_name: billing.first_name || '',
                last_name: billing.last_name || '',
                house_no_street_name: billing.house_no_street_name || '',
                apartment: billing.apartment || '',
                town_or_city: billing.town_or_city || '',
                post_code_zip: billing.post_code_zip || '',
                phone_no: billing.phone_no || '',
                email: billing.email || '',
                governorates: billing.governorates || '',
            });
        }
    },[billing])
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("first_name", first_name);
        formData.set("last_name", last_name);
        formData.set("house_no_street_name", house_no_street_name);
        formData.set("apartment", apartment);
        formData.set("town_or_city", town_or_city);
        formData.set("post_code_zip", post_code_zip);
        formData.set("phone_no", phone_no);
        formData.set("email", email);
        formData.set("governorates", governorates)

        dispatch(updateBillingAddress(formData, accessToken))
        
    }

    return (
        <>
            {loading && <BackdropLoader />}
            <div className="flex flex-col gap-5 font-sans">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-5 mb-4">
                        <TextField
                            fullWidth
                            name='first_name'
                            label="First name"
                            type="text"
                            required
                            value={first_name}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="last_name"
                            label="Last Name"
                            type="text"
                            required
                            value={last_name}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div label='country'>
                        <p>Country / Region *</p>
                        <p className="font-bold">Kuwait</p>
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                        <TextField
                            fullWidth
                            name="house_no_street_name"
                            label="House number and street name"
                            type="text"
                            required
                            value={house_no_street_name}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="apartment"
                            type="text"
                            label="Apartment, suite, unit, etc. (optional)"
                            value={apartment}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="town_or_city"
                            label="Town / City"
                            type="text"
                            required
                            value={town_or_city}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="post_code_zip"
                            label="Postcode / ZIP"
                            type="text"
                            required
                            value={post_code_zip}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="phone_no"
                            label="Phone"
                            type="text"
                            required
                            value={phone_no}
                            onChange={handleDataChange}
                        />

                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={handleDataChange}
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Governorates</InputLabel>
                            <Select
                                labelId="governorates"
                                name="governorates"
                                label="Governorates" 
                                value={governorates}
                                onChange={handleDataChange}
                                required
                            >
                                {governorate.map((gov) =>(
                                    <MenuItem key={gov.id} value={gov.id}>{gov.governorates_name} ( + {gov.governorates_amount} د.ك)</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <button type="submit" className="text-white py-3 sm:w-1/3 w-1/2 bg-primary-darkBlue shadow hover:shadow-lg rounded-3xl font-medium mt-4">Save changes</button>
                    </div>

                </form>
            </div>
        </>
    );
}
export default BillingAddress;