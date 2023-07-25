import { CHANGE_ACTIVE_ALL_PRICE_SETTING, CHANGE_ACTIVE_PRICE_SETTING, CHECK_PRICE_SETTING } from "./action";

export const activePriceSettingState = {
    activeRadios: [],
    activeRadiosWithValue: {}
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
            if (!state.activeRadios.filter(elem => action.ids.includes(elem)).length) {
                return {
                    activeRadios: [...action.ids, ...state.activeRadios],
                    activeRadiosWithValue: {...state.activeRadiosWithValue, ...action.ids.reduce((a, i) => (a[i] = action.key, a), {}) },
                }
            } else {
                return {...state, activeRadiosWithValue: { ...state.activeRadiosWithValue, ...action.ids.reduce((a, i) => (a[i] = action.key, a), {}) }, }
            }
        }

        case CHECK_PRICE_SETTING:{
            return { activeRadios: [...action.ids], activeRadiosWithValue:action.obj }
        }
        default:
            return state
    }
}
