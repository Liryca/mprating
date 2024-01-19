import {
    GET_ALL_NOTIFICATIONS,
    LOADING_NOTIFICATIONS,
    ERROR_NOTIFICATIONS,
    SHOW_NOTIFICATIONS,
    GET_COUNT_NOTIFICATIONS,
    READ_NOTIFICATION,
    DELETE_NOTIFICATION,
} from "./action"

export const notificationState = {
    notificationsList: [],
    isLoadingNotifications: false,
    error: null,
    showNotifications: false,
    countNotification: 0
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


        // case SHOW_NOTIFICATIONS:
        //     return {
        //         ...state,
        //         showNotifications: action.show
        //     }


        case GET_COUNT_NOTIFICATIONS:
            return {
                ...state,
                countNotification: action.count
            }


        case READ_NOTIFICATION:
            return {
                ...state,
                notificationsList: state.notificationsList.map(i => {
                    if (i.id === action.id) {
                        return {
                            ...i,
                            viewed: true
                        }
                    } else {
                        return i
                    }
                }),
                countNotification: state.countNotification - 1
            }

        case DELETE_NOTIFICATION:
            return {
                ...state,
                notificationsList: state.notificationsList.filter(i => i.id !== action.id),
                countNotification: action.notification.viewed ? state.countNotification : state.countNotification-1
            }
        default: return state;
    }
}