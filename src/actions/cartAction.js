import axios from "axios"
import { 
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    DELETE_CART_FAIL,
    DELETE_CART_REQUEST,
    DELETE_CART_SUCCESS,
    CLEAR_ERRORS,
    ADD_TO_UNAUTHORIZED_CART,
    REMOVE_FROM_UNAUTHORIZED_CART,
    ADD_TO_UNAUTHORIZED_CART_REQUEST,
    EMPTY_CART
 } from "../constants/cartConstants";

// add to cart
export const addItemsToCart = (items, accessToken) => async (dispatch) => {
    try{
        dispatch({ type: ADD_TO_CART_REQUEST });

        const config = {
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.post("/api/user/cart/", { items }, config);

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data.message,
        });
    }catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const addItemsToUnauthorizedCart = (items) => async (dispatch, getState) => {

    dispatch({ type: ADD_TO_UNAUTHORIZED_CART_REQUEST})

    const variant_id = await items.map((item) => item.variant)
    const quantity = await items.map((item) => item.quantity)
    const { data } = await axios.get(`/api/variant/${variant_id}`);

    dispatch({
        type: ADD_TO_UNAUTHORIZED_CART,
        payload: {
            id: data.data.id,
            product_name: data.data.product,
            color: data.data.color,
            size: data.data.size,
            thickness: data.data.thickness,
            subcategory: data.data.subcategory,
            variant_image: data.data.variant_image,
            sale_price: data.data.sale_price,
            stock: data.data.stock,
            quantity,
        },
    });

    localStorage.setItem('unauthorizedCartItems', JSON.stringify(getState().unauthorizedCart.unauthorizedCartItems))   
};

export const removeItemsFromUnauthorizedCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_UNAUTHORIZED_CART,
        payload: id,
    });
    
    localStorage.setItem('unauthorizedCartItems', JSON.stringify(getState().unauthorizedCart.unauthorizedCartItems))
}

export const emptyUnauthorizedCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('unauthorizedCartItems', JSON.stringify(getState().unauthorizedCart.unauthorizedCartItems))
}

export const getCart = (accessToken) => async (dispatch) => {
    try{
        dispatch({ type: GET_CART_REQUEST});

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get("/api/user/cart/", config);
        dispatch({
            type: GET_CART_SUCCESS,
            payload: data.data
        });
    }catch (error) {
        dispatch({
            type: GET_CART_FAIL,
            payload: null,
        });
    }
};

export const deleteCart = (cart_id, accessToken) => async (dispatch) => {
    try{
        dispatch({ type: DELETE_CART_REQUEST });
        
        const config = {
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        }
        const { data } = await axios.delete(`/api/user/cart/delete/${cart_id}`, config);
        dispatch({
            type: DELETE_CART_SUCCESS,
            payload: data.message
        });
    }catch (error) {
        dispatch({
            type: DELETE_CART_FAIL,
            payload: null
        })
    }
}

export const clearCartErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};