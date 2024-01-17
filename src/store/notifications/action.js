import { getNotificationsAxios } from "../../api/services/notification";

export const GET_ALL_NOTIFICATIONS = 'GET_ALL_NOTIFICATIONS';
export const LOADING_NOTIFICATIONS = 'LOADING_NOTIFICATIONS';
export const ERROR_NOTIFICATIONS = 'ERROR_NOTIFICATIONS';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';

export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';


export const notificationsAction = (notifications) => ({
    type: GET_ALL_NOTIFICATIONS,
    notifications
})

export const notificationsLoadingAction = (load) => ({
    type: LOADING_NOTIFICATIONS,
    load
})

export const notificationsErrorAction = (error) => ({
    type: ERROR_NOTIFICATIONS,
    error
})

export const showNotificationsAction = (show) => ({
    type: SHOW_NOTIFICATIONS,
    show
})




export function getNotificationsAcyncAction() {
    return async function (dispatch, getState) {
        notificationsLoadingAction(true)
        try {
            const response = await getNotificationsAxios();
            dispatch(notificationsAction(response.data.content))

        } catch (e) {
            console.log(e.message)
            dispatch(notificationsErrorAction(e.message))
        } finally {
            notificationsLoadingAction(false)
        }
    }
}

// export const notificationsAction = () => ({
//     type: GET_NOTIFICATION
// })

// export const notificationsAction = () => ({
//     type: GET_NOTIFICATION
// })