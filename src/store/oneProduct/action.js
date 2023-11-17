import { fetchProduct } from "../../api/services/product";

export const GET_ONE_PRODUCT_SUCCESS = 'GET_ONE_PRODUCT_SUCCESS';
export const GET_ONE_PRODUCT_ERROR = 'GET_ONE_PRODUCT_ERROR';
export const GET_ONE_PRODUCT_LOADING = 'GET_ONE_PRODUCT_LOADING';


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


export function getOneProductThunk(id) {
    return async function (dispatch) {
        try {
                const response = await fetchProduct(id);
                const { content } = response.data;
                dispatch(getOneProductSuccessAction(content))
        } catch (e) {
            console.log(e.message);
        } 
    }
}
