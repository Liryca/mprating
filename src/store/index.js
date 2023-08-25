import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {profileReducer} from './profile/reducer'
import { changeUsedIdReducer } from './useInAutoMode/reducer';
import { strategyReducer } from "./strategy/reducer";
import { popupReducer } from "./popup/reducer";
import { promotionReducer } from "./promotion/reducer";
import { priceSettingReducer } from "./priceSetting/reducer";
import { productsReducer } from "./products/reducer";
import { authorizationReducer } from "./auth/reducer";
import { apiKeyReducer } from "./apiKey/reducer";
import { paginationReducer } from "./pagination/reducer";

const allReducers = combineReducers({
    auth: authorizationReducer,
    products: productsReducer,
    usedProduct: changeUsedIdReducer,
    activeStrategy: strategyReducer,
    promotion: promotionReducer,
    priceSetting: priceSettingReducer ,
    popup: popupReducer,
    profile: profileReducer,
    apiKey:apiKeyReducer,
    pagination:paginationReducer
})


const rootReducer = (state,action)=>{
    if(action.type === "RESET_APP"){
        state =undefined
    }
    return allReducers(state, action)
}

export const store = createStore(rootReducer,applyMiddleware(thunk));