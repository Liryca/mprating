import { fetchApiKey, sendApiKey } from '../../api/services/apiKey';

export const GET_API_KEY = 'GET_API_KEY';
export const ERROR_API_KEY = 'ERROR_API_KEY'

export const apiKeyAction = (token) => ({
    type: GET_API_KEY,
    token,

})

export const apiKeyErrorAction = (error) => ({
    type: ERROR_API_KEY,
    error
})

export function getApiKeyThunk() {
    return async function (dispatch) {
        try {
            const response = await fetchApiKey();
            const { token } = response.data;
            dispatch(apiKeyAction(token))
        } catch (e) {
            console.log(e.message)
            dispatch(apiKeyErrorAction(e.message));
        }
    }
}


export function sendApiKeyAction(keys) {
    return async function (dispatch) {
        try {
            const response = await sendApiKey(keys);
            console.log(response)
            const { token } = response.data;
            dispatch(apiKeyAction(token))
        } catch (e) {
            console.log(e.message)
            dispatch(apiKeyErrorAction(e.message));
        }
    }
}