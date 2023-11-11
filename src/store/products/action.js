import { fetchArticles, fetchProducts, syncProducts, fetchChangeProducts } from '../../api/services/product';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCT_ERROR';
export const GET_PRODUCTS_LOADING = 'GET_PRODUCT_LOADING';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';
export const CHANGE_GROUP_PRODUCTS = 'CHANGE_GROUP_PRODUCTS';



export const getProductsSuccessAction = (productList) => ({
    type: GET_PRODUCTS_SUCCESS,
    productList,

})

export const getProductsErrorAction = (error) => ({
    type: GET_PRODUCTS_ERROR,
    error
})

export const getProductsLoading = (load) => ({
    type: GET_PRODUCTS_LOADING,
    load
})


export const changeProductAction = (product) => ({
    type: CHANGE_PRODUCT,
    product
})


export const changeGroupAction = (products) => ({
    type: CHANGE_GROUP_PRODUCTS,
    products

})


export function getProductsThunk() {

    return async function (dispatch, getState) {
        dispatch(getProductsLoading(true));
        const { page, perPage } = getState().pagination;
        try {
            await syncProducts().then(async () => {
                const response = await fetchProducts(page, perPage);
                const { content } = response.data;
                dispatch(getProductsSuccessAction(content));
            })
        } catch (e) {
            console.log(e.message);
            dispatch(getProductsErrorAction('Error'));
        } finally {
            dispatch(getProductsLoading(false))
        }
    }
}


export function changeProductThunk(product) {

    console.log(product)

    return async function (dispatch, getState) {

        // dispatch(getProductsLoading());
        try {
            const response = await fetchChangeProducts(product.id, product);
            console.log(response)

            dispatch(changeProductAction(product))

        } catch (e) {
            dispatch(getProductsErrorAction('Error'));
        }
    }
}

export function changeProductGroupThunk(products) {

    console.log(products)
    return async function (dispatch, getState) {

        try {
            // const response = await fetchChangeProducts(product.id, product);
            // console.log(response)

            dispatch(changeGroupAction(products))

        } catch (e) {
            dispatch(getProductsErrorAction('Error'));
        }
    }
}