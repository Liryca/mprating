export const followingStrategyState = {
    radiobuttons: []
}

export const changeIdReducer = (state = followingStrategyState, { type, payload }) => {
    switch (type) {
        case 'CHANGE_FOLLOWING_STRATEGY': {
            if (!state.activeRadios.includes(payload)) {
                return { ...state, }
            } else {
                return { }
            }
        }
        default:
            return state
    }
}




