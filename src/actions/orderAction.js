import axios from "axios";
import {
     ALL_ORDERS_FAIL, 
     ALL_ORDERS_REQUEST, 
     ALL_ORDERS_SUCCESS, 
     CLEAR_ERRORS, 
     DELETE_ORDER_FAIL, 
     DELETE_ORDER_REQUEST, 
     DELETE_ORDER_SUCCESS, 
     MY_ORDERS_FAIL, 
     MY_ORDERS_REQUEST, 
     MY_ORDERS_SUCCESS, 
     NEW_ORDER_FAIL, 
     NEW_ORDER_REQUEST, 
     NEW_ORDER_SUCCESS, 
     ORDER_DETAILS_FAIL, 
     ORDER_DETAILS_REQUEST, 
     ORDER_DETAILS_SUCCESS, 
     PAYMENT_STATUS_FAIL, 
     PAYMENT_STATUS_REQUEST, 
     PAYMENT_STATUS_SUCCESS, 
     UPDATE_ORDER_FAIL,
     UPDATE_ORDER_REQUEST, 
     UPDATE_ORDER_SUCCESS,
     TRACK_ORDER_REQUEST,
     TRACK_ORDER_SUCCESS,
     TRACK_ORDER_FAIL,
    } from "../constants/orderConstants";

// New Order
export const newOrder = (orderData,accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.post('/api/user/place-order/', orderData , config);
        
        dispatch({
            type: NEW_ORDER_SUCCESS,
            payload: data.order_id,
        })

    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get User Orders
export const myOrders = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/api/user/orders/', config);

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Order Details
export const getOrderDetails = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.get(`/api/user/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Order Details for Admin
export const getAdminOrderDetails = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.get(`/administrator/order/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const trackOrderAction = (order_id, billing_email) => async (dispatch) => {
    try{
        dispatch({ type: TRACK_ORDER_REQUEST }); 
        
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post('/api/user/orders/track-order/', {order_id, billing_email}, config);
        dispatch({
            type: TRACK_ORDER_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: TRACK_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get Payment Status
export const getPaymentStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_STATUS_REQUEST });

        const { data } = await axios.get(`/api/v1/payment/status/${id}`);

        dispatch({
            type: PAYMENT_STATUS_SUCCESS,
            payload: data.txn,
        })

    } catch (error) {
        dispatch({
            type: PAYMENT_STATUS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Orders ---ADMIN
export const getAllOrders = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
        const { data } = await axios.get('/administrator/orders/', config);

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Order ---ADMIN
export const updateOrder = (id, order_status, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.patch(`/administrator/order/${id}`, order_status, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order ---ADMIN
export const deleteOrder = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });
        
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };


        const { data } = await axios.delete(`/administrator/order/${id}`, config);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearOrderErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}