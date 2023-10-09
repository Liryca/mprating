import {
    CHANGE_ACTIVE_ALL_RADIOS,
    CHANGE_ACTIVE_RADIOS,
    CHECK_ACTIVE_RADIOS,
    DELETE_ACTIVE_RADIO,
    DELETE_ACTIVE_ALL_RADIOS
}
    from "./action";

export const radioButtonsState = {
    afterEndPromotionRadios: [],
    afterEndPromotionRadiosWithValue: {},
    strategyRadios: [],
    strategyRadiosWithValue: {},
    priceSettingRadios: [],
    priceRadiosWithValue:{}
}

export const radioButtonsReducer = (state = radioButtonsState, action) => {

    switch (action.type) {

        case CHANGE_ACTIVE_RADIOS: {
            if (!state[action.arrayName].includes(action.id)) {
                return {
                    ...state,
                    [action.arrayName]: [...state[action.arrayName], action.id],
                    [action.objName]: { ...state[action.objName], [action.id]: action.key },
                }
            } else {
                return {
                    ...state,
                    [action.objName]: { ...state[action.objName], [action.id]: action.key },
                }
            }
        }

        case CHANGE_ACTIVE_ALL_RADIOS: {
            if (!state[action.arrayName].filter(elem => action.ids.includes(elem)).length) {
                return {
                    ...state,
                    [action.arrayName]: [...action.ids, ...state[action.arrayName]],
                    [action.objName]: { ...state[action.objName], ...action.ids.reduce((a, i) => (a[i] = action.key, a), {}) },
                }
            } else {
                return {
                    ...state,
                    [action.arrayName]: [...action.ids],
                    [action.objName]: { ...state[action.objName], ...action.ids.reduce((a, i) => (a[i] = action.key, a), {}) },
                }
            }
        }

        case CHECK_ACTIVE_RADIOS: {
            return { ...state,[action.arrayName]: [...action.ids], [action.objName]:action.obj }
        }

        case DELETE_ACTIVE_RADIO: {
            return {
                ...state,
                [action.arrayName]: state[action.arrayName].filter(i => i !== action.id),
                [action.objName]: { ...state[action.objName], [action.id]: action.key }
            }
        }

        case DELETE_ACTIVE_ALL_RADIOS: {
            return {
                ...state,
                [action.arrayName]: [],
                [action.objName]: { ...state[action.objName], ...action.ids.reduce((a, i) => (a[i] = action.key, a), {}) },
            }
        }

        default:
            return state
    }
}
