import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const UserDropDownMenu = ({ setToggleUserDropDown, user }) => {

    const DropdownRef = useRef(null);
    const { isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const refresh = localStorage.getItem('refresh');


    const handleLogout = async() => {
        await dispatch(logoutUser(refresh));
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        setToggleUserDropDown(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (DropdownRef.current && !DropdownRef.current.contains(event.target)) {
            setToggleUserDropDown(false);
          }
          
        };
      
        document.addEventListener('click', handleClickOutside);
      
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, );

    return (
        <div ref={DropdownRef} className="absolute w-40 -right-0 ml-2 top-9 bg-white shadow-2xl rounded flex-col text-sm z-10">

            {/* {user.role === "admin" &&
                <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/admin/dashboard">
                    <span className="text-primary-blue"><DashboardIcon sx={{ fontSize: "18px" }} /></span>
                    Admin Dashboard
                </Link>
            } */}

            {!isAuthenticated ?
                <Link to="/login" className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
                onClick={()=>setToggleUserDropDown(false)}>
                    Login</Link>

                    
                :
                (
                    <>
                        <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/dashboard"
                        onClick={()=>setToggleUserDropDown(false)}>
                            Dashboard
                        </Link>

                        <div className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer" onClick={handleLogout} >
                            Logout
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default UserDropDownMenu;
