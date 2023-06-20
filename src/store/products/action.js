import { fetchProducts,fn } from '../../api/http/product';

export const INCREASE_PAGE = 'INCREASE_PAGE';
export const DECREASE_PAGE = 'DECREASE_PAGE';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR';

export const increaseAction = () => ({
    type: INCREASE_PAGE,
})
export const decreaseAction = () => ({
    type: DECREASE_PAGE

})

export const getProductsSuccessAction = (productList) => ({
    type: GET_PRODUCT_SUCCESS,
    productList

})

export const getProductErrorAction = (error) => ({
    type: GET_PRODUCT_ERROR,
    error
})

export function getProductsThunk() {
    return async function (dispatch, getState) {
        const { products } = getState();
        try {
            // const response = await fetchProducts(products.page);
            const l = fn(products.page,products.perPage)
           dispatch(getProductsSuccessAction(l))
            // dispatch(getProductsSuccessAction(response.results));

        } catch (e) {
            dispatch(getProductErrorAction('Error'));
        }
    }
}