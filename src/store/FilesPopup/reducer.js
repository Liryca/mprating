import { CHANGE_POPUP_FILES_STATE } from './action';

export const popupFilesState = {
    active: false,

}

export const popupFilesReducer = (state = popupFilesState, action) => {

    switch (action.type) {
        case CHANGE_POPUP_FILES_STATE: {
            return {
                ...state,
                active: action.active,
            }
        }

        default:
            return state
    }
}