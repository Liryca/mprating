import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { clientInfoReducer } from "./client/reducer";
import { popupSettingStrategiesReducer } from "./popupSettingStrategies/reducer";
import { productsReducer } from "./products/reducer";
import { apiKeyReducer } from "./apiKey/reducer";
import { paginationReducer } from "./pagination/reducer";
import { popupSettingsPriceReducer } from "./popupSettingsPrice/reducer";
import { oneProductReducer } from "./oneProduct/reducer";
import { popupCalculator } from "./calculator/reducer";
import { notificationsReducer } from "./notifications/reducer";
import { popupFilesReducer } from "./FilesPopup/reducer";

const allReducers = combineReducers({
    products: productsReducer,
    clientInfo: clientInfoReducer,
    popupSettingStrategies: popupSettingStrategiesReducer,
    apiKey: apiKeyReducer,
    pagination: paginationReducer,
    popupSettingsPrice: popupSettingsPriceReducer,
    oneProduct: oneProductReducer,
    calculator: popupCalculator,
    popupFiles: popupFilesReducer ,
    notifications:notificationsReducer
})


const rootReducer = (state, action) => {
    if (action.type === "RESET_APP") {
        state = undefined
    }
    return allReducers(state, action)
}

export const store = createStore(rootReducer, applyMiddleware(thunk));