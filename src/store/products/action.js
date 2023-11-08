import { fetchArticles, fetchProducts } from '../../api/services/product';
import { checkCheckBoxesAction } from '../checkBoxes/action';
import { checkRadioButtonsAction } from '../radiobuttons/action';
import {data} from '../../data/data';



export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCT_ERROR';
export const GET_PRODUCTS_LOADING = 'GET_PRODUCT_LOADING';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';
export const CHANGE_GROUP_PRODUCTS = 'CHANGE_GROUP_PRODUCTS';
export const DELETE__CHANGED_PRODUCT = 'DELETE__CHANGED_PRODUCT';
export const DELETE_CHANGED_PRODUCTS_GROUP = 'DELETE_CHANGED_PRODUCTS_GROUP';


export const deleteChangedProduct = (id) => ({
    type: DELETE__CHANGED_PRODUCT,
    id
})

export const deleteChangedProductsGroup = () => ({
    type: DELETE_CHANGED_PRODUCTS_GROUP,
})

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

export const changeProduct = (id, field, value) => ({
    type: CHANGE_PRODUCT,
    id,
    field,
    value,
})

export const changeGroupProducts = (ids, key, value) => ({
    type: CHANGE_GROUP_PRODUCTS,
    ids,
    key,
    value

})


export function getProductsThunk() {

    return async function (dispatch, getState) {
        dispatch(getProductsLoading(true));
        const { page, perPage } = getState().pagination;
        try {
            const response = await fetchProducts(page, perPage);
            console.log(response)
            const { content, totalElements } = response.data;
            dispatch(getProductsSuccessAction(data, totalElements));
       
                dispatch(checkCheckBoxesAction(data?.filter(i => i.useInAutoMode).map(i => i.id), 'useInAutoModeCheckBoxes'));
                dispatch(checkCheckBoxesAction(data?.filter(i => i.joinStocks).map(i => i.id), 'promotionCheckBoxes'));
                dispatch(checkCheckBoxesAction(data?.filter(i => i.followingStrategy).map(i => i.id), 'followingStrategyCheckBoxes'));
                dispatch(checkRadioButtonsAction(
                    'priceSettingRadios',
                    'priceSettingRadiosWithValue',
                    data?.filter(i => i.priceMode !== '').map(i => i.id),
                    data?.reduce((a, i) => (a[i.id] = i.priceMode, a), {})))
                dispatch(checkRadioButtonsAction(
                    'afterEndPromotionRadios',
                    'afterEndPromotionRadiosWithValue',
                    data?.filter(i => i.afterEndPromotion !== '').map(i => i.id),
                    data?.reduce((a, i) => (a[i.id] = i.afterEndPromotion, a), {})))
                dispatch(checkRadioButtonsAction(
                    'strategyRadios',
                    'strategyRadiosWithValue',
                    data?.filter(i => i.strategy !== '').map(i => i.id),
                    data?.reduce((a, i) => (a[i.id] = i.strategy, a), {})))
        } catch (e) {
            console.log(e.message);
            dispatch(getProductsErrorAction('Error'));
        } finally {
            dispatch(getProductsLoading(false))
        }
    }
}


// export function changeProductThunk(id) {

//     return async function (dispatch, getState) {

//         dispatch(getProductLoading());
//         try {
//             const response = await sendProduct(id);
//             console.log(response)
//             const { products } = response.data;
//             console.log(response.data, 'product')
//             // const response = fn(products.page, products.perPage)
//             dispatch(getProductsSuccessAction(products));
//             // setTimeout(() => dispatch(getProductsSuccessAction(response)), 500)

//         } catch (e) {
//             dispatch(getProductErrorAction('Error'));
//         }
//     }
// }