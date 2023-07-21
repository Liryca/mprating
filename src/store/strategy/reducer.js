import { CHANGE_STATUS, CHANGE_STRATEGY } from "./action"

export const strategyState = {
    strategy: 'automat',
    auto: true,
    status: 'start'
}

export const strategyReducer = (state = strategyState, action) => {

    switch (action.type) {
        case CHANGE_STRATEGY: {
            return { ...state, strategy: action.str, auto: !state.auto }
        }
        case CHANGE_STATUS: {
            return { ...state, status: action.status}
        }
        default:
            return state;
    }
}