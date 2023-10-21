export const CHANGE_POPUP_STATE = 'CHANGE_POPUP_STATE';
export const CHANGE_POPUP_INPUT_STATE = 'CHANGE_POPUP_INPUT_STATE';


export const changePopupShow = (show,id,el) => ({
    type: CHANGE_POPUP_STATE,
    show,
    id,
    el
})

export const changePopupInputShow = (inputShow) => ({
    type: CHANGE_POPUP_INPUT_STATE,
    inputShow,
 
})
