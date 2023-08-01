import { GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_LOADING, CHANGE_PRODUCT, CHANGE_GROUP_PRODUCTS, DELETE__CHANGED_PRODUCT } from "./action";

export const productsState = {
    productList: [],
    placeholder:'',
    loading: true,
    error: null,
    totalProducts: 0,
    changedProducts:[],

    currentProductGroup: []
}

export const productsReducer = (state = productsState, action) => {
    switch (action.type) {


        case DELETE__CHANGED_PRODUCT:
return{
    ...state,
    changedProducts:[...state.changedProducts.filter(i=>i!==action.id)]
}
   
        case CHANGE_PRODUCT:
            return{
                ...state,
                productList: [...state.productList.map(product => product.id === action.id ? { ...product, [action.field]:action.value }:product)],
                changedProducts:state.changedProducts.includes(action.id)? [...state.changedProducts] : [...state.changedProducts,action.id]
            }

            case CHANGE_GROUP_PRODUCTS:
                return{
                    ...state,
                    productList: [...state.productList.map(product =>action.ids.includes(product.id) ? { ...product, [action.key]: action.value } : product)],
                    changedProducts: [...action.ids]
                }

        case GET_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
                currentProductGroup: []
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                error: null,
                // productList: [...state.productList, ...action.productList.filter(elem => !state.productList.includes(elem))],
                productList:[...action.productList],
                loading: false,
                totalProducts: action.totalProducts,
                placeholder:action.placeholder,
                currentProductGroup: [...state.currentProductGroup, ...action.productList.slice(state.fromProducts, state.toProducts).map(i => i.id)]
            }
        case GET_PRODUCTS_ERROR:
            return {error: action.error, productList: [], loading: false, currentProductGroup: [], toProducts:0, placeholder:''}

        default: return state
    }
}