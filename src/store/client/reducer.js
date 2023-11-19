import { CHANGE_STATUS, CHANGE_MODE, GET_CLIENT_INFO } from "./action"

export const clientInfo = {}

export const clientInfoReducer = (state = clientInfo, action) => {

    switch (action.type) {

        case GET_CLIENT_INFO: {
            return {...action.client}
        }


        case CHANGE_MODE: {
            return { ...state, modeType: action.mode }
        }
        case CHANGE_STATUS: {
            return { ...state, activeMode: action.status}
        }
        default:
            return state;
    }
}