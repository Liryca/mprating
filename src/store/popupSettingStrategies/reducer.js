import { CHANGE_INPUT_STATE, CHANGE_POPUP_SETTING_STRATEGIES_STATE} from './action';

export const popupSettingStrategiesState = {
    show: false,
    inputShow:false,
    el: {},
}

export const popupSettingStrategiesReducer = (state = popupSettingStrategiesState, action) => {

    switch (action.type) {
        case CHANGE_POPUP_SETTING_STRATEGIES_STATE: {
            return {
                ...state,
                show: !action.show,
                el:action.el
            }
        }
            
        case CHANGE_INPUT_STATE:{
            return{
                ...state,
                inputShow:!action.inputShow
        }
    }
        default:
            return state
    }
}