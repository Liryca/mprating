export const CHANGE_ACTIVE_CHECKBOX = 'CHANGE_ACTIVE_CHECKBOX';
export const CHANGE_ALL_ACTIVE_CHECKBOXES = 'CHANGE_ALL_ACTIVE_CHECKBOXES';
export const CHECK_ACTIVE_CHECKBOXES = 'CHECK_ACTIVE_CHECKBOXES';
export const DELETE_CHECKBOX = 'DELETE_CHECKBOX';;
export const DELETE_ALL_CHECKBOXES = 'DELETE_ALL_CHECKBOXES'


export const checkBoxesAction = (id, key) => ({
    type: CHANGE_ACTIVE_CHECKBOX,
    id,
    key
})

export const checkBoxesAllAction = (ids, key) => ({
    type: CHANGE_ALL_ACTIVE_CHECKBOXES,
    ids,
    key
})


export const checkCheckBoxesAction = (ids, key) => ({
    type: CHECK_ACTIVE_CHECKBOXES,
    ids,
    key
})


export const deleteCheckBoxdAction=(id,key)=>({
    type: DELETE_CHECKBOX,
    id,
    key
 })
 
 export const deleteAllCheckBoxesdAction= (ids,key) => ({
     type: DELETE_ALL_CHECKBOXES,
     ids,
     key
 })
 