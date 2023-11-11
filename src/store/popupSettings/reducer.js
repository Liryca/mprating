import { CHANGE_POPUP_SETTINGS_STATE} from './action';

export const popupSettingsState = {
    active: false,
    el: {},

}

export const popupSettingsReducer = (state = popupSettingsState, action) => {

    switch (action.type) {
        case CHANGE_POPUP_SETTINGS_STATE: {
            return {
                ...state,
                active: !action.active,
                el:action.el
            }
        }

        default:
            return state
    }
}