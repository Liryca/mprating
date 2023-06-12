import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {profilReducer} from './profil/reducer'
import { changeIdReducer } from './choiceIdProduct/reducer';
import {enteredValuesReducer} from './enteredValues/reducer'
import { strategyReducer } from "./strategy/reducer";
import { popupReducer } from "./popup/reducer";
import { promotionReducer } from "./choicePromotion/reducer";
import { priceSettingReducer } from "./priceSetting/reducer";
import { productsReducer } from "./products/reducer";
import { authorizationReducer } from "./auth/reducer";

const rootReducer = combineReducers({
    auth: authorizationReducer,
    products: productsReducer,
    activeId:changeIdReducer,
    activeStrategy: strategyReducer,
    enteredValues:enteredValuesReducer,
    promotion: promotionReducer,
    priceSetting: priceSettingReducer ,
    popup: popupReducer,
    profil: profilReducer,
 
})

export const store = createStore(rootReducer,applyMiddleware(thunk));