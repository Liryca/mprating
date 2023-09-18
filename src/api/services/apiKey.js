import { $instance } from "../http";

export async function fetchApiKey(id) {
    return $instance.get(`/get_client?client_id=${id}`) 
}

export const sendApiKeys = (apiKeys) => {
    return $instance.post("/set_api_keys", apiKeys) 
}







