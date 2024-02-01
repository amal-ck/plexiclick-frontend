import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MetaData from "../../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, contactUsAction } from "../../../actions/userAction";
import BackdropLoader from "../../Layouts/BackdropLoader";
import { useSnackbar } from "notistack";
import { CONTACT_US_RESET } from "../../../constants/userConstants";

const ContactUs = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d445280.26751503645!2d47.419267001490184!3d29.318946899999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b40f4253887%3A0xb8ae6138dd00862e!2sPlexiclick!5e0!3m2!1sen!2sus!4v1697270216659!5m2!1sen!2sus`;
  const theme = createTheme({
    palette: {
      primary: {
        main: '#254d8f',
      },
    },
  });

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ message, setMessage ] = useState('');

  const { loading, error, success } = useSelector((state) => state.contactUs)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);
    await dispatch(contactUsAction(formData))
    setName('');
    setEmail('');
    setMessage('');
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors);
    }
    if(success) {
      enqueueSnackbar(success, {variant:"success"})
      dispatch({ type: CONTACT_US_RESET})
    }
  },[error, success, dispatch])

  return (
    <>
    { loading && <BackdropLoader />}
    <MetaData title="Contact US | Plexi Click" />
    <iframe
      className="w-full"
      title="Google Map"
      src={mapUrl}
      height="450"
      style={{ border: "0" }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
    <div className="flex flex-col md:flex-row  md:w-10/12 py-10 m-auto justify-between sm:items-top font-serif mt-10">
        <div className="md:w-2/6  ml-5 text-md flex flex-col gap-3">
            <h1 className="text-3xl ">Contact Info.</h1>
            <p>Some information that you may want to know</p>
            <p  className="font-semibold">Phone Number</p>
            <p>+965 55157647</p>
            <p>+965 90012961</p>
            <p  className="font-semibold">Address</p>
            <p>Shop No.13-Bldg.120-Block B-Road 30</p>
            <p>Near HEMPEL PAINT</p>
            <p>Shuwaikh industrial area-Kuwait</p>
            <p  className="font-semibold">Email</p>
            <p className="mb-4">plexiclick2020@gmail.com</p>
        </div>
        <div className="md:w-4/6 w-full p-3 md:p-0">
            <h1 className="text-3xl font-medium mb-3">Leave Your Message</h1>
            <p className="mb-3 font-medium text-md">Feel free to contact with us by using the form below</p>
            <form onSubmit={handleSubmit}>
            <div className="flex sm:flex-row flex-col gap-4 sm:gap-5 mb-4">
              <ThemeProvider theme={theme}>
                 <TextField 
                 id="name"
                 type="text"
                 name="name"
                 fullWidth
                 label="Name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required />

                 <TextField 
                 id="email"
                 name="email"
                 type="email"
                 fullWidth
                 label="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required />
              </ThemeProvider>
            </div>
               <ThemeProvider theme={theme}>
                <TextField
                   id="message"
                   name="message"
                   label="Message"
                   fullWidth
                   multiline
                   rows={9}
                   defaultValue={""}
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   required
                   />
               </ThemeProvider>
               <button type="submit" className="mt-4 bg-primary-darkBlue w-28 p-2 rounded-3xl text-white text-center hover:bg-black">
                SEND US
               </button>
             </form>            
        </div>

    </div>
    </>
  );
};

export default ContactUs;
