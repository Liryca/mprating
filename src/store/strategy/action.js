import { changeMode } from "../../api/services/srategy";
export const CHANGE_STRATEGY = 'CHANGE_STRATEGY';
export const CHANGE_STATUS = 'CHANGE_STATUS';

export const actionStrategy = (str, auto) => ({
    type: CHANGE_STRATEGY,
    str,
    auto

})

export const actionStatusStrategy = (status) => ({
    type: CHANGE_STATUS,
    status
})

export function changeModeAcyncAction(str) {
    return async function (dispatch, getState) {
        try {
            const response = await changeMode('3', str === 'automat' ? true : false);
            console.log(response.data)
            dispatch(actionStrategy(str, str === 'automat' ? true : false))
        } catch (e) {
            console.log(e.message)
        }
    }
}