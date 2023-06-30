import { CHANGE_STATUS, CHANGE_STRATEGY } from "./action"

export const strategyState = {
    strategy: 'automat',
    status:'start'
}

export const strategyReducer = (state = strategyState, {type,payload}) => {

    switch (type) {
        case CHANGE_STRATEGY: {
            return {
                ...state,
                strategy: payload
            }
        }
        case CHANGE_STATUS: {
            return {
                ...state,
                status: payload
            }
        }


        default:
            return state;
    }
}