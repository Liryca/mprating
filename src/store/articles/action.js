import { fetchArticles, syncArticles, fetchAddArticle, fetchDeleteArticle } from "../../api/services/articles";

export const GET_ARTICLES = 'GET_ARTICLES ';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';


export const getArticlesAction = (articles) => ({
    type: GET_ARTICLES,
    articles

})

export const addArticleAction = (article) => ({
    type: ADD_ARTICLE,
    article

})

export const deleteArticleAction = (articleId) => ({
    type: DELETE_ARTICLE,
    articleId

})

export function getArticlesThunkAction(productId) {
    return async function (dispatch) {
        try {
                const response = await fetchArticles(productId);
                dispatch(getArticlesAction(response.data))
        } catch (e) {
            console.log(e.message);
        }   
    }
}

export function addArticlesThunkAction(productId, article) {
    return async function (dispatch) {
        try {
            // const response = await fetchAddArticle(productId, { article: article });
            dispatch(addArticleAction({article: article}))
        } catch (e) {
            console.log(e.message);
        } 
    }
}



export function deleteArticlesThunkAction(productId, articleId) {
    return async function (dispatch) {
        try {
            // const response = await fetchDeleteArticle(productId, articleId);
            dispatch(deleteArticleAction(articleId))
        } catch (e) {
            console.log(e.message);
        } 
    }
}
