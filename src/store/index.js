import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { modeReducer } from "./mode/reducer";
import { popupReducer } from "./popup/reducer";
import { productsReducer } from "./products/reducer";
import { apiKeyReducer } from "./apiKey/reducer";
import { paginationReducer } from "./pagination/reducer";
import { checkBoxesReducer } from "./checkBoxes/reducer";
import { radioButtonsReducer } from "./radiobuttons/reducer";
import { popupSettingsReducer } from "./popupSettings/reducer";
import { articlesReducer } from "./articles/reduce";

const allReducers = combineReducers({
    products: productsReducer,
    activeMode: modeReducer ,
    popup: popupReducer,
    apiKey:apiKeyReducer,
    pagination: paginationReducer,
    checkBoxes: checkBoxesReducer,
    radioButtons: radioButtonsReducer,
    popupSettings: popupSettingsReducer,
    articles:articlesReducer

})


const rootReducer = (state,action)=>{
    if(action.type === "RESET_APP"){
        state =undefined
    }
    return allReducers(state, action)
}

export const store = createStore(rootReducer,applyMiddleware(thunk));