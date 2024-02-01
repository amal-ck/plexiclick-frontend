import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import { useSelector } from 'react-redux';
import Searchbar from './Searchbar';
import { useEffect, useRef } from 'react';

const NavbarToggler = ({ setNavbarToggler, navbarToggler }) => {

    const navRef = useRef(null)
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const refresh = localStorage.getItem('refresh')


    const handleLogout = async() => {
        await dispatch(logoutUser(refresh));
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        setNavbarToggler(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (navRef.current && !navRef.current.contains(event.target)) {
            setNavbarToggler(false);
          }
          
        };
      
        document.addEventListener('click', handleClickOutside);
      
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      },);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50"
            style={{ display: navbarToggler ? 'block' : 'none' }}
        >
        <div ref={navRef} className="absolute w-3/4 h-screen left-0 top-0 bg-white shadow-2xl flex-col text-lg p-4 z-10 lg:hidden">

            {/* {user.role === "admin" &&
                <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/admin/dashboard">
                    <span className="text-primary-blue"><DashboardIcon sx={{ fontSize: "18px" }} /></span>
                    Admin Dashboard
                </Link>
            } */}
            <Searchbar setNavbarToggler={setNavbarToggler} />
            <Link to="/" className="flex relative border-b hover:text-primary-darkBlue left-2 py-3"
                onClick={() => setNavbarToggler(false)}>
                Home
            </Link>
            <Link to="/products" className="flex gap-2 border-b relative hover:text-primary-darkBlue left-2 py-3"
                onClick={() => setNavbarToggler(false)}>
                Shop
            </Link>
            <Link to="/contactus" className="flex gap-2 border-b relative hover:text-primary-darkBlue left-2 py-3"
                onClick={() => setNavbarToggler(false)}>
                Contact us
            </Link>
            <Link to="/aboutus" className="flex border-b gap-2 relative hover:text-primary-darkBlue left-2 py-3"
                onClick={() => setNavbarToggler(false)}>
                About Us
            </Link>
            <Link to="/trackorder" className="flex border-b gap-2 relative hover:text-primary-darkBlue left-2 py-3"
                onClick={() => setNavbarToggler(false)}>
                Track Order
            </Link>
            {isAuthenticated === false ?
                <Link to="/login" className="pl-3 py-3.5 border-b border-t flex gap-3 items-center hover:bg-gray-50 rounded-t left-2 py-3"
                    onClick={() => setNavbarToggler(false)}>
                    Login</Link>
                :
                (
                    <>
                        <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t border-t" to="/dashboard"
                            onClick={() => setNavbarToggler(false)}>
                            Dashboard
                        </Link>

                        <div className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer" onClick={handleLogout} >
                            Logout
                        </div>
                    </>
                )
            }
        </div>
        </div>
    );
};

export default NavbarToggler;
