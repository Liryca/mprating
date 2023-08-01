import { fetchProducts, fn } from '../../api/services/product';
import { checkActiveIdsAction } from '../choiceIdProduct/action';
import { checkPromotionAction } from '../choicePromotion/action';
import { checkPriceSettingAction } from '../priceSetting/action';


export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCT_ERROR';
export const GET_PRODUCTS_LOADING = 'GET_PRODUCT_LOADING';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';
export const CHANGE_GROUP_PRODUCTS = 'CHANGE_GROUP_PRODUCTS';
export const DELETE__CHANGED_PRODUCT = 'DELETE__CHANGED_PRODUCT';


export const deleteChangedProduct = (id) => ({
    type: DELETE__CHANGED_PRODUCT,
    id


})

export const getProductsSuccessAction = (productList, totalProducts, placeholder) => ({
    type: GET_PRODUCTS_SUCCESS,
    productList,
    totalProducts,
    placeholder

})

export const getProductsErrorAction = (error) => ({
    type: GET_PRODUCTS_ERROR,
    error
})

export const getProductsLoading = () => ({
    type: GET_PRODUCTS_LOADING,

})

export const changeProduct = (id, field, value) => ({
    type: CHANGE_PRODUCT,
    id,
    field,
    value
})

export const changeGroupProducts = (ids,key,value) => ({
    type: CHANGE_GROUP_PRODUCTS,
    ids,
    key,
    value

})


export function getProductsThunk(id) {

    return async function (dispatch) {
        dispatch(getProductsLoading());
        try {
            const response = await fetchProducts(id);
            const { products, size, placeholder } = response.data;
            dispatch(getProductsSuccessAction(products, size, placeholder));
            dispatch(checkActiveIdsAction(products.filter(i => i.useInAutoMode).map(i => i.id)));
            dispatch(checkPromotionAction(products.filter(i => i.join_stocks).map(i => i.id)));
            dispatch(checkPriceSettingAction(
                products.filter(i => i.price_mode).map(i => i.id),
                products.reduce((a, i) => (a[i.id] = i.price_mode, a), {})))

        } catch (e) {
            console.log(e.message)
            dispatch(getProductsErrorAction('Error'));
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