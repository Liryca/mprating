import { CHANGE_STATUS, CHANGE_MODE, GET_CLIENT_INFO, GET_ERROR } from "./action"

export const clientInfo = {}

export const clientInfoReducer = (state = clientInfo, action) => {

    switch (action.type) {

        case GET_CLIENT_INFO: {
            return {...action.client}
        }


        case CHANGE_MODE: {
            return { ...state, modeType: action.mode }
        }
        
        case GET_ERROR: {
            return {
                ...state,
                error:action.error
            }
            }
            
        case CHANGE_STATUS: {
            return { ...state, activeMode: action.status}
        }
        default:
            return state;
    }
}