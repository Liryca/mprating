import { CHANGE_ACTIVE_CHECKBOX, CHANGE_ALL_ACTIVE_CHECKBOXES, CHECK_ACTIVE_CHECKBOXES, DELETE_ALL_CHECKBOXES, DELETE_CHECKBOX } from "./action"

const checkBoxesState = {
    promotionCheckBoxes: [],
    useInAutoModeCheckBoxes: [],
    strategyCheckBoxes: [],
    followingStrategyCheckBoxes: [],
    generalsettingsCheckBoxes:[]
}

export const checkBoxesReducer = (state = checkBoxesState, action) => {

    switch (action.type) {
        case CHANGE_ACTIVE_CHECKBOX: {
            if (!state[action.key].includes(action.id)) {
                return { ...state, [action.key]: [...state[action.key], action.id], }
            } else {
                return { ...state, [action.key]: state[action.key].filter(i => i !== action.id) }
            }
        }
        case CHANGE_ALL_ACTIVE_CHECKBOXES: {
            if (state[action.key].filter(elem => action.ids.includes(elem)).length) {
                return { ...state, [action.key]: [...state[action.key].filter(e => !action.ids.includes(e))] }
            } else {
                return { ...state, [action.key]: [...state[action.key], ...action.ids] }
            }
        }

        case CHECK_ACTIVE_CHECKBOXES: {
            return { ...state, [action.key]: [...action.ids] }
        }

        case DELETE_CHECKBOX: {
            return { ...state, [action.key]: state[action.key].filter(i => i !== action.id) }
        }
        case DELETE_ALL_CHECKBOXES: {
            return { ...state, [action.key]: [] }
        }
        default: return state
    }
}

