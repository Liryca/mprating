import { GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_LOADING, CHANGE_PRODUCT } from "./action";

export const productsState = {
    page: 1,
    productList: [],
    loading: true,
    error: null,
    totalProducts: 0,
    perPage: 10,
    fromProducts: 0,
    toProducts: 10,
    currentProductGroup: []
}

export const productsReducer = (state = productsState, action) => {
    console.log(action.value) 

    switch (action.type) {
   
        case CHANGE_PRODUCT:
            return{
                ...state,
                productList: state.productList.map(product => product.id === action.id ? { ...product, [action.field]:action.value }:product)
            }

        case GET_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
                currentProductGroup: []
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                error: null,
                productList: [...state.productList, ...action.productList.filter(elem => !state.productList.includes(elem))],
                loading: false,
                totalProducts: state.productList,
                currentProductGroup: [...state.currentProductGroup, ...action.productList.slice(state.fromProducts, state.toProducts).map(i => i.id)]
            }
        case GET_PRODUCTS_ERROR:
            return {
                error: action.error, productList: [], loading: false, currentProductGroup: []
            }
        default:
            return state
    }
}