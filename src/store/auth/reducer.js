import { AUTHENTICATED, NOT_AUTHENTICATED, ERROR, LOAD } from "./action";

const authState = {
    isAuth: false,
    error: '',
    isLoading: false,
    id: ''
}

export function authorizationReducer(state = authState, action) {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                isAuth: action.bool,
                id: action.id

            };

        case NOT_AUTHENTICATED:
            return {
                ...state,
                isAuth: action.bool,
            };
        case ERROR:
            return {
                ...state,
                error: action.error,
                isAuth: false,
                id: ''
            };
        case LOAD:
            return {
                ...state,
                isLoading: action.bool
            };
        default:
            return state;
    }
}

