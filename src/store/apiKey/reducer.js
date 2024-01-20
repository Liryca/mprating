import { GET_API_KEY, ERROR_API_KEY, LOADING_API_KEY  } from "./action";

const apiKeyState = {
    token: null,
    errorApiKey: null,
    loadingKey:false
}

export const apiKeyReducer = (state = apiKeyState, action) => {

    switch (action.type) {
        case GET_API_KEY: {
            return { ...state, token:action.token, errorApiKey:null }
        }

        case ERROR_API_KEY: {
            return { ...state, errorApiKey: action.error}
        }
            
        case LOADING_API_KEY: {
            return { ...state, loadingKey:action.load}
        }

        default:
            return state;
    }
}