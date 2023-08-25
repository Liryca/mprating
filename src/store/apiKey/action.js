import { fetchApiKey } from '../../api/services/apiKey';

export const GET_API_KEY = 'GET_API_KEY';
export const ERROR_API_KEY = 'ERROR_API_KEY'

export const apiKeyAction = (standard_key, statistic_key, status) => ({
    type: GET_API_KEY,
    standard_key,
    statistic_key,
    status
})

export const apiKeyErrorAction = (error) => ({
    type: ERROR_API_KEY,
    error
})

export function getApiKeyThunk(id) {
    return async function (dispatch) {
        // try {
        //     const response = await fetchApiKey(id);
        //     const { standard_key, statistic_key, status } = response.data;
        //     // dispatch(apiKeyAction(standard_key, statistic_key, status))
        // } catch (e) {
        //     dispatch(apiKeyErrorAction(e.message));
        // }
    }
}