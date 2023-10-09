export const CHANGE_POPUP_STATE = 'CHANGE_POPUP_STATE';
export const CHANGE_POPUP_STATE_ALL = 'CHANGE_POPUP_STATE_ALL';
export const CHANGE_POPUP_INPUT_STATE = 'CHANGE_POPUP_INPUT_STATE';
export const CHANGE_POPUP_STATE_IDS = 'CHANGE_POPUP_STATE_IDS';

export const changePopupShow = (show,id,el) => ({
    type: CHANGE_POPUP_STATE,
    show,
    id,
    el
})



export const changePopupShowIds=(show,ids,elems) => ({
    type: CHANGE_POPUP_STATE_IDS,
    show,
    ids,
    elems
})


export const changePopupInputShow = (inputShow) => ({
    type: CHANGE_POPUP_INPUT_STATE,
    inputShow,
 
})
