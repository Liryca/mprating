import { CHANGE_PAGE } from './action';

export const paginationState = {
    page: 0,
    perPage: 6,
    totalPage: 5
}

export const paginationReducer = (state = paginationState, action) => {
    switch (action.type) {
        case CHANGE_PAGE: {
            return {
                ...state,
                page: action.page,
            }
        }

        default: return state;
    }
}

