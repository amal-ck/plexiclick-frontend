import axios from "axios";
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    SLIDER_PRODUCTS_REQUEST,
    SLIDER_PRODUCTS_SUCCESS,
    SLIDER_PRODUCTS_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    VARIANT_DETAILS_SUCCESS,
    VARIANT_DETAILS_REQUEST,
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
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    ADMIN_PRODUCT_VARIANT_REQUEST,
    ADMIN_PRODUCT_VARIANT_SUCCESS,
    ADMIN_PRODUCT_VARIANT_FAIL,
    ADMIN_VARIANT_DETAIL_FAIL,
    ADMIN_VARIANT_DETAIL_SUCCESS,
    ADMIN_VARIANT_DETAIL_REQUEST,
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
    NEW_VARIANT_REQUEST,
    NEW_VARIANT_SUCCESS,
    NEW_VARIANT_FAIL,
    DELETE_VARIANT_REQUEST,
    DELETE_VARIANT_SUCCESS,
    DELETE_VARIANT_FAIL,
    WARNING_STOCK_REQUEST,
    WARNING_STOCK_SUCCESS,
    WARNING_STOCK_FAIL,
    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    NEW_COLOR_REQUEST,
    NEW_COLOR_SUCCESS,
    NEW_COLOR_FAIL,
    NEW_SIZE_REQUEST,
    NEW_SIZE_SUCCESS,
    NEW_SIZE_FAIL,
    NEW_THICKNESS_REQUEST,
    NEW_THICKNESS_SUCCESS,
    NEW_THICKNESS_FAIL,
    NEW_SUBCATEGORY_REQUEST,
    NEW_SUBCATEGORY_SUCCESS,
    NEW_SUBCATEGORY_FAIL,
    DELETE_COLOR_REQUEST,
    DELETE_COLOR_SUCCESS,
    DELETE_COLOR_FAIL,
    DELETE_SIZE_REQUEST,
    DELETE_SIZE_SUCCESS,
    DELETE_SIZE_FAIL,
    DELETE_THICKNESS_REQUEST,
    DELETE_THICKNESS_SUCCESS,
    DELETE_THICKNESS_FAIL,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    INITIATE_PAYMENT_REQUEST,
    INITIATE_PAYMENT_SUCCESS,
    INITIATE_PAYMENT_FAIL,
} from "../constants/productConstants";

// Get All Products --- Filter/Search/Sort
export const getProducts =
    (keyword = "", selectedCategory, price = [0, 10], color = "") => async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUEST });

            let url = `/api/products/filter?keyword=${keyword}&min_price=${price[0]}&max_price=${price[1]}&filter_color=${color}`;
            if (selectedCategory) {
                url = `/api/products/filter?keyword=${keyword}&category_name=${selectedCategory}&min_price=${price[0]}&max_price=${price[1]}&filter_color=${color}`;
            }
            const { data } = await axios.get(url);

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// get all categories
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });

        const { data } = await axios.get('/api/category/');

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Products Of Same Category
export const getSimilarProducts = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/v1/products?category=${category}`);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.email,
        });
    }
};

// Get Product Details
export const getProductDetails = (product_name) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/product/${product_name}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get variant Details
export const getAdminVariantDetails = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_VARIANT_DETAIL_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(`/administrator/variant/${id}`, config);

        dispatch({
            type: ADMIN_VARIANT_DETAIL_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_VARIANT_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getVariants = (product_name) => async (dispatch) => {
    try {
        dispatch({ type: VARIANT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/variants/${product_name}`)

        dispatch({
            type: VARIANT_DETAILS_SUCCESS,
            payload: data.data
        });
    } catch (error) {
        dispatch({
            type: VARIANT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// New/Update Review
export const newReview = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken ? `Bearer ${accessToken}` : undefined,
            }
        }
        const { data } = await axios.post("/api/products/review/", formData, config);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.email,
        });
    }
}

// Get All Products
// export const getAllProducts = () => async (dispatch) => {
//     try {
//         dispatch({ type: SLIDER_PRODUCTS_REQUEST });

//         const { data } = await axios.get('/api/products/');
//         dispatch({
//             type: SLIDER_PRODUCTS_SUCCESS,
//             payload: data.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: SLIDER_PRODUCTS_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// Get All Categories ---ADMIN
export const getAdminCategories = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CATEGORY_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/administrator/categories/', config);

        dispatch({
            type: ADMIN_CATEGORY_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAdminCategoriesDetails = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CATEGORY_DETAIL_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get(`/administrator/categories/${id}`, config);

        dispatch({
            type: ADMIN_CATEGORY_DETAIL_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_CATEGORY_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Products ---ADMIN
export const getAdminProducts = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/administrator/products', config);

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};
// admin colors
export const getAdminColors = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_COLORS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/administrator/colors', config);

        dispatch({
            type: ADMIN_COLORS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_COLORS_FAIL,
            payload: error.response.data.message,
        });
    }
};
// admin sizes
export const getAdminSizes = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SIZES_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/administrator/sizes', config);

        dispatch({
            type: ADMIN_SIZES_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_SIZES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// admin thickness
export const getAdminThickness = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_THICKNESS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/administrator/thickness', config);

        dispatch({
            type: ADMIN_THICKNESS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_THICKNESS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// admin subcategory
export const getAdminSubcategory = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SUBCATEGORY_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

        const { data } = await axios.get('/administrator/subcategory', config);

        dispatch({
            type: ADMIN_SUBCATEGORY_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Variants ---ADMIN
export const getAdminVariants = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_VARIANTS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
        const { data } = await axios.get('/administrator/variants/', config);

        dispatch({
            type: ADMIN_VARIANTS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_VARIANTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New category ---ADMIN
export const createCategory = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.post("/administrator/categories/", formData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
}

// New Product ---ADMIN
export const createProduct = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.post("/administrator/products/", formData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Product ---ADMIN
export const updateProduct = (id, formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.patch(`/administrator/product/${id}/`, formData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// New variant ---ADMIN
export const createVariant = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_VARIANT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.post("/administrator/variants/", formData, config);

        dispatch({
            type: NEW_VARIANT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_VARIANT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update variant ---ADMIN
export const updateVariant = (id, formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_VARIANT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.patch(`/administrator/variant/${id}/`, formData, config);

        dispatch({
            type: UPDATE_VARIANT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_VARIANT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update category ---ADMIN
export const updateCategory = (id, formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.patch(`/administrator/categories/${id}/`, formData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product ---ADMIN
export const deleteProduct = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.delete(`/administrator/product/delete/${id}`, config);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete variant ---ADMIN
export const deleteVariant = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_VARIANT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.delete(`/administrator/variant/${id}`, config);

        dispatch({
            type: DELETE_VARIANT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: DELETE_VARIANT_FAIL,
            payload: error.response.data.message,
        });
    }
}


// Get Product Reviews ---USER
export const getAllReviews = (product_name) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });
        const { data } = await axios.get(`/api/products/review?product_name=${product_name}`);

        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get Product Reviews ---ADMIN
export const getAdminReviews = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };

        const { data } = await axios.get(`/administrator/reviews/${id}`, config);

        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get Product variants based products ---ADMIN
export const getAdminVariantsofProduct = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_VARIANT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };

        const { data } = await axios.get(`/administrator/variants/${id}`, config);

        dispatch({
            type: ADMIN_PRODUCT_VARIANT_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_VARIANT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get warning stock variants---ADMIN
export const getWarningStock = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: WARNING_STOCK_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };

        const { data } = await axios.get(`/administrator/warning_stock/`, config);

        dispatch({
            type: WARNING_STOCK_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: WARNING_STOCK_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product Review ---ADMIN
export const deleteReview = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.delete(`/administrator/review/${id}`, config);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete category ---ADMIN
export const deleteCategory = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };


        const { data } = await axios.delete(`/administrator/categories/${id}`, config);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Review details for Admin
export const getAdminReviewDetails = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.get(`/administrator/review/${id}`, config);

        dispatch({
            type: REVIEW_DETAILS_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: REVIEW_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update review ---ADMIN
export const updateReview = (id, review_status, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.patch(`/administrator/review/${id}/`, review_status, config);

        dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New color ---ADMIN
export const createColor = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_COLOR_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.post("/administrator/colors/", formData, config);

        dispatch({
            type: NEW_COLOR_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_COLOR_FAIL,
            payload: error.response.data.message,
        });
    }
}

// New size ---ADMIN
export const createSize = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SIZE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.post("/administrator/sizes/", formData, config);

        dispatch({
            type: NEW_SIZE_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_SIZE_FAIL,
            payload: error.response.data.message,
        });
    }
}

// New thickness ---ADMIN
export const createThickness = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_THICKNESS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.post("/administrator/thickness/", formData, config);

        dispatch({
            type: NEW_THICKNESS_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_THICKNESS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// New subcategory ---ADMIN
export const createSubcategory = (formData, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SUBCATEGORY_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const { data } = await axios.post("/administrator/subcategory/", formData, config);

        dispatch({
            type: NEW_SUBCATEGORY_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: NEW_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete color ---ADMIN
export const deleteColor = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COLOR_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };


        const { data } = await axios.delete(`/administrator/color/delete/${id}/`, config);

        dispatch({
            type: DELETE_COLOR_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: DELETE_COLOR_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete size ---ADMIN
export const deleteSize = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SIZE_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };


        const { data } = await axios.delete(`/administrator/size/delete/${id}/`, config);

        dispatch({
            type: DELETE_SIZE_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: DELETE_SIZE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete thickness ---ADMIN
export const deleteThickness = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_THICKNESS_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };


        const { data } = await axios.delete(`/administrator/thickness/delete/${id}/`, config);

        dispatch({
            type: DELETE_THICKNESS_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: DELETE_THICKNESS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete subcategory ---ADMIN
export const deleteSubcategory = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUBCATEGORY_REQUEST });

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };


        const { data } = await axios.delete(`/administrator/subcategory/delete/${id}/`, config);

        dispatch({
            type: DELETE_SUBCATEGORY_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const initiatePayment = (id, accessToken) => async (dispatch) => {
    try {
        dispatch({ type: INITIATE_PAYMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const { data } = await axios.post(`/api/initiate_payment/${id}/`, null, config);
        console.log(data);
        dispatch({
            type: INITIATE_PAYMENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INITIATE_PAYMENT_FAIL,
            payload: error,
        });
    }
};


// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}