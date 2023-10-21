import { $api } from "../http";


export async function fetchApiKey() {
    return $api.get("/rest/v1/client/keys");
}

export const sendApiKeys = (apiKeys) => {
    return $api.post("/rest/v1/client/keys", apiKeys)
}



