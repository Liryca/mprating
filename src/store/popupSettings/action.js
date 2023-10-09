export const CHANGE_POPUP_SETTINGS_STATE = 'CHANGE_POPUP_SETTINGS_STATE';
export const CHANGE_POPUP_SETTINGS_STATE_IDS = 'CHANGE_POPUP_SETTINGS_STATE_IDS';

export const changePopupSettingsShow = (active,id,el) => ({
    type: CHANGE_POPUP_SETTINGS_STATE,
    active,
    id,
    el
})



export const changePopupSettingsShowIds=(active,ids,elems) => ({
    type: CHANGE_POPUP_SETTINGS_STATE_IDS,
    active,
    ids,
    elems
})


