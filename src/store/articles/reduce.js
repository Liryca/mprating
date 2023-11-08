import { GET_ARTICLES, ADD_ARTICLE, DELETE_ARTICLE } from "./action"

export const articlesState = {
    articles: [],

}

export const articlesReducer = (state = articlesState, action) => {

    switch (action.type) {

        case GET_ARTICLES:
            return {
                ...state,
                articles: action.articles
            }

        case ADD_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => article.id !== action.id)
            }

        case DELETE_ARTICLE:
            return {}

        default: return state
    }
}