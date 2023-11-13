import { fetchApiKey, sendApiKeys } from '../../api/services/apiKey';

export const GET_API_KEY = 'GET_API_KEY';
export const ERROR_API_KEY = 'ERROR_API_KEY'

export const apiKeyAction = (standardKey, statisticsKey) => ({
    type: GET_API_KEY,
    standardKey,
    statisticsKey,
})

export const apiKeyErrorAction = (error) => ({
    type: ERROR_API_KEY,
    error
})

export function getApiKeyThunk() {
    return async function (dispatch) {
        try {
            const response = await fetchApiKey();
            const { standardKey, statisticsKey } = response.data;
            dispatch(apiKeyAction(standardKey, statisticsKey))
        } catch (e) {
            dispatch(apiKeyErrorAction(e.message));
            console.log(e.message)
        }
    }
}


export function sendApiKeysAction(keys) {
    return async function (dispatch) {
        try {
            const response = await sendApiKeys(keys);
            console.log(response)
            const { standardKey, statisticsKey } = response.data;
            dispatch(apiKeyAction(standardKey, statisticsKey))
        } catch (e) {
            console.log(e)
            dispatch(apiKeyErrorAction(e.message));
        }
    }
}