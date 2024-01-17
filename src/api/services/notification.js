import { $api } from "../http/index";

export async function getNotificationsAxios() {
    return $api.get(`/rest/v1/notifications`);
}

export async function getCountNotificationsAxios() {
    return $api.get(`/rest/v1/notifications/count`);
}


export async function getNotificationAxios(id) {
    return $api.get(`/rest/v1/notifications/${id}`);
}

export async function hideNotificationAxios(id) {
    return $api.get(`/rest/v1/notifications/${id}/hide`);
}


