export const ProductsState = {
    page: 1,
    productList: [],
    loading: false,
    error: null,

}

export const productsReducer = (state = ProductsState, action) => {

    switch (action.type) {
        case 'DECREASE_PAGE': {
            return {
                ...state,
                page: state.page + 1
            }
        }
        case 'INCREASE__PAGE': {
            if (state.page > 0) {
                return {
                    ...state,
                    page: state.page - 1
                }
            } else {
                return {
                    ...state,
                    page: 0
                }
            }

        }

        case 'GET_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: true, error: null, productList: action.productList
            }

        case 'GET_PRODUCT_ERROR':
            return {
                loading: false, error: action.error, productList: []
            }


        default:
            return state
    }
}