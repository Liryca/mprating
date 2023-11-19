import { $api } from "../http/index";

export async function fetchProducts(page, perPage) {
    const size = perPage;
    // const number = ((page * size) - size);
    return $api.get(`/rest/v1/products?number=${page}&size=${size}`)
}

export async function syncProducts() {
    return $api.post(`/rest/v1/products/sync`);
}

export async function fetchChangeProduct (id, obj) {
    return $api.put(`/rest/v1/products/${id}`, obj, { 'Cookie': 'JSESSIONID=7F6E2ABC7ED845CDED8DD569A1848B19' });
}

export  async function fetchChangePriceModeProducts(priceMode) {
    return $api.post(`/rest/v1/products/priceMode?type=${priceMode}`);
}

export  async function fetchChangeUseAutoModeProducts(useAuto) {
    return $api.post(`/rest/v1/products/autoMode?active=${useAuto}`);
}

export async function fetchProduct(id) {
    return $api.get(`/rest/v1/products/${id}`);
}


