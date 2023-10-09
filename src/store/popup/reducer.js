import { CHANGE_POPUP_STATE,CHANGE_POPUP_INPUT_STATE, CHANGE_POPUP_STATE_IDS} from './action';

export const popupState = {
    show: false,
    activeId:'',
    inputShow:false,
    el: {},
    activeIds: [],
}

export const popupReducer = (state = popupState, action) => {

    switch (action.type) {
        case CHANGE_POPUP_STATE: {
            return {
                ...state,
                show: !action.show,
                activeId: action.id,
                el:action.el
            }
        }
            
        case CHANGE_POPUP_STATE_IDS: {
            return {
                ...state,
                show: !action.show,
                el: action.elems,
                activeIds: action.ids,

            }
        }    
            
        case CHANGE_POPUP_INPUT_STATE:{
            return{
                ...state,
                inputShow:!action.inputShow
        }
    }
        default:
            return state
    }
}