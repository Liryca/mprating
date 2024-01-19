import { getNotificationsAxios, getCountNotificationsAxios, readNotificationAxios, deleteNotificationAxios } from "../../api/services/notification";

export const GET_ALL_NOTIFICATIONS = 'GET_ALL_NOTIFICATIONS';
export const LOADING_NOTIFICATIONS = 'LOADING_NOTIFICATIONS';
export const ERROR_NOTIFICATIONS = 'ERROR_NOTIFICATIONS';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const GET_COUNT_NOTIFICATIONS = ' GET_COUNT_NOTIFICATIONS';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';


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


export const getCountNotificationsAction = (count) => ({
    type: GET_COUNT_NOTIFICATIONS,
    count
})

export const readNotificationAction = (id) => ({
    type: READ_NOTIFICATION,
    id
})

export const deleteNotificationAction = (id,notification) => ({
    type: DELETE_NOTIFICATION,
    id,
    notification
})




export function getCountAsyncAction() {
    return async function (dispatch) {
        try {
            const response = await getCountNotificationsAxios();
            dispatch(getCountNotificationsAction(response.data.count))
        } catch (e) {
            console.log(e.message)
        }
    }
}


export function deleteNotificationAsyncAction(id, notification) {
    return async function (dispatch) {
        try {
            const response = await deleteNotificationAxios(id);
            dispatch(deleteNotificationAction(id, notification))
        } catch (e) {
            console.log(e.message)
        }
    }
}

export function readNotificationAsyncAction(id) {
    return async function (dispatch) {
        try {
            const response = await readNotificationAxios(id);
            dispatch(readNotificationAction(id))
        } catch (e) {
            console.log(e.message)
        }
    }
}



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

