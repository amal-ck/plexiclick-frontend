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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    CLEAR_ERRORS,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    REMOVE_USER_DETAILS,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_REQUEST,
    GOVERNORATES_REQUEST,
    GOVERNORATES_SUCCESS,
    BILLING_ADDRESS_REQUEST,
    BILLING_ADDRESS_SUCCESS,
    BILLING_ADDRESS_FAIL,
    UPDATE_BILLING_REQUEST,
    UPDATE_BILLING_SUCCESS,
    UPDATE_BILLING_FAIL,
    UPDATE_BILLING_RESET,
    SHIPPING_ADDRESS_REQUEST,
    SHIPPING_ADDRESS_SUCCESS,
    SHIPPING_ADDRESS_FAIL,
    UPDATE_SHIPPING_REQUEST,
    UPDATE_SHIPPING_SUCCESS,
    UPDATE_SHIPPING_FAIL,
    UPDATE_SHIPPING_RESET,
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL,
    CONTACT_US_RESET,
    ADMIN_CONTACT_REQUEST,
    ADMIN_CONTACT_SUCCESS,
    ADMIN_CONTACT_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_DETAILS_FAIL,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_RESET,
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, { type, payload }) => {
    switch (type) {
      case LOGIN_USER_REQUEST:
      case REGISTER_USER_REQUEST:
      case REFRESH_TOKEN_REQUEST:
          return {
              loading: true,
              isAuthenticated: false,
            };
      case LOAD_USER_REQUEST:
        return{
            loading:false,
        }
      case LOGIN_USER_SUCCESS:
      case REGISTER_USER_SUCCESS:
        const { access_token, refresh_token } = payload;
        localStorage.setItem('access', access_token);
        localStorage.setItem('refresh', refresh_token);
  
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          access_token,
          refresh_token,
        };
      case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            user: payload,
            isAuthenticated: true,
        }
      case LOAD_USER_FAIL:
        return{
            user:null,
            isAuthenticated:false,
            loading: false,
            access: null,
            refresh: null,
        }
      case REFRESH_TOKEN_SUCCESS:
        const { access } = payload;
        localStorage.setItem('access', access);
        return{
            ...state,
            loading: false,
            isAuthenticated: true,
            access,
        }
      case LOGOUT_USER_SUCCESS:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
  
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
          access: null,
          refresh: null,
        };
      case LOGIN_USER_FAIL:
      case REGISTER_USER_FAIL:
      case REFRESH_TOKEN_FAIL:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
  
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          access: null,
          refresh: null,
          error: payload,
        };
      case LOGOUT_USER_FAIL:
  
        return {
          ...state,
          loading: false,
          error: payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const profileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const forgotPasswordReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload,
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const allUsersReducer = (state = { users: [] }, { type, payload }) => {
    switch (type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                users:[],
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: payload,
            };
        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const userDetailsReducer = (state = { user: {} }, { type, payload }) => {
    switch (type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case REMOVE_USER_DETAILS:
            return {
                ...state,
                user: {},
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const governoratesReducer = (state = { governorate: []}, {type, payload}) => {
    switch(type){
        case GOVERNORATES_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case GOVERNORATES_SUCCESS:
            return{
                ...state,
                loading: false,
                governorate: payload,
            };
        default:
            return state;
    }
};

export const billingAddressReducer = (state = { billing: {}}, { type, payload}) => {
    switch(type){
        case BILLING_ADDRESS_REQUEST:
        case UPDATE_BILLING_REQUEST:
            return{
                ...state,
                loading: true,
                billing: {},
            };
        case BILLING_ADDRESS_SUCCESS:
            return{
                ...state,
                loading: false,
                billing: payload
            };
        case UPDATE_BILLING_SUCCESS:
            return{
                ...state,
                loading: false,
                success: payload,
            }
        case BILLING_ADDRESS_FAIL:
        case UPDATE_BILLING_FAIL:
            return{
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_BILLING_RESET:
            return {
                ...state,
                success:false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const shippingAddressReducer = (state = { shipping: {}}, { type, payload}) => {
    switch(type){
        case SHIPPING_ADDRESS_REQUEST:
        case UPDATE_SHIPPING_REQUEST:
            return{
                ...state,
                loading: true,
                shipping: {},
            };
        case SHIPPING_ADDRESS_SUCCESS:
            return{
                ...state,
                loading: false,
                shipping: payload
            };
        case UPDATE_SHIPPING_SUCCESS:
            return{
                ...state,
                loading: false,
                success: payload,
            }
        case SHIPPING_ADDRESS_FAIL:
        case UPDATE_SHIPPING_FAIL:
            return{
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_SHIPPING_RESET:
            return {
                ...state,
                success:false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const contactUsReducer = (state = {}, {type, payload}) => {
    switch(type){
        case ADMIN_CONTACT_REQUEST:
        case CONTACT_US_REQUEST:
        case DELETE_CONTACT_REQUEST:
            return{
                loading: true
            }
        case CONTACT_US_SUCCESS:
            return{
                loading: false,
                success: payload
            }
        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case ADMIN_CONTACT_SUCCESS:
            return{
                ...state,
                loading: false,
                contactUs:payload
            }
        case DELETE_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case DELETE_CONTACT_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case ADMIN_CONTACT_FAIL:
        case CONTACT_US_FAIL:
            return{
                loading: false,
                error: payload
            }
        case CONTACT_US_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const contactusDetailsReducer = (state = { contctusDetails: {} }, { type, payload }) => {
    switch (type) {
        case CONTACT_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case CONTACT_DETAILS_SUCCESS:
            return {
                loading: false,
                contactusDetails: payload,
            };
        case CONTACT_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};