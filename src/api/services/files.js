import { $api } from "../http";

export async function getFilesAxios() {
    return $api.get("/rest/v1/promotions")
}

export async function downloadFileAxios(id) {
    return $api.get(`/rest/v1/promotions/${id}/download`, { responseType: 'blob' });

}

export async function uploadFileAxios(form) {
    return $api.post("/rest/v1/promotions/upload", form);
}

export async function deleteFileAxios(id) {
    return $api.delete(`/rest/v1/promotions/${id}`)
}


