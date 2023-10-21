import { CHANGE_POPUP_SETTINGS_STATE, CHANGE_POPUP_SETTINGS_STATE_IDS } from './action';

export const popupSettingsState = {
    active: false,
    activeId: '',
    el: {},

}

export const popupSettingsReducer = (state = popupSettingsState, action) => {

    switch (action.type) {
        case CHANGE_POPUP_SETTINGS_STATE: {
            return {
                ...state,
                active: !action.active,
                activeId: action.id,
                el:action.el
            }
        }

        default:
            return state
    }
}