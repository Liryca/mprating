import { DECREASE_PAGE, INCREASE_PAGE } from './action';

export const paginationState = {
    page: 1,
    totalProducts: 0,
    perPage: 10,
    fromProducts: 0,
    toProducts: 10,
    currentProductGroup: []
}

export const productsReducer = (state = paginationState, action) => {

    switch (action.type) {
        case INCREASE_PAGE: {
            if ((state.totalProducts - state.toProducts) < state.perPage) {
                return {
                    ...state,
                    toProducts: state.toProducts + (state.totalProducts - state.toProducts),
                    fromProducts: state.fromProducts + state.perPage,
                    page: state.page + 1,
                }
            } else {
                return {
                    ...state,
                    page: state.page + 1,
                    fromProducts: state.fromProducts + state.perPage,
                    toProducts: state.toProducts + state.perPage
                }
            }
        }
        case DECREASE_PAGE: {
            if (state.totalProducts === state.toProducts) {
                return {
                    ...state,
                    toProducts: state.toProducts - (state.totalProducts - state.fromProducts),
                    page: state.page - 1,
                    fromProducts: state.fromProducts - state.perPage,

                }
            }
            else {
                return {
                    ...state,
                    page: state.page - 1,
                    fromProducts: state.fromProducts - state.perPage,
                    toProducts: state.toProducts - state.perPage
                }
            }
        }
        default: return state;

    }
}
