export const CHANGE_USE_IN_AUTO_MOOD_ID = 'CHANGE_USE_IN_AUTO_MOOD_ID';
export const CHANGE_ALL_USE_IN_AUTO_MOOD_IDS = 'CHANGE_ALL_USE_IN_AUTO_MOOD_IDS';
export const CHECK_USE_IN_AUTO_MOOD_IDS = 'CHECK_USE_IN_AUTO_MOOD_IDS';
export const DELETE_USE_IN_AUTO_MOOD_ID ='DELETE_USE_IN_AUTO_MOOD_ID';
export const DELETE_ALL_USE_IN_AUTO_MOOD_ID = 'DELETE_ALL_USE_IN_AUTO_MOOD_ID';


export const usedIdAction = (id) => ({
 
    type: CHANGE_USE_IN_AUTO_MOOD_ID,
    payload: id,
})


export const allUsedIdsAction = (ids) => ({
    type: CHANGE_ALL_USE_IN_AUTO_MOOD_IDS,
    payload: ids,
})


export const checkUsedIdsAction = (ids) => ({
    type: CHECK_USE_IN_AUTO_MOOD_IDS,
    payload: ids,
})


export const deleteUsedIdAction=(id)=>({
   type: DELETE_USE_IN_AUTO_MOOD_ID,
   payload:id
})

export const deleteAllUsedIdAction = (ids) => ({
    type: DELETE_ALL_USE_IN_AUTO_MOOD_ID,
    payload: ids
})

