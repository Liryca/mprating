export const CHANGE_POPUP_SETTING_STRATEGIES_STATE = 'CHANGE_POPUP_SETTING_STRATEGIES_STATE ';
export const CHANGE_INPUT_STATE = 'CHANGE_INPUT_STATE';


export const changePopupSettingStrategiesShow = (show, id) => ({
    type: CHANGE_POPUP_SETTING_STRATEGIES_STATE,
    show,
    id
})

export const changeInputShow = (inputShow) => ({
    type: CHANGE_INPUT_STATE,
    inputShow,
 
})
