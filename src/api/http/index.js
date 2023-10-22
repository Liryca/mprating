import axios from "axios";
import { useKeycloak } from "../../keycloak/hook";
import _ from "lodash";
import client from "../../keycloak/keycloak";

export const API_URL = `https://app.mprating.ru`;

export const $api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});



console.log(client)


export const issueToken = () => {

    return new Promise((resolve, reject) => {
        return client.updateToken(30).then((refreshed) => {
            if (refreshed) {
                console.log(refreshed,'refresh')
                resolve(client.token);
                localStorage.setItem("token", `${client.token}`);
            } else {
                console.log('not refreshed ' + new Date());
            }
        }).catch((e) => {
            console.log(e, 'error after update')
            client.login({
                redirectUri: window.location.origin,
            });
        });
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
        console.log('token still valid')
        _.set(config, 'headers.Authorization', `Bearer ${localStorage.getItem("token")}`);
    }
    return config;
}, (err) => {
    console.log(err, 'error request')
    return Promise.reject(err);
});




// $api.interceptors.request.use(
//     async config => {

//       config.headers = {
//         'Authorization': `Bearer ${ useKeycloak().token}`,
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//       return config;
//     },
//     error => {
//         console.log(error)
//       Promise.reject(error)
//   });


// $api.interceptors.response.use((config) => {
//     return config;
// }, async (error) => {
//     const  keycloak = useKeycloak()
//     const originalRequest = error.config;

//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         console.log(error)
//         originalRequest._isRetry = true;
//             keycloak.updateToken(30000)
//                 .then((refreshed) => {
//                     if (refreshed) {
//                         console.log("Token was successfully refreshed after error");
//                         return $api.request(originalRequest);
//                     }
//                 })
//                 .catch(() => keycloak.login({
//                     redirectUri: window.location.origin,
//                 }))

//         }
// })





