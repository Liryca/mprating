import { $api } from "../http/index";


export const changeMode = (mode) => {
    return $api.post(`/rest/v1/client/mode?type=${mode}`)
}

export const changeStatusMode = (active) => {
    return $api.post(`/rest/v1/client/activeMode?active=${active}`)
}

export const getClientInfo = () => {
    return $api.get("/rest/v1/client")
}

