import { GET_ALL_NOTIFICATIONS, LOADING_NOTIFICATIONS, ERROR_NOTIFICATIONS, SHOW_NOTIFICATIONS } from "./action"

export const notificationState = {
    notificationsList: [],
    isLoadingNotifications: false,
    error: null,
    showNotifications: false
}

export const notificationsReducer = (state = notificationState, action) => {

    switch (action.type) {

        case GET_ALL_NOTIFICATIONS: {
            return {
                ...state,
                notificationsList: action.notifications
            }
        }

        case LOADING_NOTIFICATIONS: {
            return {
                ...state,
                isLoadingNotifications: action.load,
            }
        }

        case ERROR_NOTIFICATIONS:
            return {
                error: action.error,
                notificationsList: [],
                isLoadingNotifications: false,
            }


        case SHOW_NOTIFICATIONS:
            return {
                ...state,
                showNotifications: action.show
            }




        default: return state;
    }
}