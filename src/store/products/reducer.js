import { data } from "../../data/data";
import { DECREASE_PAGE, INCREASE_PAGE, GET_PRODUCT_ERROR, GET_PRODUCT_SUCCESS, GET_PRODUCT_LOADING } from "./action";

export const productsState = {
    page: 1,
    productList: [],
    loading: true,
    error: null,
    totalProducts: data.length,
    perPage: 10,
    fromProducts: 0,
    toProducts: 10
}



export const productsReducer = (state = productsState, action) => {

    switch (action.type) {

        case INCREASE_PAGE: {
            if ((state.totalProducts - state.toProducts) < state.perPage) {
                return {
                    ...state,
                    toProducts: state.toProducts + (state.totalProducts - state.toProducts),
                    fromProducts: state.fromProducts + state.perPage,
                    page: state.page + 1,
                }
            } else {
                return {
                    ...state,
                    page: state.page + 1,
                    fromProducts: state.fromProducts + state.perPage,
                    toProducts: state.toProducts + state.perPage
                }
            }
        }
        case DECREASE_PAGE: {
            if (state.totalProducts === state.toProducts) {
                return {
                    ...state,
                    toProducts: state.toProducts - (state.totalProducts - state.fromProducts),
                    page: state.page - 1,
                    fromProducts: state.fromProducts - state.perPage,

                }
            }
            else {
                return {
                    ...state,
                    page: state.page - 1,
                    fromProducts: state.fromProducts - state.perPage,
                    toProducts: state.toProducts - state.perPage
                }
            }
        }

        case GET_PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                error: null, productList: action.productList, loading:false
            }
        case GET_PRODUCT_ERROR:
            return {
                error: action.error, productList: [], loading: false,
            }
        default:
            return state
    }
}