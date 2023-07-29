export const CHANGE_ACTIVE_PROMOTION = 'CHANGE_ACTIVE_PROMOTION';
export const CHANGE_ALL_ACTIVE_PROMOTION = 'CHANGE_ALL_ACTIVE_PROMOTION';
export const CHECK_PROMOTION = 'CHECK_PROMOTION';

export const promotionAction = (id) => ({
    type: CHANGE_ACTIVE_PROMOTION,
    payload: id

})

export const promotionAllAction = (ids) => ({
    type: CHANGE_ALL_ACTIVE_PROMOTION,
    payload: ids,

})


export const checkPromotionAction = (ids) => ({
    type: CHECK_PROMOTION,
    payload: ids,

})
