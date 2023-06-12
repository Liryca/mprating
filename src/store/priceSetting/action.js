export const priceSettingAction = (id,dataLength,key) => ({
    type: 'CHANGE_ACTIVE_PRICE_SETTING',
    id,
    dataLength,
    key
})

export const priceAllSettingAction = (ids,dataLength,key) => ({
    type: 'CHANGE_ACTIVE_ALL_PRICE_SETTING',
    ids,
    dataLength,
    key

})


