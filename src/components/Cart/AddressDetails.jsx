import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { billingAddressAction, getGovernorates, updateBillingAddress, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { UPDATE_BILLING_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

const AddressDetails = ({ address, handleDataChange, notes, handleNotesChange, handlePlaceOrder }) => {

    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('access')
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { governorate = [] } = useSelector((state) => state.governorate)

    useEffect(() => {
        dispatch(getGovernorates());
        dispatch(billingAddressAction(accessToken));
    },[dispatch, accessToken])


    return (
        <>
            <div className="flex flex-col gap-5 font-sans">
                <form onSubmit={handlePlaceOrder}>
                    <div className="flex flex-col md:flex-row gap-5 mb-4">
                        <TextField
                            fullWidth
                            name='first_name'
                            label="First name"
                            type="text"
                            required
                            value={address.first_name}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="last_name"
                            label="Last Name"
                            type="text"
                            required
                            value={address.last_name}
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
                            value={address.house_no_street_name}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="apartment"
                            type="text"
                            label="Apartment, suite, unit, etc. (optional)"
                            value={address.apartment}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="town_or_city"
                            label="Town / City"
                            type="text"
                            required
                            value={address.town_or_city}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="post_code_zip"
                            label="Postcode / ZIP"
                            type="text"
                            required
                            value={address.post_code_zip}
                            onChange={handleDataChange}
                        />
                        <TextField
                            fullWidth
                            name="phone_no"
                            label="Phone"
                            type="text"
                            required
                            value={address.phone_no}
                            onChange={handleDataChange}
                        />

                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            label="Email address"
                            value={address.email}
                            onChange={handleDataChange}
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Governorates</InputLabel>
                            <Select
                                labelId="governorates"
                                name="governorates"
                                label="Governorates" 
                                value={address.governorates}
                                onChange={handleDataChange}
                                required
                            >
                                {governorate.map((gov) =>(
                                    <MenuItem key={gov.id} value={gov.id}>{gov.governorates_name} ( + {gov.governorates_amount} د.ك)</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                </form>
                <div>
                    <h1 className="text-3xl font-semibold mb-5">Additional information</h1>
                    <TextField
                   id="notes"
                   name="notes"
                   label="Order notes (optional)"
                   placeholder="Notes about your order, e.g. special notes for delivery."
                   fullWidth
                   multiline
                   rows={5}
                   value={notes}
                   onChange={handleNotesChange}
                   />
                </div>
            </div>
        </>
    );
}
export default AddressDetails;