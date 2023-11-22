import axios from "axios";
import _ from "lodash";
import client from "../../keycloak/keycloak";

export const API_URL = `https://app.mprating.ru`;

export const $api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json, text/plain, */*"
    }
    });
    



export const issueToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const refreshed = await client.updateToken(30);
            if (refreshed) {
                resolve(client.token);
                localStorage.setItem("token", `${client.token}`);
            } else {
                console.log('token still valid');
            }
        } catch (e) {
            client.login({
                redirectUri: window.location.origin,
            });
        }
    });
}

$api.interceptors.request.use((config) => {
    let originalRequest = config;
    if (client.isTokenExpired()) {
        return issueToken().then((token) => {
            _.set(originalRequest, 'headers.Authorization', `Bearer ${token}`);
            return Promise.resolve(originalRequest);
        });
    } else {
        _.set(config, 'headers.Authorization', `Bearer ${localStorage.getItem("token")}`);
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});



