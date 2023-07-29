
const enteredValuesState = {
};

export function enteredValuesReducer(state = enteredValuesState, action) {
    switch (action.type) {

        case 'CHANGE_VAlUE':
            return {
                ...state,
                [action.id]: { ...state[action.id], [action.key]: action.value },
            }
        default: return state
    }
}