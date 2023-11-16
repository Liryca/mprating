import { changeMode, changeStatusMode, getClientInfo } from "../../api/services/client";
import { getProductsThunk } from "../products/action";
export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const GET_CLIENT_INFO = 'GET_CLIENT_INFO';

export const actionMode = (mode) => ({
    type: CHANGE_MODE,
    mode,
})

export const actionStatusMode = (status) => ({
    type: CHANGE_STATUS,
    status
})

export const actionClientInfo = (client) => ({
    type: GET_CLIENT_INFO,
    client

})



export function changeModeAcyncAction() {
    return async function (dispatch, getState) {
        const { modeType } = getState().clientInfo
        try {
            const response = await changeMode(modeType === 'AUTO' ? "SEMI_AUTO" : "AUTO");
            dispatch(actionMode(modeType === 'AUTO' ? "SEMI_AUTO" : "AUTO"));
            dispatch(changeStatusAcyncAction(false));
            // dispatch(getProductsThunk());

        } catch (e) {
            console.log(e.message)
        }
    }
}

export function changeStatusAcyncAction(activeMode) {
    return async function (dispatch, getState) {
        // const {activeMode} = getState().clientInfo
        try {
            const response = await changeStatusMode(activeMode);
            dispatch(actionStatusMode(activeMode));
            // dispatch(getProductsThunk());

        } catch (e) {
            console.log(e.message)
        }
    }
}


export function getClientInfoAcyncAction() {
    return async function (dispatch, getState) {
        try {
            const response = await getClientInfo();
           dispatch(actionClientInfo(response.data))
    
        } catch (e) {
            console.log(e.message)
        }
    }
}