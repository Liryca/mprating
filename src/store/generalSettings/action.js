export const CHANGE_GENERAL_SETTINGS_STRATEGY = 'CHANGE_GENERAL_SETTINGS_STRATEGY';

export const changeGeneralSettingsAction = (key, value) => ({
    type: CHANGE_GENERAL_SETTINGS_STRATEGY,
    key,
    value
})
