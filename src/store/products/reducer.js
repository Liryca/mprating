import { data } from "../../data/data";
import { DECREASE_PAGE,INCREASE_PAGE,GET_PRODUCT_ERROR,GET_PRODUCT_SUCCESS } from "./action";

export const productsState = {
    page: 1,
    productList: [],
    loading: false,
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
            if(state.totalProducts===state.toProducts){
                return {
                    ...state,
                    toProducts: state.toProducts -(state.totalProducts-state.fromProducts),
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
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: true, error: null, productList: action.productList
            }
        case GET_PRODUCT_ERROR:
            return {
                loading: false, error: action.error, productList: []
            }
        default:
            return state
    }
}