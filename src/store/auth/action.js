import { login, logout, refreshToken } from '../../api/http/auth';

export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const ERROR = 'ERROR';
export const LOAD = 'LOAD';

export const authAction = (bool) => ({
    type: AUTHENTICATED,
    bool
})

export const notAuthAction = (bool) => ({
    type: NOT_AUTHENTICATED,
    bool
})

export const errorAction = (error) => ({
    type: ERROR,
    error

})

export const loadAction = (bool) => ({
    type: LOAD,
    bool
})


export function authLoginAsyncAction(phone, password) {
    return async function (dispatch, getState) {
        dispatch(authAction(true))
        //     console.log(getState())
        //     dispatch(loadAction(true))
        //     console.log(getState())
        //     try {
        //         const resp = await login(phone, password);
        //         localStorage.setItem("token", resp.data.accessToken);
        //         dispatch(authAction(true))

        //     } catch (err) {
        //         dispatch(errorAction('login error'))
        //         console.log("login error");
        //     }
        //     finally{
        //         dispatch(loadAction(false))
        //     }
        // }
    }
}

export function checkAuthAsyncAction() {
    return async function (dispatch) {
        dispatch(authAction(true))
    //     dispatch(loadAction(true))
    //     try {
    //         const resp = await refreshToken();
    //         localStorage.setItem("token", resp.data.accessToken);
    //         dispatch(authAction(true))

    //     } catch (err) {
    //         dispatch(errorAction('login error'))
    //         console.log("login error");
    //     } finally {
    //         dispatch(loadAction(false))
    //     }
    }
}





export function authLogoutAsyncAction() {
    return async function (dispatch) {
        dispatch(authAction(false))
    //     dispatch(loadAction(true))
    //     try {
    //         await logout();
    //         dispatch(authAction(false))
    //         localStorage.removeItem("token");
    //     } catch (err) {
    //         dispatch(errorAction('login error'))
    //     } finally {
    //         dispatch(loadAction(false))
    //     }
    }
}

