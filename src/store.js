import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer, governoratesReducer, billingAddressReducer, shippingAddressReducer, contactUsReducer, contactusDetailsReducer } from './reducers/userReducer';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, productReviewsReducer, reviewReducer, categoryReducer, variantReducer, categoryDetailsReducer, newCategoryReducer, variantDetailsReducer, sizesReducer, thicknessReducer, subcategoryReducer, colorsReducer, variantsReducer, newVariantReducer, warningStockReducer, reviewDetailsReducer, initiatePaymentReducer } from './reducers/productReducer';
import { cartReducer, unauthorizedCartReducer } from './reducers/cartReducer';
import { saveForLaterReducer } from './reducers/saveForLaterReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentStatusReducer, trackOrderReducer } from './reducers/orderReducer';
import { wishlistReducer } from './reducers/wishlistReducer';

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    category: categoryReducer,
    products: productsReducer,
    variants: variantsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    cart: cartReducer,
    saveForLater: saveForLaterReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    paymentStatus: paymentStatusReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: productReviewsReducer,
    review: reviewReducer,
    wishlistItems: wishlistReducer,
    governorate: governoratesReducer,
    billing: billingAddressReducer,
    shipping: shippingAddressReducer,
    trackOrder: trackOrderReducer,
    contactUs: contactUsReducer,
    unauthorizedCart:unauthorizedCartReducer,
    categoryDetails:categoryDetailsReducer,
    newCategory:newCategoryReducer,
    variantDetails:variantDetailsReducer,
    colors: colorsReducer,
    sizes: sizesReducer,
    thicknesses: thicknessReducer,
    subcategies: subcategoryReducer,
    variant: variantReducer,
    newVariant:newVariantReducer,
    warningStock: warningStockReducer,
    reviewDetails:reviewDetailsReducer,
    contactusDetails:contactusDetailsReducer,
    initiatePayment:initiatePaymentReducer,
});

let initialState = {
    unauthorizedCart: {
        unauthorizedCartItems: localStorage.getItem('unauthorizedCartItems')
            ? JSON.parse(localStorage.getItem('unauthorizedCartItems'))
            : [],
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;