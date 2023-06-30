export const CHANGE_ACTIVE_ID = 'CHANGE_ACTIVE_ID';
export const CHANGE_ALL_ACTIVE_ID = 'CHANGE_ALL_ACTIVE_ID';


export const activeUsedIdAction = (id) => ({
    type: CHANGE_ACTIVE_ID,
    payload: id,

})

export const activeAllUsedIdAction = (ids) => ({
    type: CHANGE_ALL_ACTIVE_ID,
    payload: ids,
})



