import { $api } from "../http/index";

export async function applyPriceSemiAuto (){
    return $api.post(`/rest/v1/client/startSemiMode`)
}

export async function changeStatusModeAuto(active){
    return $api.post(`/rest/v1/client/activeAutoMode?active=${active}`)
}

export async function getClientInfo () {
    return $api.get("/rest/v1/client")
}

