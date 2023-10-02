import { $instance } from "../http";

export async function fetchApiKey() {
    return $instance.get("/rest/v1/client/keys")
}

export const sendApiKeys = (apiKeys) => {
    return $instance.post("/rest/v1/client/keys", apiKeys)
}







