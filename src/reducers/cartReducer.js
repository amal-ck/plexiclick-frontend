import { 
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    CLEAR_ERRORS,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    CART_RESET,
    DELETE_CART_FAIL,
    DELETE_CART_REQUEST,
    DELETE_CART_SUCCESS,
    ADD_TO_UNAUTHORIZED_CART,
    REMOVE_FROM_UNAUTHORIZED_CART,
    ADD_TO_UNAUTHORIZED_CART_REQUEST,
    EMPTY_CART

 } from "../constants/cartConstants";

export const cartReducer = (state = { cart:[] }, {type, payload}) => {
    switch (type){
      case ADD_TO_CART_REQUEST:
      case GET_CART_REQUEST:
      case DELETE_CART_REQUEST:
        return {
          ...state,
          cartLoading: true,
        };
      case ADD_TO_CART_SUCCESS:
        return {
          cartLoading: false,
          cartSuccess: payload,
        };
      case GET_CART_SUCCESS:
        return {
            cartLoading: false,
            cart: payload
        }
      case ADD_TO_CART_FAIL:
      case GET_CART_FAIL:
        return {
          ...state,
          cartLoading: false,
          cartError: payload,
          cart: []
        };
      case DELETE_CART_SUCCESS:
        return {
          ...state,
          cartLoading: false,
          cartDelete: payload,
        }
      case CART_RESET:
          return {
              ...state,
              cartSuccess: false,
              cartDelete: false,
          };
      case CLEAR_ERRORS:
        return {
            ...state,
            cartError: null,
        };
      default:
        return state;
    }
  };

export const unauthorizedCartReducer = (state = { unauthorizedCartItems: [] }, { type, payload }) => {
    switch (type) {
        case ADD_TO_UNAUTHORIZED_CART_REQUEST:
          return{
            ...state,
            unautherizedCartLoading: true,
          }
        case ADD_TO_UNAUTHORIZED_CART:
          const newItem = payload;
          const existingItem = state.unauthorizedCartItems.find((el) => el.id === newItem.id);

          if (existingItem) {
              // Update quantity if the item already exists
              return {
                  ...state,
                  unautherizedCartLoading: false,
                  unauthorizedCartItems: state.unauthorizedCartItems.map((el) =>
                      el.id === existingItem.id
                          ? { ...existingItem, quantity: parseInt(existingItem.quantity) + parseInt(newItem.quantity) }
                          : el
                  ),
              };
          } else {
              // Add the item to the cart if it doesn't exist
              return {
                  ...state,
                  unautherizedCartLoading: false,
                  unauthorizedCartItems: [...state.unauthorizedCartItems, newItem],
              };
          }
        case REMOVE_FROM_UNAUTHORIZED_CART:
            return {
              ...state,
              unautherizedCartLoading: false,
              unauthorizedCartItems: state.unauthorizedCartItems.filter((el) => el.id !== payload),
            };
        case EMPTY_CART:
            return {
                ...state,
                unauthorizedCartItems: [],
            }   
        default:
            return state;
    }
}