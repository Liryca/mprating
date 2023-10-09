import { CHANGE_POPUP_SETTINGS_STATE, CHANGE_POPUP_SETTINGS_STATE_IDS } from './action';

export const popupSettingsState = {
    active: false,
    activeId: '',
    el: {},
    activeIds: [],
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

        case CHANGE_POPUP_SETTINGS_STATE_IDS: {
            return {
                ...state,
                active: !action.active,
                el: action.elems,
                activeIds: action.ids,

            }
        }
        default:
            return state
    }
}