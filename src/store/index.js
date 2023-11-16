import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { clientInfoReducer } from "./client/reducer";
import { popupSettingStrategiesReducer } from "./popupSettingStrategies/reducer";
import { productsReducer } from "./products/reducer";
import { apiKeyReducer } from "./apiKey/reducer";
import { paginationReducer } from "./pagination/reducer";
import { popupSettingsPriceReducer } from "./popupSettingsPrice/reducer";

const allReducers = combineReducers({
    products: productsReducer,
    clientInfo: clientInfoReducer,
    popupSettingStrategies: popupSettingStrategiesReducer,
    apiKey: apiKeyReducer,
    pagination: paginationReducer,
    popupSettingsPrice: popupSettingsPriceReducer,


})


const rootReducer = (state, action) => {
    if (action.type === "RESET_APP") {
        state = undefined
    }
    return allReducers(state, action)
}

export const store = createStore(rootReducer, applyMiddleware(thunk));