export const CHANGE_ACTIVE_PRICE_SETTING = 'CHANGE_ACTIVE_PRICE_SETTING';
export const CHANGE_ACTIVE_ALL_PRICE_SETTING = 'CHANGE_ACTIVE_ALL_PRICE_SETTING';
export const CHECK_PRICE_SETTING = 'CHECK_PRICE_SETTING';
export const DELETE_ACTIVE_PRICE_SETTING = 'DELETE_ACTIVE_PRICE_SETTING';
export const DELETE_ALL_ACTIVE_PRICE_SETTING = 'DELETE_ALL_ACTIVE_PRICE_SETTING';


export const priceSettingAction = (id, key) => ({
    type: CHANGE_ACTIVE_PRICE_SETTING,
    id,
    key
})

export const priceAllSettingAction = (ids, key) => ({
    type: CHANGE_ACTIVE_ALL_PRICE_SETTING,
    ids,
    key
})

export const checkPriceSettingAction = (ids, obj) => ({
    type: CHECK_PRICE_SETTING,
    ids,
    obj
})

export const deletePriceSettingAction = (id,key) => ({
    type: DELETE_ACTIVE_PRICE_SETTING,
    id,
    key
})

export const deletAllPriceSettingAction = (ids, key) => ({
    type: DELETE_ALL_ACTIVE_PRICE_SETTING,
    ids,
    key
})