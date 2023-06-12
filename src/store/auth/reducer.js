import { AUTHENTICATED, NOT_AUTHENTICATED, ERROR, LOAD } from "./action";

const authState = {
    isAuth: true,
    error: '',
    isLoading: false
}

export function authorizationReducer(state = authState, action) {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                isAuth: action.bool,

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
                isAuth:false
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

