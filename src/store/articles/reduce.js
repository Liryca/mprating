import { GET_ARTICLES, ADD_ARTICLE, DELETE_ARTICLE } from "./action"

export const articlesState = {
    articleList: [],

}

export const articlesReducer = (state = articlesState, action) => {

    switch (action.type) {

        case GET_ARTICLES:
            return {
                ...state,
                articleList: action.articles
            }

        case ADD_ARTICLE:
            return {
                ...state,
                articleList: [...state.articleList, action.article]
            }

        case DELETE_ARTICLE:
            return {
                ...state,
                articleList: state.articleList.filter(el=>el.id!==action.articleId)
            }

        default: return state
    }
}