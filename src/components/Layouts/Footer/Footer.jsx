import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';

const footerLinks = [
  {
    title: "Shop",
    links: [
      {
        name: "My account",
        redirect: "/dashboard",
      },
      {
        name: "Orders",
        redirect: "/dashboard/orders",
      },
      {
        name: "Downloads",
        redirect: "/dashboard/downloads",
      },
      {
        name: "Log out",
        authenticatedOnly: true,
      },
    ]
  },
  {
    title: "Support",
    links: [
      {
        name: "Shop",
        redirect: "/products",
      },
      {
        name: "Track Order",
        redirect: "/trackorder",
      },
      {
        name: "Wishlist",
        redirect: "/wishlist",
      },
      {
        name: "About Us",
        redirect: "/aboutus",
      }
    ]
  }
]

const Footer = () => {

  const { isAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);
  const refresh = localStorage.getItem('refresh')

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  const handleLogout = async() => {
    await dispatch(logoutUser(refresh));
    navigate("/login");
    enqueueSnackbar("Logout Successfully", { variant: "success" });
  }

  return (
    <>
      {!adminRoute && (
        <>
          <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-grey  text-xs border-b border-gray-300 flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
              <div className="w-full sm:w-1/2">
                <h2 className="font-black">Plexi Click</h2>
                <p className="mt-2 leading-5">We offer different range of acrylic products<br />
                  designed in trending models in affordable price.<br />
                  Customer satisfaction is the key in "Plexi Click".<br />
                </p>
              </div>
            </div>
            <div className="w-full sm:w-7/12 flex flex-col sm:flex-row">

              {footerLinks.map((el, i) => (
                <div className="w-full flex flex-col gap-3 sm:my-6 ml-5" key={i}>
                  <h2 className="mb-2 mt-4 font-medium uppercase">{el.title}</h2>
                  {el.links.map((item, j) => (
                    // Conditionally render the "Log out" link based on the 'authenticatedOnly' property
                    (item.authenticatedOnly && !isAuthenticated) ? null : (
                      (item.name === "Log out" && isAuthenticated) ? (
                        <div key={j} className="hover:underline cursor-pointer" onClick={handleLogout}>
                          Log out
                        </div>
                      ) : (
                        <a href={item.redirect} rel="noreferrer" className="hover:underline" key={j}>
                          {item.name}
                        </a>
                      )
                    )
                  ))}
                </div>
              ))}


            </div>
          </footer>
          {/* <!-- footer ends --> */}
          <div className="py-4 bg-primary-grey flex justify-center items-center text-xs font-medium">
            <span>Copyright &copy; {new Date().getFullYear()} Plexi Click | Powered by Arion Infotech</span>
          </div>
        </>
      )}
    </>
  )
};

export default Footer;
