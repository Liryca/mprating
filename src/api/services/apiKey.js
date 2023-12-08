import { $api } from "../http";

export const fetchApiKey=() =>{
    return $api.get("/rest/v1/client/keys");
}

export const sendApiKey = (apiKey) => {
    return $api.post("/rest/v1/client/keys", apiKey)
}



