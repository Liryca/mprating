import { $api } from "../http/index";

export async function calculateMargin(data) {
    return $api.post(`/rest/v1/calculate/margin`, data)
}