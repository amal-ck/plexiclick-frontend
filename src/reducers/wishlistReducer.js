import {
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAIL,
  REMOVE_FROM_WISHLIST,
  CLEAR_ERRORS,
  WISHLIST_RESET,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_FAIL,
  DELETE_WISHLIST_REQUEST,
  DELETE_WISHLIST_SUCCESS,
  DELETE_WISHLIST_FAIL
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems:[] }, {type, payload}) => {
    switch (type){
      case ADD_TO_WISHLIST_REQUEST:
      case GET_WISHLIST_REQUEST:
      case DELETE_WISHLIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_TO_WISHLIST_SUCCESS:
        return {
          loading: false,
          wishlistSuccess: payload,
        };
      case GET_WISHLIST_SUCCESS:
        return {
            loading: false,
            wishlistItems: payload
        }
      case ADD_TO_WISHLIST_FAIL:
      case GET_WISHLIST_FAIL:
        return {
          ...state,
          loading: false,
          wishlistError: payload,
          wishlistItems: []
        };
      case DELETE_WISHLIST_SUCCESS:
        return {
          ...state,
          loading: false,
          wishlistDelete: payload,
        }
      case WISHLIST_RESET:
          return {
              ...state,
              wishlistSuccess: false,
              wishlistDelete: false,
          };
      case CLEAR_ERRORS:
        return {
            ...state,
            wishlistError: null,
        };
      default:
        return state;
    }
  };