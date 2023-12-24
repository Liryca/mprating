export const CHANGE_POPUP_FILES_STATE = 'CHANGE_POPUP_FILES_STATE';
export const GET_ALL_FILES = 'GET_ALL_FILES ';


export const changePopupFilesState = (active) => ({
    type: CHANGE_POPUP_FILES_STATE,
    active,
})

export const getFiles = (array) => ({
    type: GET_ALL_FILES,
    array
})


export function getFilesThunk() {
    return async function (dispath, getState){
        
    }
}
