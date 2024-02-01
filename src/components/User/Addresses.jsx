import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { billingAddressAction, shippingAddressAction } from "../../actions/userAction";
import BackdropLoader from "../Layouts/BackdropLoader";

const Addresses = () => {

    const accessToken = localStorage.getItem('access');
    const dispatch = useDispatch();
    const { billing = {}, loading } = useSelector((state) => state.billing)
    const { shipping = {} } = useSelector((state) => state.shipping)

    useEffect(() => {
        dispatch(billingAddressAction(accessToken));
        dispatch(shippingAddressAction(accessToken))
    }, [dispatch])
    return (
        <>
            {loading && <BackdropLoader />}
            <div className="font-sans">
                <p>The following addresses will be used on the checkout page by default.</p>
                <div className="flex md:flex-row flex-col justify-between gap-6 mt-5">
                    <div className="flex flex-col border-2 md:w-1/2 w-full">
                        <div className="flex flex-row justify-between border-b p-4">
                            <h2 className="text-lg">Billing address</h2>
                            <Link to="/dashboard/addresses/billing"><CreateIcon /> Add</Link>
                        </div>
                        {Object.keys(billing).length > 0 ? (
                            <div className="p-4 italic gap-2 flex flex-col">
                                {billing.first_name && <p translate="no">{billing.first_name}</p>}
                                {billing.last_name && <p translate="no">{billing.last_name}</p>}
                                {billing.house_no_street_name && <p translate="no">{billing.house_no_street_name}</p>}
                                {billing.apartment && <p translate="no">{billing.apartment}</p>}
                                {billing.town_or_city && <p translate="no">{billing.town_or_city}</p>}
                                {billing.post_code_zip && <p translate="no">{billing.post_code_zip}</p>}
                                {billing.phone_no && <p translate="no">{billing.phone_no}</p>}
                                {billing.email && <p translate="no">{billing.email}</p>}
                                {billing.governorates_name && <p>Governorates: {billing.governorates_name}</p>}

                            </div>
                        ) :
                            <p className="p-4 italic">You have not set up this type of address yet.</p>
                        }
                    </div>
                    <div className="flex flex-col border-2 md:w-1/2 w-full">
                        <div className="flex flex-row justify-between border-b p-4">
                            <h2 className="text-lg">Shipping address</h2>
                            <Link to="/dashboard/addresses/shipping"><CreateIcon /> Add</Link>
                        </div>
                        {Object.keys(shipping).length > 0 ? (
                            <div className="p-4 italic gap-2 flex flex-col">
                                <p translate="no">{shipping.first_name}</p>
                                <p translate="no">{shipping.last_name}</p>
                                <p translate="no">{shipping.company_name}</p>
                                <p translate="no">{shipping.house_no_street_name}</p>
                                <p translate="no">{shipping.apartment}</p>
                                <p translate="no">{shipping.town_or_city}</p>
                                <p translate="no">{shipping.post_code_zip}</p>
                            </div>
                        ) :
                            <p className="p-4 italic">You have not set up this type of address yet.</p>
                        }
                    </div>

                </div>
            </div>
        </>
    )

}
export default Addresses;
