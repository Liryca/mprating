export const CHANGE_POPUP_STATE = 'CHANGE_POPUP_STATE';
export const CHANGE_POPUP_INPUT_STATE = 'CHANGE_POPUP_INPUT_STATE';

export const changePopupShow = (show,id) => ({
    type: CHANGE_POPUP_STATE,
    show,
    id
})


export const changePopupInputShow = (inputShow) => ({
    type: CHANGE_POPUP_INPUT_STATE,
    inputShow,
 
})
