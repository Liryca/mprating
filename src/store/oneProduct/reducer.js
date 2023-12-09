import { GET_ONE_PRODUCT_SUCCESS, GET_ONE_PRODUCT_LOADING, GET_ONE_PRODUCT_ERROR,CLEAN_ONE_PRODUCT } from "./action"

export const oneProductState = {
    oneProduct:{},
    isLoadingOneProduct: false,
    errorOneProduct: null,
}

export const oneProductReducer = (state = oneProductState, action) => {

    switch (action.type) {

        case GET_ONE_PRODUCT_LOADING:
            return {
                ...state,
                isLoadingOneProduct: action.load,
            }

        case GET_ONE_PRODUCT_SUCCESS:
            return {
                ...state,
                errorOneProduct: null,
                oneProduct: action.product,
                isLoadingOneProduct: action.load,
            }

        case GET_ONE_PRODUCT_ERROR:
            return {
                errorOneProduct: action.error,
                isLoadingOneProduct: false,
                oneProduct: {}
            }
        
            case CLEAN_ONE_PRODUCT:
            return {
                    ...state,
                    oneProduct: {}

                }
            default: return state
        }
    }