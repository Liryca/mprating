import { $api } from "../http";

export const fetchArticles = (productId) => {
    return $api.get(`/rest/v1/products/${productId}/competitors`)  // получение артиклей
}

export const fetchAddArticle = (productId,obj) => {
    return $api.post(`/rest/v1/products/${productId}/competitors`, obj)  // добавление артикля
    // "article": 103364370 //артикль товара конкурента
}

export const fetchDeleteArticle = (productId,competitorId ) => {
    return $api.delete(`/rest/v1/products/${productId}/competitors/${competitorId}`)  // удаление артикля
}



export async function syncArticles (productId){
    return $api.post(`https://app.mprating.ru/rest/v1/products/${productId}/competitors/sync` )
}
