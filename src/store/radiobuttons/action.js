export const CHANGE_ACTIVE_RADIOS = 'CHANGE_ACTIVE_RADIOS';
export const CHANGE_ACTIVE_ALL_RADIOS = 'CHANGE_ACTIVE_ALL_RADIOS';
export const CHECK_ACTIVE_RADIOS = 'CHECK_ACTIVE_RADIOS';
export const DELETE_ACTIVE_RADIO = 'DELETE_ACTIVE_RADIO';
export const DELETE_ACTIVE_ALL_RADIOS = 'DELETE_ACTIVE_ALL_RADIOS';


export const radioButtonsAction = (arrayName, objName, id, key) => ({
    type: CHANGE_ACTIVE_RADIOS,
    arrayName,
    objName,
    id,
    key
})

export const radioButtonsAllAction = (arrayName,objName, ids, key) => ({
    type: CHANGE_ACTIVE_ALL_RADIOS,
    arrayName,
    objName,
    ids,
    key
})

export const checkRadioButtonsAction = (arrayName, objName, ids, obj) => ({
    type: CHECK_ACTIVE_RADIOS,
    arrayName,
    objName,
    ids,
    obj
})

export const deleteRadioButtonsAction = (arrayName, objName, id, key) => ({
    type: DELETE_ACTIVE_RADIO,
    arrayName,
    objName,
    id,
    key
})

export const deleteAllRadioButtonsAction = (arrayName, objName, ids, key) => ({
    type: DELETE_ACTIVE_ALL_RADIOS,
    arrayName,
    objName,
    ids,
    key
})