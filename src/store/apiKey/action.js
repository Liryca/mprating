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


export function getApiKeyThunk() {

    return async function (dispatch, getState) {
        try {
            const response = await fetchApiKey();
            const { standard_key, statistic_key, status } = response.data;
            console.log(response.data, 'apiKey')
            // setTimeout(() => dispatch(apiKeyAction(standard_key, statistic_key, status)), 500)
 
            dispatch(apiKeyAction(standard_key, statistic_key, status))
        } catch (e) {
            dispatch(apiKeyErrorAction(e.message));
        }
    }
}