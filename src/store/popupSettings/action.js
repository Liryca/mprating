export const CHANGE_POPUP_SETTINGS_STATE = 'CHANGE_POPUP_SETTINGS_STATE';

export const changePopupSettingsShow = (active,id,el) => ({
    type: CHANGE_POPUP_SETTINGS_STATE,
    active,
    id,
    el
})


