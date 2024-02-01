import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    ALL_USERS_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_REQUEST,
    GOVERNORATES_REQUEST,
    GOVERNORATES_SUCCESS,
    GOVERNORATES_FAIL,
    BILLING_ADDRESS_REQUEST,
    BILLING_ADDRESS_SUCCESS,
    BILLING_ADDRESS_FAIL,
    UPDATE_BILLING_REQUEST,
    UPDATE_BILLING_SUCCESS,
    UPDATE_BILLING_FAIL,
    SHIPPING_ADDRESS_REQUEST,
    SHIPPING_ADDRESS_SUCCESS,
    SHIPPING_ADDRESS_FAIL,
    UPDATE_SHIPPING_REQUEST,
    UPDATE_SHIPPING_SUCCESS,
    UPDATE_SHIPPING_FAIL,
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL,
    ADMIN_CONTACT_SUCCESS,
    ADMIN_CONTACT_REQUEST,
    ADMIN_CONTACT_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_DETAILS_FAIL,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_REQUEST
} from '../constants/userConstants';
import axios from 'axios';

// Login User
export const loginUser = (username_or_email, password, rememberMe) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/account/user/login/',
            { username_or_email, password, 'remember_me':rememberMe },
            config
        );

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const refreshTokenAction = () => async (dispatch) => {
    try {
      dispatch({ type: REFRESH_TOKEN_REQUEST });

      const refresh = localStorage.getItem('refresh');
      if (!refresh) {
        // Handle the case when the refresh token is null or undefined
        throw new Error('Refresh token is missing');
      }
  
      const { data } = await axios.post(
        '/api/token/refresh/',
        { refresh }
      );
      dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        payload: data
      });
  
    } catch (error) {
      dispatch({
        type: REFRESH_TOKEN_FAIL,
        payload: null,
      });
    }
  };

// Register User
export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.post(
            '/api/account/user/registration/',
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = (accessToken) => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST });

        const config = {
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/api/account/user/details/', config);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.data,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout User
export const logoutUser = (refresh) => async (dispatch) => {
    try {
        await axios.post('/api/account/user/logout/', { refresh });
        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User
export const updateProfile = (userData, accessToken) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.put(
            '/api/account/user/details/',
            userData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data,
        });
    }
};

// Update User Password
export const updatePassword = (passwords, accessToken) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.patch(
            '/api/account/user/details/password/',
            passwords,
            config
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data,
        });
    }
};


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/password/forgot',
            email,
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Users ---ADMIN
export const getAllUsers = (accessToken) => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
        const { data } = await axios.get('/administrator/users/', config);
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.data,
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get User Details ---ADMIN
export const getUserDetails = (id, accessToken) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
        const { data } = await axios.get(`/administrator/user/${id}/`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.data,
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Details ---ADMIN
export const updateUser = (id, userData, accessToken) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.patch(
            `/administrator/user/${id}/`,
            userData,
            config
        );

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User ---ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getGovernorates = () => async (dispatch) => {
    try{
        dispatch({ type: GOVERNORATES_REQUEST });
        const { data } = await axios.get('/api/governorates/')

        dispatch({
            type: GOVERNORATES_SUCCESS,
            payload: data.data,
        });

    } catch (error) {
        dispatch({
            type: GOVERNORATES_FAIL,
            payload: null
        })
    }
}

export const billingAddressAction = (accessToken) => async (dispatch) => {
    try{
        dispatch({ type: BILLING_ADDRESS_REQUEST });
        const config = {
            headers: {
                "Authorization" : `Bearer ${accessToken}`
            }
        }
        const { data } = await axios.get('/api/account/user/details/billing-address/', config)
        dispatch({
            type: BILLING_ADDRESS_SUCCESS,
            payload: data.data,
        });

    }catch (error){
        dispatch({
            type: BILLING_ADDRESS_FAIL,
            payload: null,
        })}
};

export const updateBillingAddress = (formData, accessToken) => async (dispatch) => {
    try{
        dispatch({ type: UPDATE_BILLING_REQUEST});
        const config = {
            headers : {
                "content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        };

        const { data } = await axios.put('/api/account/user/details/billing-address/', formData, config)

        dispatch({
            type: UPDATE_BILLING_SUCCESS,
            payload: data.message
        })
    } catch ( error ){
        dispatch({
            type: UPDATE_BILLING_FAIL,
            payload: error.response.data
        })
    }
} 

export const shippingAddressAction = (accessToken) => async (dispatch) => {
    try{
        dispatch({ type: SHIPPING_ADDRESS_REQUEST });
        const config = {
            headers: {
                "Authorization" : `Bearer ${accessToken}`
            }
        }
        const { data } = await axios.get('/api/account/user/details/shipping-address/', config)
        dispatch({
            type: SHIPPING_ADDRESS_SUCCESS,
            payload: data.data,
        });

    }catch (error){
        dispatch({
            type: SHIPPING_ADDRESS_FAIL,
            payload: null,
        })}
};

export const updateShippingAddress = (formData, accessToken) => async (dispatch) => {
    try{
        dispatch({ type: UPDATE_SHIPPING_REQUEST});
        const config = {
            headers : {
                "content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        };

        const { data } = await axios.post('/api/account/user/details/shipping-address/', formData, config)

        dispatch({
            type: UPDATE_SHIPPING_SUCCESS,
            payload: data.message
        })
    } catch ( error ){
        dispatch({
            type: UPDATE_SHIPPING_FAIL,
            payload: error.response.data
        })
    }
}

export const contactUsAction = (formData) => async(dispatch) => {
    try{
        dispatch({ type: CONTACT_US_REQUEST });
        const config = {
            headers : {
                "content-type": "application/json",
            }
        };

        const { data } = await axios.post('/api/contactus/', formData, config)

        dispatch({
            type: CONTACT_US_SUCCESS,
            payload: data.message
        })
    }catch (error){
        dispatch({
            type: CONTACT_US_FAIL,
            payload: error.response.data.email
        })
    }
}

export const AdminContactAction = (accessToken) => async (dispatch) => {
    try{
        dispatch({ type: ADMIN_CONTACT_REQUEST });
        const config = {
            headers: {
                "Authorization" : `Bearer ${accessToken}`
            }
        }
        const { data } = await axios.get('/administrator/contactus/', config)
        dispatch({
            type: ADMIN_CONTACT_SUCCESS,
            payload: data.data,
        });

    }catch (error){
        dispatch({
            type: ADMIN_CONTACT_FAIL,
            payload: null,
        })}
};

// Get contactus details for Admin
export const getAdminContactusDetails = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.get(`/administrator/contact/${id}`, config);

        dispatch({
            type: CONTACT_DETAILS_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: CONTACT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete contact ---ADMIN
export const deleteContact = (id, accessToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_CONTACT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.delete(`/administrator/contact/${id}/`, config);

        dispatch({
            type: DELETE_CONTACT_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: DELETE_CONTACT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};