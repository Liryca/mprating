import { fetchArticles, syncArticles } from "../../api/services/articles";

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

export function getArticlesThunk(productId) {
    return async function (dispatch, getState) {
        // dispatch(getProductsLoading(true));
        // const { page, perPage } = getState().pagination;
        try {
            await syncArticles(productId).then(async () => {
                const response = await fetchArticles(productId);
                dispatch(getArticlesAction(response.data))
                
            })
        } catch (e) {
            console.log(e.message);
            // dispatch(getProductsErrorAction('Error'));
        } finally {
            // dispatch(getProductsLoading(false))
        }
    }
}