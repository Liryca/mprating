export const CHANGE_ACTIVE_PROMOTION = 'CHANGE_ACTIVE_PROMOTION';
export const CHANGE_ALL_ACTIVE_PROMOTION = 'CHANGE_ALL_ACTIVE_PROMOTION';

export const promotionAction = (id) => ({
    type: CHANGE_ACTIVE_PROMOTION,
    payload: id

})

export const promotionAllAction = (ids) => ({
    type: CHANGE_ALL_ACTIVE_PROMOTION,
    payload: ids,

})



