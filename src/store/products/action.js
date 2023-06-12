import { fetchProducts } from '../../api/http/product';


export const increaseAction = () => ({
    type: 'DECREASE_PAGE',
})
export const decreaseAction = () => ({
    type: 'INCREASE__PAGE',

})

export const getProductsSuccessAction = (productList) => ({
    type: 'GET_PRODUCT_SUCCESS',
    productList

})

export const getProductErrorAction = (error) => ({
    type: 'GET_PRODUCT_ERROR',
    error
})

export function getProductsThunk() {
    return async function (dispatch, getState) {
        const { products } = getState();
        try {
            const response = await fetchProducts(products.page);
            dispatch(getProductsSuccessAction(response.results));

        } catch (e) {
            dispatch(getProductErrorAction('Error'));
        }
    }
}