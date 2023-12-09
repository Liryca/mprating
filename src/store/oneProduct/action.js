import { fetchProduct } from "../../api/services/product";

export const GET_ONE_PRODUCT_SUCCESS = 'GET_ONE_PRODUCT_SUCCESS';
export const GET_ONE_PRODUCT_ERROR = 'GET_ONE_PRODUCT_ERROR';
export const GET_ONE_PRODUCT_LOADING = 'GET_ONE_PRODUCT_LOADING';
export const CLEAN_ONE_PRODUCT ='CLEAN_ONE_PRODUCT'


export const getOneProductSuccessAction = (product) => ({
    type: GET_ONE_PRODUCT_SUCCESS,
    product,

})

export const getOneProductErrorAction = (error) => ({
    type: GET_ONE_PRODUCT_ERROR,
    error
})

export const getOneProductLoading = (load) => ({
    type: GET_ONE_PRODUCT_LOADING,
    load
})

export const cleanOneProductLoading = () => ({
    type: CLEAN_ONE_PRODUCT,
})


export function getOneProductThunk(id) {
    return async function (dispatch) {
        dispatch(getOneProductLoading(true))
        try {
            const response = await fetchProduct(id);
                dispatch(getOneProductSuccessAction(response.data))
        } catch (e) {
            console.log(e.message);
        } finally {
            dispatch(getOneProductLoading(false))
        }
    }
}
