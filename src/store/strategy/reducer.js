export const strategyState = {
    strategy: 'automat',
    load:false,
    status:'start'
}

export const strategyReducer = (state = strategyState, action) => {

    switch (action.type) {
        case 'CHANGE_STRATEGY': {
            return {
                ...state,
                strategy: action.str
            }
        }
        case 'CHANGE_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }


        default:
            return state
    }
}