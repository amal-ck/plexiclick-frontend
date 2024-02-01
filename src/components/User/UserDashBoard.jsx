import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userAction'
import SpeedIcon from '@mui/icons-material/Speed';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MetaData from "../Layouts/MetaData";

const DashBoard = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const refresh = localStorage.getItem('refresh')

    const { user={} } = useSelector((state) => state.user)

    const handleLogout = async () => {
        await dispatch(logoutUser(refresh));
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
    }

    return (
        <>
            <MetaData title="DashBoard | Plexi Click" />
            <div className="flex flex-col md:flex-row md:w-9/12 m-auto">
                <div className="flex flex-col md:w-1/4 ml-5 md:ml-0 border-r gap-7 mt-14 mb-32 font-thin font-sans">
                    <Link
                        className={`hover:text-primary-darkBlue ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}
                        to='/dashboard'
                    >
                        <SpeedIcon /> Dashboard
                    </Link>
                    {user.role ==='admin' &&
                        <Link
                            className={`hover:text-primary-darkBlue`}
                            to='/admin/dashboard/'
                        >
                            <AdminPanelSettingsOutlinedIcon /> Admin Dashboard
                        </Link>
                    }

                    <Link
                        className={`hover:text-primary-darkBlue ${location.pathname === '/dashboard/orders' ? 'font-bold' : ''}`}
                        to='/dashboard/orders'
                    >
                        <FormatListBulletedOutlinedIcon /> Orders
                    </Link>
                    <Link
                        className={`hover:text-primary-darkBlue ${location.pathname === '/dashboard/downloads' ? 'font-bold' : ''}`}
                        to='/dashboard/downloads'
                    >
                        <FileDownloadOutlinedIcon /> Downloads
                    </Link>
                    <Link
                        className={`hover:text-primary-darkBlue ${location.pathname === '/dashboard/addresses' || location.pathname === '/dashboard/addresses/billing' || location.pathname === '/dashboard/addresses/shipping' ? 'font-bold' : ''}`}
                        to='/dashboard/addresses'
                    >
                        <HomeOutlinedIcon /> Addresses
                    </Link>
                    <Link
                        className={`hover:text-primary-darkBlue ${location.pathname === '/dashboard/account-details' ? 'font-bold' : ''}`}
                        to='/dashboard/account-details'
                    >
                        <Person2OutlinedIcon /> Account details
                    </Link>
                    <Link
                        className={`hover:text-primary-darkBlue ${location.pathname === '/wishlist' ? 'font-bold' : ''}`}
                        to='/wishlist'
                    >
                        <FavoriteBorderOutlinedIcon /> Wishlist
                    </Link>
                    <div
                        className={'hover:text-primary-darkBlue cursor-pointer'}
                        onClick={handleLogout}
                    >
                        <LogoutOutlinedIcon /> Logout
                    </div>
                </div>
                <div className="sm:ml-10 ml-4 mt-14 sm:w-3/4 w-11/12">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashBoard;
