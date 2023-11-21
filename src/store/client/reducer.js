import { CHANGE_STATUS, CHANGE_MODE, GET_CLIENT_INFO, APPLY_PRICE,GET_ERROR } from "./action"

export const clientInfo = {
    modeType: 'AUTO'
}

export const clientInfoReducer = (state = clientInfo, action) => {

    switch (action.type) {

        case GET_CLIENT_INFO: {
            return { ...action.client, ...clientInfo }
        }

        case CHANGE_MODE: {
            return { ...state, modeType: action.mode }
        }
        case CHANGE_STATUS: {
            return { ...state, activeMode: action.status }
        }
        case APPLY_PRICE: {
            return { ...state, activeMode: action.status }
        }

        // case GET_ERROR: {
        //     return {
        //         ...state,
        //         error:action.error
        //     }
        //     }


        default:
            return state;
    }
}