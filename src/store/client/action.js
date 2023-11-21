import {applyPriceSemiAuto, changeStatusModeAuto, getClientInfo } from "../../api/services/client";
export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const GET_CLIENT_INFO = 'GET_CLIENT_INFO';
export const GET_ERROR = 'GET_ERROR';
export const APPLY_PRICE = 'APPLY_PRICE';

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

export const actionApplyPrice= () => ({
    type: APPLY_PRICE

})
// export const errorModeAction = (error) => ({
//     type: GET_ERROR,
//     error
// })

export function applyPriceAcyncAction(mode) {
    return async function (dispatch) {
        try {
            const response = await applyPriceSemiAuto(mode);
            console.log(response);
  
        } catch (e) {
            console.log(e.message)
        }
    }
}

export function changeStatusModeAutoAcyncAction(activeMode) {
    return async function (dispatch) {
        try {
            const response = await changeStatusModeAuto(activeMode);
            dispatch(actionStatusMode(activeMode));
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