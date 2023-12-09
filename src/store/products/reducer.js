import {
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_LOADING,
    CHANGE_PRODUCT,
    CHANGE_PRICE_MODE_PRODUCTS,
    CHANGE_USE_AUTO_PRODUCTS
} from "./action";

export const productsState = {
    productList: [],
    isLoadingProducts: false,
    error: null,
}

export const productsReducer = (state = productsState, action) => {

    switch (action.type) {

        case GET_PRODUCTS_LOADING:
            return {
                ...state,
                isLoadingProducts: action.load,
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                error: null,
                productList: action.productList,
                isLoadingProducts: action.load,
            }

        case GET_PRODUCTS_ERROR:
            return {
                error: action.error,
                productList: [],
                isLoadingProducts: false,
                oneProduct:{}
            }
    
        case CHANGE_PRICE_MODE_PRODUCTS:
            return {
                ...state,
                productList: state.productList.map(product => {
                    return {
                        ...product,
                        priceMode:action.priceMode
                    }
                })
            }
        
            case CHANGE_USE_AUTO_PRODUCTS:
                return {
                    ...state,
                    productList: state.productList.map(product => {
                        return {
                            ...product,
                            useInAutoMode:action.useAuto
                        }
                    })
            }
        
            case CHANGE_PRODUCT:
                return {
                    ...state,
                    productList: [...state.productList.map(el => el.id === action.product.id ? action.product : el)],
                }

        default: return state
    }
}