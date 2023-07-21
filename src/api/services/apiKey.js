import { $instance } from "../http";

export async function fetchApiKey() {
    return $instance.get('/get_client?client_id=3')
}

export const sendApiKeys = (apiKeys) => {
    return $instance.post("/set_api_keys", apiKeys)
}







