import {
    fetchProducts,
    syncProducts,
    fetchChangeProduct,
    fetchChangePriceModeProducts,
    fetchChangeUseAutoModeProducts
} from '../../api/services/product';
import { paginationTotalElementsAction } from '../pagination/action';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCT_ERROR';
export const GET_PRODUCTS_LOADING = 'GET_PRODUCT_LOADING';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';
export const CHANGE_PRICE_MODE_PRODUCTS = 'CHANGE_PRICE_MODE_PRODUCTS';
export const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';
export const CHANGE_USE_AUTO_PRODUCTS = 'CHANGE_USE_AUTO_PRODUCTS';

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


export const changePriceModeProductsAction = (priceMode) => ({
    type: CHANGE_PRICE_MODE_PRODUCTS,
    priceMode

})

export const changeUseAutoProductsAction = (useAuto) => ({
    type: CHANGE_USE_AUTO_PRODUCTS,
    useAuto

})


export function getProductsThunk() {
    return async function (dispatch, getState) {
        dispatch(getProductsLoading(true));
        const { page, size} = getState().pagination;
        try {
            // await syncProducts().then(async () => {
                const response = await fetchProducts(page, size);
                const { content, totalPages, totalElements } = response.data;
                dispatch(getProductsSuccessAction(content));
                dispatch( paginationTotalElementsAction(totalElements))
            // })
        } catch (e) {
            console.log(e.message);
            dispatch(getProductsErrorAction('Error'));
        } finally {
            dispatch(getProductsLoading(false))
        }
    }
}



export function synchronizationProductsThunk() {

    return async function (dispatch, getState) {
        dispatch(getProductsLoading(true));
        const { page, size} = getState().pagination;
        try {
            await syncProducts().then(async () => {
                const response = await fetchProducts(page, size);
                const { content, totalPages, totalElements } = response.data;
                dispatch(getProductsSuccessAction(content));
                dispatch( paginationTotalElementsAction(totalElements))
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
    return async function (dispatch) {
        try {
            const response = await fetchChangeProduct(product.id, product);
            dispatch(changeProductAction(product))
        } catch (e) {
            dispatch(getProductsErrorAction('Error'));
        }
    }
}

export function changePriceModeProductsThunk(priceMode) {
    return async function (dispatch) {
        try {
            const response = await fetchChangePriceModeProducts(priceMode);
            dispatch(changePriceModeProductsAction(priceMode));
        } catch (e) {
            dispatch(getProductsErrorAction('Error'));
        }
    }
}

export function changeUseAutoProductsThunk(useAuto) {
    return async function (dispatch) {
        try {
            const response = await fetchChangeUseAutoModeProducts(useAuto);
            console.log(response);
            dispatch(changeUseAutoProductsAction(useAuto));
        } catch (e) {
            dispatch(getProductsErrorAction('Error'));
        }
    }
}