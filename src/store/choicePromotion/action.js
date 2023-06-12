export const promotionAction = (id, dataLength) => ({
    type: 'CHANGE_ACTIVE_PROMOTION',
    id,
    dataLength
})

export const promotionAllAction = (ids,dataLength) => ({
    type: 'CHANGE_ALL_ACTIVE_PROMOTION',
    ids,
    dataLength
})



