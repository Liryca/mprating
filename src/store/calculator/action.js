export const CHANGE_POPUP_CALCULATOR_STATE = 'CHANGE_POPUP_CALCULATOR_STATE';

export const changePopupCalculatorShow = (active, id,el) => ({
    type: CHANGE_POPUP_CALCULATOR_STATE,
    active,
    id,
    el
})


