import axios from "axios";
import { 
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_SUCCESS,
    ADD_TO_WISHLIST_FAIL,
    CLEAR_ERRORS,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    DELETE_WISHLIST_FAIL,
    DELETE_WISHLIST_REQUEST,
    DELETE_WISHLIST_SUCCESS
} from "../constants/wishlistConstants";

// Add To Wishlist
export const addToWishlist = (id,accessToken) => async (dispatch) => {
    try{
        dispatch({ type: ADD_TO_WISHLIST_REQUEST });

        const config = {
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.post("/api/user/wishlist/", id, config);

        dispatch({
            type: ADD_TO_WISHLIST_SUCCESS,
            payload: data.message,
        });
    }catch (error) {
        dispatch({
            type: ADD_TO_WISHLIST_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getWishlist = (accessToken) => async (dispatch) => {
    try{
        dispatch({ type: GET_WISHLIST_REQUEST});

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get("/api/user/wishlist/", config);
        dispatch({
            type: GET_WISHLIST_SUCCESS,
            payload: data.data
        });
    }catch (error) {
        dispatch({
            type: GET_WISHLIST_FAIL,
            payload: null,
        });
    }
};

export const deleteWishlist = (itemId,accessToken) => async (dispatch) => {
    try{
        dispatch({ type: DELETE_WISHLIST_REQUEST });
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }
        const { data } = await axios.post("/api/user/wishlist/delete/", { 'item_ids':itemId } , config);
        
        dispatch({
            type: DELETE_WISHLIST_SUCCESS,
            payload: data.message
        });
    }catch (error) {
        dispatch({
            type: DELETE_WISHLIST_FAIL,
            payload: null
        })
    }
}

export const clearWishlistErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};