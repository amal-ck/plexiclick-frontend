
import { type } from "@testing-library/user-event/dist/type";
import {
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_DETAILS,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    SLIDER_PRODUCTS_FAIL,
    SLIDER_PRODUCTS_REQUEST,
    SLIDER_PRODUCTS_SUCCESS,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_FAIL,
    VARIANT_DETAILS_REQUEST,
    VARIANT_DETAILS_SUCCESS,
    VARIANT_DETAILS_FAIL,
    ADMIN_VARIANTS_REQUEST,
    ADMIN_VARIANTS_SUCCESS,
    ADMIN_VARIANTS_FAIL,
    ADMIN_CATEGORY_REQUEST,
    ADMIN_CATEGORY_SUCCESS,
    ADMIN_CATEGORY_FAIL,
    ADMIN_CATEGORY_DETAIL_REQUEST,
    ADMIN_CATEGORY_DETAIL_SUCCESS,
    ADMIN_CATEGORY_DETAIL_FAIL,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_FAIL,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_REQUEST,
    ADMIN_PRODUCT_VARIANT_SUCCESS,
    ADMIN_PRODUCT_VARIANT_REQUEST,
    ADMIN_PRODUCT_VARIANT_FAIL,
    ADMIN_VARIANT_DETAIL_REQUEST,
    ADMIN_VARIANT_DETAIL_SUCCESS,
    ADMIN_VARIANT_DETAIL_FAIL,
    ADMIN_COLORS_REQUEST,
    ADMIN_COLORS_SUCCESS,
    ADMIN_COLORS_FAIL,
    ADMIN_SIZES_REQUEST,
    ADMIN_SIZES_SUCCESS,
    ADMIN_SIZES_FAIL,
    ADMIN_THICKNESS_REQUEST,
    ADMIN_THICKNESS_SUCCESS,
    ADMIN_THICKNESS_FAIL,
    ADMIN_SUBCATEGORY_REQUEST,
    ADMIN_SUBCATEGORY_SUCCESS,
    ADMIN_SUBCATEGORY_FAIL,
    UPDATE_VARIANT_REQUEST,
    UPDATE_VARIANT_SUCCESS,
    UPDATE_VARIANT_FAIL,
    UPDATE_VARIANT_RESET,
    NEW_VARIANT_REQUEST,
    NEW_VARIANT_SUCCESS,
    NEW_VARIANT_FAIL,
    NEW_VARIANT_RESET,
    DELETE_VARIANT_REQUEST,
    DELETE_VARIANT_SUCCESS,
    DELETE_VARIANT_FAIL,
    DELETE_VARIANT_RESET,
    WARNING_STOCK_REQUEST,
    WARNING_STOCK_SUCCESS,
    WARNING_STOCK_FAIL,
    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    UPDATE_REVIEW_RESET,
    NEW_COLOR_REQUEST,
    NEW_COLOR_SUCCESS,
    NEW_COLOR_FAIL,
    NEW_COLOR_RESET,
    NEW_SIZE_REQUEST,
    NEW_SIZE_SUCCESS,
    NEW_SIZE_FAIL,
    NEW_SIZE_RESET,
    NEW_THICKNESS_RESET,
    NEW_THICKNESS_FAIL,
    NEW_THICKNESS_SUCCESS,
    NEW_THICKNESS_REQUEST,
    NEW_SUBCATEGORY_REQUEST,
    NEW_SUBCATEGORY_SUCCESS,
    NEW_SUBCATEGORY_FAIL,
    NEW_SUBCATEGORY_RESET,
    DELETE_COLOR_REQUEST,
    DELETE_COLOR_SUCCESS,
    DELETE_COLOR_FAIL,
    DELETE_SIZE_REQUEST,
    DELETE_SIZE_SUCCESS,
    DELETE_SIZE_FAIL,
    DELETE_THICKNESS_REQUEST,
    DELETE_THICKNESS_FAIL,
    DELETE_THICKNESS_SUCCESS,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_COLOR_RESET,
    DELETE_SIZE_RESET,
    DELETE_THICKNESS_RESET,
    DELETE_SUBCATEGORY_RESET,
    INITIATE_PAYMENT_REQUEST,
    INITIATE_PAYMENT_SUCCESS,
    INITIATE_PAYMENT_FAIL,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, { type, payload }) => {

    switch (type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
        case SLIDER_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: payload,
            };
        case ADMIN_PRODUCTS_SUCCESS:
        case SLIDER_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: payload,
            };
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
        case SLIDER_PRODUCTS_FAIL:
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
}

export const productDetailsReducer = (state = { productDetails: {} }, { type, payload }) => {

    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                productDetails:{}
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                productDetails: payload,
            };
        case PRODUCT_DETAILS_FAIL:
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
}

// New Review Reducer
export const newReviewReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                reviewError: payload,
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                reviewError: null,
            };
        default:
            return state;
    }
}

// New Product Reducer
export const newProductReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// New Product Reducer
export const newCategoryReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case NEW_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_CATEGORY_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const productReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const productReviewsReducer = (state = { reviews: [] }, { type, payload }) => {

    switch (type) {
        case ALL_REVIEWS_REQUEST:
            return {
                loading: true,
                reviews : []
            };
        case ALL_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: payload,
            };
        case ALL_REVIEWS_FAIL:
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
}

export const reviewReducer = (state = {}, { type, payload }) => {

    switch (type) {
        case UPDATE_REVIEW_REQUEST:
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case UPDATE_REVIEW_FAIL:
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_REVIEW_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const categoryReducer = (state = {category:[]}, {type, payload}) =>{
    switch (type){
        case ALL_CATEGORY_REQUEST:
        case ADMIN_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
            return{
                loading: true,
                category: [],
            };
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case ALL_CATEGORY_SUCCESS:
        case ADMIN_CATEGORY_SUCCESS:
            return{
                loading: false,
                category: payload,
            };
        case ADMIN_CATEGORY_FAIL:
        case ALL_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
            return{
                loading: false,
                error: payload
            };
        case UPDATE_CATEGORY_SUCCESS:
            return{
                loading:false,
                isUpdated:payload,
            }

        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const categoryDetailsReducer = (state = { categoryDetails: {} }, { type, payload }) => {

    switch (type) {
        case ADMIN_CATEGORY_DETAIL_REQUEST:
            return {
                loading: true,
                categoryDetails:{}
            };
        case ADMIN_CATEGORY_DETAIL_SUCCESS:
            return {
                loading: false,
                categoryDetails: payload,
            };
        case ADMIN_CATEGORY_DETAIL_FAIL:
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
}

export const variantDetailsReducer = (state = { variantDetails: {} }, { type, payload }) => {

    switch (type) {
        case ADMIN_VARIANT_DETAIL_REQUEST:
            return {
                loading: true,
                variantDetails:{}
            };
        case ADMIN_VARIANT_DETAIL_SUCCESS:
            return {
                loading: false,
                variantDetails: payload,
            };
        case ADMIN_VARIANT_DETAIL_FAIL:
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
}

export const variantsReducer = (state = { variants : []}, {type,payload}) => {
    switch(type){
        case ADMIN_VARIANTS_REQUEST:
        case ADMIN_PRODUCT_VARIANT_REQUEST:
        case VARIANT_DETAILS_REQUEST:
            return{
                variantLoading: true,
                variants: [],
            };
        case ADMIN_VARIANTS_SUCCESS:
        case VARIANT_DETAILS_SUCCESS:
        case ADMIN_PRODUCT_VARIANT_SUCCESS:
            return{
                variantLoading: false,
                variants: payload,
            };
        case ADMIN_VARIANTS_FAIL:
        case ADMIN_PRODUCT_VARIANT_FAIL:
        case VARIANT_DETAILS_FAIL:
            return{
                variantLoading: false,
                error: payload,
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

export const colorsReducer = (state = { colors: [] }, { type, payload }) => {

    switch (type) {
        case ADMIN_COLORS_REQUEST:
            return {
                colorLoading: true,
                colors: [],
            };
        case NEW_COLOR_REQUEST:
        case DELETE_COLOR_REQUEST:
            return {
                ...state,
                colorLoading: true,
            };
        case NEW_COLOR_SUCCESS:
            return {
                colorLoading: false,
                colorSuccess: payload,
            };
        case NEW_COLOR_FAIL:
            return {
                ...state,
                colorLoading: false,
                colorError: payload,
            };
        case NEW_COLOR_RESET:
            return {
                ...state,
                colorSuccess: false,
            };
        case DELETE_COLOR_SUCCESS:
            return {
                ...state,
                colorLoading: false,
                colorDeleted: payload,
            };
        case ADMIN_COLORS_SUCCESS:
            return {
                colorLoading: false,
                colors: payload,
            };
        case ADMIN_COLORS_FAIL:
        case DELETE_COLOR_FAIL:
            return {
                colorLoading: false,
                colorError: payload,
            };
        case DELETE_COLOR_RESET:
            return {
                ...state,
                colorDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                colorError: null,
            };
        default:
            return state;
    }
}

export const sizesReducer = (state = { sizes: [] }, { type, payload }) => {

    switch (type) {
        case ADMIN_SIZES_REQUEST:
            return {
                sizeLoading: true,
                sizes: [],
            };
        case ADMIN_SIZES_SUCCESS:
            return {
                sizeLoading: false,
                sizes: payload,
            };
        case ADMIN_SIZES_FAIL:
            return {
                sizeLoading: false,
                sizeError: payload,
            };
        case NEW_SIZE_REQUEST:
        case DELETE_SIZE_REQUEST:
            return {
                ...state,
                sizeLoading: true,
            };
        case NEW_SIZE_SUCCESS:
            return {
                sizeLoading: false,
                sizeSuccess: payload,
            };
        case NEW_SIZE_FAIL:
        case DELETE_SIZE_FAIL:
            return {
                ...state,
                sizeLoading: false,
                sizeError: payload,
            };
        case NEW_SIZE_RESET:
            return {
                ...state,
                sizeSuccess: false,
            };
        case DELETE_SIZE_SUCCESS:
            return {
                ...state,
                sizeLoading: false,
                sizeDeleted: payload,
            };
        case DELETE_SIZE_RESET:
            return {
                ...state,
                sizeDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                sizeError: null,
            };
        default:
            return state;
    }
}

export const thicknessReducer = (state = { thicknesses: [] }, { type, payload }) => {

    switch (type) {
        case ADMIN_THICKNESS_REQUEST:
            return {
                thicknessLoading: true,
                thicknesses: [],
            };
        case ADMIN_THICKNESS_SUCCESS:
            return {
                thicknessLoading: false,
                thicknesses: payload,
            };
        case ADMIN_THICKNESS_FAIL:
            return {
                thicknessLoading: false,
                thicknessError: payload,
            };
        case NEW_THICKNESS_REQUEST:
        case DELETE_THICKNESS_REQUEST:
            return {
                ...state,
                thicknessLoading: true,
            };
        case NEW_THICKNESS_SUCCESS:
            return {
                thicknessLoading: false,
                thicknessSuccess: payload,
            };
        case NEW_THICKNESS_FAIL:
        case DELETE_THICKNESS_FAIL:
            return {
                ...state,
                thicknessLoading: false,
                thicknessError: payload,
            };
        case NEW_THICKNESS_RESET:
            return {
                ...state,
                thicknessSuccess: false,
            };
        case DELETE_THICKNESS_SUCCESS:
            return {
                ...state,
                thicknessLoading: false,
                thicknessDeleted: payload,
            };
        case DELETE_THICKNESS_RESET:
            return {
                ...state,
                thicknessDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                thicknessError: null,
            };
        default:
            return state;
    }
}

export const subcategoryReducer = (state = { subcategies: [] }, { type, payload }) => {

    switch (type) {
        case ADMIN_SUBCATEGORY_REQUEST:
            return {
                subcategoryLoading: true,
                subcategies: [],
            };
        case ADMIN_SUBCATEGORY_SUCCESS:
            return {
                subcategoryLoading: false,
                subcategies: payload,
            };
        case ADMIN_SUBCATEGORY_FAIL:
            return {
                subcategoryLoading: false,
                subcategoryError: payload,
            };
        case NEW_SUBCATEGORY_REQUEST:
        case DELETE_SUBCATEGORY_REQUEST:
            return {
                ...state,
                subcategoryLoading: true,
            };
        case NEW_SUBCATEGORY_SUCCESS:
            return {
                subcategoryLoading: false,
                subcategorySuccess: payload,
            };
        case NEW_SUBCATEGORY_FAIL:
        case DELETE_SUBCATEGORY_FAIL:
            return {
                ...state,
                subcategoryLoading: false,
                subcategoryError: payload,
            };
        case NEW_SUBCATEGORY_RESET:
            return {
                ...state,
                subcategorySuccess: false,
            };
        case DELETE_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                subcategoryLoading: false,
                subcategoryDeleted: payload,
            };
        case DELETE_SUBCATEGORY_RESET:
            return {
                ...state,
                subcategoryDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                subcategoryError: null,
            };
        default:
            return state;
    }
}

export const variantReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_VARIANT_REQUEST:
        case DELETE_VARIANT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_VARIANT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_VARIANT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_VARIANT_FAIL:
        case DELETE_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_VARIANT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_VARIANT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// New Product Reducer
export const newVariantReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_VARIANT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_VARIANT_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case NEW_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_VARIANT_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const warningStockReducer = (state = { warningStock : []}, {type,payload}) => {
    switch(type){
        case WARNING_STOCK_REQUEST:
            return{
                loading:true,
                warningStock: [],
            };
        case WARNING_STOCK_SUCCESS:
            return{
                loading: false,
                warningStock: payload,
            };
        case WARNING_STOCK_FAIL:
            return{
                loading: false,
                error: payload,
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

export const reviewDetailsReducer = (state = { reviewDetails: {} }, { type, payload }) => {
    switch (type) {
        case REVIEW_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case REVIEW_DETAILS_SUCCESS:
            return {
                loading: false,
                reviewDetails: payload,
            };
        case REVIEW_DETAILS_FAIL:
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

export const initiatePaymentReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case INITIATE_PAYMENT_REQUEST:
            return {
                loading: true,
            };
        case INITIATE_PAYMENT_SUCCESS:
            return {
                loading: false,
                razorpay_amount: payload.razorpay_amount,
                razorpay_order_id: payload.razorpay_order_id,
            };
        case INITIATE_PAYMENT_FAIL:
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