import { CHANGE_STATUS, CHANGE_MODE, GET_CLIENT_INFO, APPLY_PRICE, GET_ERROR, LOAD } from "./action"

export const clientInfo = {
    user: {},
    modeType: "AUTO",
    isLoading: false,
    error: null
}

export const clientInfoReducer = (state = clientInfo, action) => {

    switch (action.type) {

        case GET_CLIENT_INFO: {
            return {
                ...state,
                user: action.client
            }
        }

        case CHANGE_MODE: {
            return {
                ...state,
                modeType: action.mode
            }
        }
        case CHANGE_STATUS: {
            return { ...state, user: { ...state.user, activeMode: action.status } }
        }

        case LOAD: {
            return { ...state, isLoading: action.isLoading }
        }

        default: return state;
    }
}