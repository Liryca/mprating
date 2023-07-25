export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';
export const CHANGE_GROUP_PRODUCT = 'CHANGE_GROUP_PRODUCT';

export const changeProductAction = (id,product)=>({
    type:CHANGE_PRODUCT,
    product

})


export const changeGroupProductAction = (ids, products) => ({
    type: CHANGE_GROUP_PRODUCT,
    products
})



export function changeProductThunk(id) {

    return async function (dispatch, getState) {
        try {
            const products = getState().products;
        } catch (e) {


        }
    }
}





