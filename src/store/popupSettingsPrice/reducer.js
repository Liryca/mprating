import { CHANGE_POPUP_SETTINGS_PRICE_STATE} from './action';

export const popupSettingsPriceState = {
    active: false,
    id: '',
}

export const popupSettingsPriceReducer = (state = popupSettingsPriceState, action) => {

    switch (action.type) {
        case CHANGE_POPUP_SETTINGS_PRICE_STATE: {
            return {
                ...state,
                active: action.active,
                id: action.id,
            }
        }

        default:
            return state
    }
}