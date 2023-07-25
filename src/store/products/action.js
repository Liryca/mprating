import { fetchProducts, fn } from '../../api/services/product';
import { checkActiveIdsAction } from '../choiceIdProduct/action';
import { checkPromotionAction } from '../choicePromotion/action';
import { checkPriceSettingAction } from '../priceSetting/action';


export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCT_ERROR';
export const GET_PRODUCTS_LOADING = 'GET_PRODUCT_LOADING';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT'


export const getProductsSuccessAction = (productList) => ({
    type: GET_PRODUCTS_SUCCESS,
    productList

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

export function getProductsThunk(id) {

    return async function (dispatch, getState) {
        dispatch(getProductsLoading());
        try {
            // const response = await fetchProducts(id);
            // console.log(response)
            // const{products} = response.data;
            // console.log(response.data,'product')
            const products = getState().products;
            const response = fn(products.page, products.perPage)
            // console.log(response)
            dispatch(getProductsSuccessAction(response));
            dispatch(checkActiveIdsAction(response.filter(i => i.used).map(i => i.id)));
            dispatch(checkPromotionAction(response.filter(i => i.promotion).map(i => i.id)));
            dispatch(checkPriceSettingAction(
            response.filter(i => i.setPrice).map(i => i.id),
            response.reduce((a, i) => (a[i.id] = i.setPrice, a), {})))

        } catch (e) {

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