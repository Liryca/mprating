import { CHANGE_POPUP_CALCULATOR_STATE} from './action';

export const popupCalculatorState = {
    el:{},
    active: false,
    id:'',

}

export const popupCalculator = (state = popupCalculatorState, action) => {
    console.log(action.el)

    switch (action.type) {
        case CHANGE_POPUP_CALCULATOR_STATE: {
            return {
                ...state,
                active: action.active,
                id: action.id,
                el:action.el
            }
        }

        default:
            return state
    }
}