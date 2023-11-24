import { CHANGE_PAGE, CHANGE_ROWS_PERPAGE, CHANGE_TOTAL_ELEMENTS} from './action';

export const paginationState = {
    page: 0,
    totalElements: 0,
    rowsPerPage: 10,
    size:10
}

export const paginationReducer = (state = paginationState, action) => {
    switch (action.type) {
        case CHANGE_PAGE: {
            return {
                ...state,
                page: action.page,
            }
        }
        case CHANGE_ROWS_PERPAGE: {
            return {
                ...state,
                rowsPerPageAction:action.rowsPerPageAction
            }
        }
            
        case CHANGE_TOTAL_ELEMENTS: {
            return {
                ...state,
                totalElements:action.elem
            }
        }

        default: return state;
    }
}

