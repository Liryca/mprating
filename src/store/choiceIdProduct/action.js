export const CHANGE_ACTIVE_ID = 'CHANGE_ACTIVE_ID';
export const CHANGE_ALL_ACTIVE_IDS = 'CHANGE_ALL_ACTIVE_IDS';
export const CHECK_ACTIVE_IDS = 'CHECK_ACTIVE_IDS '


export const activeUsedIdAction = (id) => ({
    type: CHANGE_ACTIVE_ID,
    payload: id,

})

export const activeAllUsedIdAction = (ids) => ({
    type: CHANGE_ALL_ACTIVE_IDS,
    payload: ids,
})


export const checkActiveIdsAction = (ids) => ({
    type: CHECK_ACTIVE_IDS,
    payload: ids,
})


