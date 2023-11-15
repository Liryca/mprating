import { CHANGE_STATUS, CHANGE_MODE } from "./action"

export const modeState = {
    autoMode: true,
    status: true
}

export const modeReducer = (state = modeState, action) => {

    switch (action.type) {
        case CHANGE_MODE: {
            return { ...state, auto: !state.autoMode }
        }
        case CHANGE_STATUS: {
            return { ...state, status: !state.status}
        }
        default:
            return state;
    }
}