import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import BackdropLoader from "../Layouts/BackdropLoader";
import { shippingAddressAction, updateShippingAddress, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { UPDATE_SHIPPING_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

const ShippingAddress = () => {

    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('access')
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { shipping = {}, loading, error, success } = useSelector((state) => state.shipping)

    const [address, setAddress] = useState({
        first_name: "",
        last_name: "",
        company_name: "",
        house_no_street_name: "",
        apartment: "",
        town_or_city: "",
        post_code_zip: "",
    });

    const { 
        first_name,
        last_name,
        company_name,
        house_no_street_name,
        apartment,
        town_or_city,
        post_code_zip,
    } = address;

    const handleDataChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        
        if ( success ) {
            enqueueSnackbar(success, {variant: 'success'});
            dispatch({ type: UPDATE_SHIPPING_RESET});
            navigate(`/dashboard/addresses`)
        }
        if ( error ) {
            enqueueSnackbar("Please enter valid details", {variant: 'error'});
            dispatch(clearErrors());
        }
    }, [dispatch, success, error, enqueueSnackbar, navigate]);

    useEffect(() => {
        dispatch(shippingAddressAction(accessToken));
    },[dispatch, accessToken]);

    useEffect(()=>{
        if (shipping) {
            setAddress({
                first_name: shipping.first_name || '',
                last_name: shipping.last_name || '',
                company_name: shipping.company_name || '',
                house_no_street_name: shipping.house_no_street_name || '',
                apartment: shipping.apartment || '',
                town_or_city: shipping.town_or_city || '',
                post_code_zip: shipping.post_code_zip || '',
            });
        }
    },[shipping])
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("first_name", first_name);
        formData.set("last_name", last_name);
        formData.set("company_name", company_name)
        formData.set("house_no_street_name", house_no_street_name);
        formData.set("apartment", apartment);
        formData.set("town_or_city", town_or_city);
        formData.set("post_code_zip", post_code_zip);

        dispatch(updateShippingAddress(formData, accessToken))
        
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
                    <TextField
                            fullWidth
                            name="company_name"
                            type="text"
                            label="Company name (optional)"
                            value={company_name}
                            onChange={handleDataChange}
                        />
                    <div label='country' className="mt-4">
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

                        <button type="submit" className="text-white py-3 sm:w-1/3 w-1/2 bg-primary-darkBlue shadow hover:shadow-lg rounded-3xl font-medium mt-4">Save changes</button>
                    </div>

                </form>
            </div>
        </>
    );
}
export default ShippingAddress;