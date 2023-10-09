import { changeMode } from "../../api/services/mode";
export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_STATUS = 'CHANGE_STATUS';

export const actionMode = (str, auto) => ({
    type: CHANGE_MODE,
    str,
    auto

})

export const actionStatusMode = () => ({
    type: CHANGE_STATUS,
})

export function changeModeAcyncAction(str) {
    return async function (dispatch, getState) {
    const id =   getState().auth.id
        try {
            // const response = await changeMode(id, str === 'automat' ? true : false);
            // console.log(response.data)
            dispatch(actionMode(str, str === 'automat' ? true : false))
        } catch (e) {
            console.log(e.message)
        }
    }
}