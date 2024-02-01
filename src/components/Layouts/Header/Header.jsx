import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import OptionIcon from '@mui/icons-material/ListRounded';
import SearchIcon from '@mui/icons-material/Search';
import plexiLogo from '../../../assets/images/logo/logo.png';
import UserDropDownMenu from './UserDropDownMenu';
import NavbarToggler from './NavToggler';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SearchDiv from './SearchDiv';
import SideBarCart from '../../Cart/SideBarCart';
import { useDispatch } from 'react-redux';
import { getWishlist } from '../../../actions/wishlistAction';
import { getCart } from '../../../actions/cartAction';

const Header = () => {

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('access')
  const { pathname } = useLocation();

  const { cart = [] } = useSelector((state) => state.cart);
  const { unauthorizedCartItems = [] } = useSelector((state) => state.unauthorizedCart)
  const { isAuthenticated } = useSelector((state) => state.user)
  const { wishlistItems = [] } = useSelector((state) => state.wishlistItems);

  const [toggleUserDropDown, setToggleUserDropDown] = useState(false);
  const [navbarToggler, setNavbarToggler] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [sideBarcart, setSideBarCart] = useState(false);
  const [isInAdminDashboard, setIsInAdminDashboard] = useState(false);

  const calculateTotalQuantity = (cart) => {
    return cart.reduce((total, item) => total + parseInt(item.quantity), 0);
  };

  useEffect(() => {
    dispatch(getWishlist(accessToken))
    dispatch(getCart(accessToken));
  }, [dispatch, accessToken])

  // const [translationScriptLoaded, setTranslationScriptLoaded] = useState(false);

  // useEffect(() => {
  //   if (!translationScriptLoaded) {
  //     const addScript = document.createElement('script');
  //     addScript.setAttribute(
  //       'src',
  //       'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  //     );
  //     document.body.appendChild(addScript);
  //     window.googleTranslateElementInit = googleTranslateElementInit;
  //     setTranslationScriptLoaded(true);
  //   }
  // }, [translationScriptLoaded]);

  // useEffect(() => {
  //     new window.google.translate.TranslateElement(
  //       {
  //         pageLanguage: 'en',
  //         includedLanguages: 'en,ar',
  //       },
  //       'google_translate_element'
  //     );

  //   let googleDiv = document.getElementById('google_translate_element');
  //   if (googleDiv) {
  //     let skipTranslateDiv = googleDiv.querySelector('.skiptranslate');
  //     if (skipTranslateDiv) {
  //       let googleDivChild = skipTranslateDiv.querySelector('div');
  //       if (googleDivChild) {
  //         googleDivChild.nextElementSibling.remove();

  //         Array.from(skipTranslateDiv.childNodes).forEach((node) => {
  //           if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
  //             skipTranslateDiv.removeChild(node);
  //           }
  //         });
  //       }
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const delay = 1000; // Set the desired delay in milliseconds (2 seconds in this example)

    const timeoutId = setTimeout(() => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ar',
        },
        'google_translate_element'
      );

      let googleDiv = document.getElementById('google_translate_element');
      if (googleDiv) {
        let skipTranslateDiv = googleDiv.querySelector('.skiptranslate');
        if (skipTranslateDiv) {
          let googleDivChild = skipTranslateDiv.querySelector('div');
          if (googleDivChild) {
            googleDivChild.nextElementSibling.remove();

            Array.from(skipTranslateDiv.childNodes).forEach((node) => {
              if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
                skipTranslateDiv.removeChild(node);
              }
            });
          }
        }
      }
    }, delay);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Check if the current route is within the admin dashboard
    const isAdminDashboard = window.location.pathname.startsWith('/admin');
    setIsInAdminDashboard(isAdminDashboard);
  }, [pathname]);

  return (

    <header className={`${isInAdminDashboard && 'fixed mb-10'} bg-white py-2.5 w-full z-10 border-b border-gray-200`}>

      {/* <!-- navbar container --> */}
      <div className="w-full xl:w-10/12 px-1 sm:px-4 m-auto flex  items-center relative justify-between">

        {/* navbar for mobile devices */}

        <span
          className="flex items-center text-black font-medium gap-1 cursor-pointer hover:text-primary-darkBlue lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setNavbarToggler(!navbarToggler)
          }}
        >
          <OptionIcon style={{ fontSize: 30 }} />
        </span>
        {navbarToggler && <NavbarToggler setNavbarToggler={setNavbarToggler} navbarToggler={navbarToggler} />}

        {/* <!-- logo & search container --> */}
        <div className="flex items-center m-auto lg:m-0">
          <Link className="h-7 mr-1 mb-4 sm:mr-4" to="/">
            <img draggable="false" className="h-11 w-full object-contain" src={plexiLogo} alt="PlexiClick Logo" />
          </Link>
        </div>

        {/* <!-- right navs --> */}
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

          <Link to="/" className="flex items-center text-black font-medium gap-2  hover:text-primary-darkBlue hidden lg:block">
            Home
          </Link>
          <Link to="/products" className="flex items-center text-black font-medium gap-2 hover:text-primary-darkBlue hidden lg:block">
            Shop
          </Link>
          {!isInAdminDashboard &&
          <Link to="/contactus" className="flex items-center text-black font-medium gap-2  hover:text-primary-darkBlue hidden lg:block">
            Contact Us
          </Link>
          }
          {!isInAdminDashboard &&
          <Link to="/aboutus" className="flex items-center text-black font-medium gap-2  hover:text-primary-darkBlue hidden lg:block">
            About Us
          </Link>
          }
          {!isInAdminDashboard &&
          <Link to="/trackorder" className="flex items-center text-black font-medium gap-2  hover:text-primary-darkBlue hidden lg:block">
            Track Order
          </Link>
          }
          <div id="google_translate_element" className='mr-4 sm:mr-0'> </div>
          {!isInAdminDashboard &&
          <span
            className="flex item-center hover:text-primary-darkBlue hidden lg:block cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSearchModal(true)
            }}
          >
            <SearchIcon />
          </span>
          }
          {searchModal && <SearchDiv setSearchModal={setSearchModal} searchDiv={searchModal} />}
          {!isInAdminDashboard && isAuthenticated && (
  <Link to="/wishlist" className="flex items-center text-black font-medium gap-2 relative hover:text-primary-darkBlue right-4 lg:right-0">
    <span><FavoriteBorderOutlinedIcon /></span>
    {wishlistItems.length > 0 &&
      <div translate="no" className="w-5 h-5 p-2 bg-primary-darkBlue text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center text-white">
        {wishlistItems.length}
      </div>
    }
  </Link>
)}

          <span
            className="userDropDown flex items-center text-black font-medium gap-1 cursor-pointer hover:text-primary-darkBlue hidden lg:block"
            onClick={(e) => {
              e.stopPropagation();
              setToggleUserDropDown(!toggleUserDropDown)
            }} >
            {<Person2OutlinedIcon />}
          </span>
          {toggleUserDropDown && <UserDropDownMenu setToggleUserDropDown={setToggleUserDropDown} />}
          {
  !isInAdminDashboard && (
    <span
      className="flex items-center text-black font-medium gap-2 relative hover:text-primary-darkBlue right-3 lg:right-0 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setSideBarCart(true);
      }}
    >
      <ShoppingCartOutlinedIcon />
      {isAuthenticated ? (
        cart.length > 0 && (
          <div className="w-5 h-5 p-2 bg-primary-darkBlue text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center text-white">
            {calculateTotalQuantity(cart)}
          </div>
        )
      ) : (
        unauthorizedCartItems.length > 0 && (
          <div className="w-5 h-5 p-2 bg-primary-darkBlue text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center text-white">
            {calculateTotalQuantity(unauthorizedCartItems)}
          </div>
        )
      )}
    </span>
  )
}


          {sideBarcart && <SideBarCart setSideBarCart={setSideBarCart} SideBarcart={sideBarcart} />}

        </div>
        {/* <!-- right navs --> */}

      </div>
      {/* <!-- navbar container --> */}
    </header>
  )
};

export default Header;
