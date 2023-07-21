import { $instance } from "../http";

export async function fetchApiKey() {
    return $instance.get('http://ovz21.j90211046.m6zkp.vps.myjino.ru:49156/get_client?client_id=3')
}

export const sendApiKeys = (apiKeys) => {
    return $instance.post("http://ovz21.j90211046.m6zkp.vps.myjino.ru:49156/set_api_keys", apiKeys)
}







