import { GET_API_KEY, ERROR_API_KEY } from "./action";

const apiKeyState = {
    token: null,
    errorApiKey: null,
    loadingKey:true
}

export const apiKeyReducer = (state = apiKeyState, action) => {

    switch (action.type) {
        case GET_API_KEY: {
            return { ...state, token:action.token, loadingKey:false }
        }

        case ERROR_API_KEY: {
            return { ...state, errorApiKey: action.error, loadingKey: false }
        }

        default:
            return state;
    }
}