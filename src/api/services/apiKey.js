import { $api } from "../http";

export async function fetchApiKey() {
    return $api.get("/rest/v1/client/keys");
}

export async function sendApiKey(apiKey) {
    return $api.post("/rest/v1/client/keys", apiKey)
}



