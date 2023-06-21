import { CHANGE_ACTIVE_ALL_PRICE_SETTING, CHANGE_ACTIVE_PRICE_SETTING } from "./action";

export const activePriceSettingState = {
    activeRadios: [],
    activeRadiosWithValue: {},
    all:false
}

export const priceSettingReducer = (state = activePriceSettingState, action) => {
 
    switch (action.type) {

        case CHANGE_ACTIVE_PRICE_SETTING: {
           if (!state.activeRadios.includes(action.id)) {
                return {
                    activeRadios: [...state.activeRadios, action.id],
                    activeRadiosWithValue: { ...state.activeRadiosWithValue, [action.id]: action.key },
                }
            } else {
                return {
                    ...state,
                      activeRadiosWithValue: { ...state.activeRadiosWithValue, [action.id]: action.key },
                }
            }
        }
        
        case CHANGE_ACTIVE_ALL_PRICE_SETTING: {
            if (!state.activeRadiosWithValue.length) {
                return {
                    activeRadios: [...action.ids],
                    activeRadiosWithValue: { ...action.ids.reduce((a, i) => (a[i] = action.key, a), {}) },
                    all:true
                }
            } else {
                return { ...state }
            }

        }
        default:
            return state
    }
}
