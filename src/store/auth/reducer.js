import { AUTHENTICATED, ERROR, LOAD } from "./action";

const authState = {
    isAuth: false,
    errorAuth: '',
    isLoadingAuth: false,
    userId: ''
}

export function authorizationReducer(state = authState, action) {
    switch (action.type) {
        case AUTHENTICATED: return { ...state, isAuth: action.bool, userId: action.userId };
        case ERROR: return { ...state, errorAuth: action.errorAuth, isAuth: false, userId: '', isLoadingAuth:false };
        case LOAD: return { ...state, isLoadingAuth: action.bool };
        default: return state;
    }
}

