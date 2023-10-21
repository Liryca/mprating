import { $api } from "../http/index";

// curl --location --request PUT 'https://app.mprating.ru/rest/v1/products/edd7471e-6cb0-492c-8078-016fea06e2c9' \
// --header 'Authorization: Bearer <Token>' \
// --header 'Content-Type: application/json' \
// --header 'Cookie: JSESSIONID=7F6E2ABC7ED845CDED8DD569A1848B19' \
// --data-raw '{
//     "customPrice": 500,
//     "costPrice": 1500,
//     "minMarginality": 1000,
//     "maxMarginality": 2000,
//     "shift": 10,
//     "strategy": "MEDIUM", // MIN, MAX, MEDIUM
//     "priceMode": "NOT_CHANGE" //Другие статусы - RECOMMENDED, CUSTOM, NOT_CHANGE
// }'

export const fetchChangeProducts = (obj) => {
    return $api.put(`/rest/v1/products/edd7471e-6cb0-492c-8078-016fea06e2c9`,obj )
}

export async function fetchProducts(page,perPage) {
    const size = perPage;
    const number = ((page * size) - size);
    return $api.get(`/rest/v1/products?number=${page}&size=${size}`)
}



