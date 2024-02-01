import { loadUser, logoutUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dash = () => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refresh = localStorage.getItem('refresh')
    const { user = {} } = useSelector((state) => state.user)
    const accessToken = localStorage.getItem('access')

    const handleLogout = async() => {
        await dispatch(logoutUser(refresh));
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
    };

    useEffect(()=>{
        dispatch(loadUser(accessToken))
    },[dispatch, accessToken])
    
    return (
        <div>
            <h2>Hello <b translate="no">{user.username}</b> (not <b translate="no">{user.username}?</b>
                <span
                    className={'hover:text-primary-darkBlue cursor-pointer'}
                    onClick={handleLogout}
                > Logout
                </span>)
            </h2>
            <br />
            <p>From your account dashboard, you can view your recent orders,
                manage your shipping and billing addresses, and edit your password and account details.</p>
        </div>
    )

}
export default Dash;
