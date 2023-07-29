import { loginUser, logout, refreshToken } from '../../api/services/auth';
import { getApiKeyThunk } from '../apiKey/action';
import { parseJwt } from '../../utils/utils';

export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const ERROR = 'ERROR';
export const LOAD = 'LOAD';


export const authAction = (bool, userId) => ({
    type: AUTHENTICATED,
    bool,
    userId
})


export const errorAction = (errorAuth) => ({
    type: ERROR,
    errorAuth
})

export const loadAction = (bool) => ({
    type: LOAD,
    bool
})

export function authLoginAsyncAction(login, password) {
    return async function (dispatch) {
        dispatch(loadAction(true))
        try {
            const response = await loginUser(login, password)
            const { jwt } = response.data;
            console.log(response, 'response')
            const id = parseJwt(jwt).id;
            localStorage.setItem("token", jwt);
            localStorage.setItem("id", id);
            dispatch(errorAction(''));
            dispatch(authAction(true, id));
            // dispatch(getApiKeyThunk(id));
        } catch (err) {
            dispatch(errorAction('login error'))
        }
        finally {
            dispatch(loadAction(false))
        }
    }
}


export function checkAuthAsyncAction() {
    return async function (dispatch) {
        dispatch(authAction(true))
        dispatch(loadAction(true))
        // try {
        //     const resp = await refreshToken();
        //     localStorage.setItem("token", resp.data.accessToken);
        //     dispatch(authAction(true))

        // } catch (err) {
        //     dispatch(errorAction('login error'))
        //     console.log("login error");
        // } finally {
        //     dispatch(loadAction(false))
        // }
    }
}


// 200:
// {«status»: true, "jwt»= «sadfgrewd.12ewfd.wefg»}
//     400:
//     {«status»: false,»msg»= «error descript» }
//     401:
//     {«status»: false,»msg»= «error descript» }
//     520:
//     {«status»: false,»msg»= «error descript» }


export function authLogoutAsyncAction() {
    return async function (dispatch) {
        dispatch(authAction(false))
        dispatch(loadAction(true))
        try {
            // await logout();
            dispatch(authAction(false))
            localStorage.removeItem("token");
            localStorage.removeItem("id");
        } catch (err) {
            dispatch(errorAction('logout error'))
        } finally {
            dispatch(loadAction(false))
        }
    }
}

