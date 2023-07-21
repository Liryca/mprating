import { GET_API_KEY, ERROR_API_KEY } from "./action";

const apiKeyState = {
    statistic_key: '',
    standard_key: '',
    errorApiKey: '',
    status:false,
    loadingKey:true
}

export const apiKeyReducer = (state = apiKeyState, action) => {

    switch (action.type) {
        case GET_API_KEY: {
            return { ...state, standard_key: action.standard_key, statistic_key: action.statistic_key, status:action.status, loadingKey:false }
        }

        case ERROR_API_KEY: {
            return { ...state, errorApiKey: action.error, loadingKey: false }
        }

        default:
            return state;
    }
}