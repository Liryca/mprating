import { changeMode } from "../../api/services/mode";
import { getProductsThunk } from "../products/action";
export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_STATUS = 'CHANGE_STATUS';

export const actionMode = () => ({
    type: CHANGE_MODE,
})

export const actionStatusMode = () => ({
    type: CHANGE_STATUS,
})

export function changeModeAcyncAction() {
    return async function (dispatch, getState) {
       const {autoMode} = getState().activeMode
        try {
            const response = await changeMode(!autoMode ? true : false);
            dispatch(actionMode());
            dispatch(getProductsThunk());
        
        } catch (e) {
            console.log(e.message)
        }
    }
}