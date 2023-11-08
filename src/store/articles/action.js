import { fetchArticles } from "../../api/services/articles";

export const GET_ARTICLES = 'GET_ARTICLES ';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';


export const getArticlesAction = (articles) => ({
    type: GET_ARTICLES,
    articles

})

export const addArticleAction = (productId, article) => ({
    type: ADD_ARTICLE,
    productId,
    article

})

export const daleteArticleAction = (productId, articleId) => ({
    type: DELETE_ARTICLE,
    articleId

})

export function getProductsThunk(productId) {

    return async function (dispatch, getState) {
        try {
            const response = await fetchArticles(productId);
            dispatch(getArticlesAction(response.data.articles));
        } catch (e) {
            console.log(e.message);
        } 
    }
}
