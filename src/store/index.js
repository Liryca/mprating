import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { modeReducer } from "./mode/reducer";
import { popupSettingStrategiesReducer } from "./popupSettingStrategies/reducer";
import { productsReducer } from "./products/reducer";
import { apiKeyReducer } from "./apiKey/reducer";
import { paginationReducer } from "./pagination/reducer";
import { popupSettingsPriceReducer } from "./popupSettingsPrice/reducer";
import { articlesReducer } from "./articles/reduce";

const allReducers = combineReducers({
    products: productsReducer,
    activeMode: modeReducer ,
    popupSettingStrategies: popupSettingStrategiesReducer,
    apiKey:apiKeyReducer,
    pagination: paginationReducer,
    popupSettingsPrice: popupSettingsPriceReducer,
    articles:articlesReducer

})


const rootReducer = (state,action)=>{
    if(action.type === "RESET_APP"){
        state =undefined
    }
    return allReducers(state, action)
}

export const store = createStore(rootReducer,applyMiddleware(thunk));