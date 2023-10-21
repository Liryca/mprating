import axios from "axios";
import { useKeycloak } from "../../keycloak/hook";
import _ from "lodash";

export const API_URL = `https://app.mprating.ru`;

export const $api = axios.create({
    baseURL: API_URL,
});


$api.interceptors.request.use(

    async (config) => {
        const keycloak = useKeycloak();
        // const originalRequest = config
        console.log(keycloak, 'keyclock')
        if (keycloak.isTokenExpired()) {
            console.log("Token expired!");
          await  keycloak.updateToken(30)
              .then((refreshed) => {
                  console.log('refreshed')
                //   debugger;
                    if (refreshed) {
                        // originalRequest.headers.Authorization = `Bearer ${keycloak.token}`
                        console.log("Token was successfully refreshed");
                        // return originalRequest
                    } else {
                        keycloak.login()
                    }
                })
        .catch((error)=> keycloak.login())
        } else {
            console.log('Token is still valid')
        }
        config.headers.Authorization = `Bearer ${keycloak.token}`
        return config

   
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

// $api.interceptors.request.use((config) => {
//     const keycloak = useKeycloak();
//     const originalRequest = config;
//     try {
//         keycloak.updateToken(30)
//             .then((refreshed) => {
//                 if (refreshed) {
//                     originalRequest.headers.Authorization = `Bearer ${keycloak.token}`
//                     console.log("Token was successfully refreshed");
//                     return config
            
//                 } else {
//                     console.log("Token is still valid");
//                     originalRequest.headers.Authorization = `Bearer ${keycloak.token}`
//                 }
//                 // config.headers.Authorization = `Bearer ${keycloak.token}`
//                 console.log(originalRequest)
//                 return originalRequest
//             })

//     } catch (e) {
//         console.log('Failed to refresh the token:', e)
//         keycloak.login()
//     }

// })


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

// keycloak.onTokenExpired = () => {
//     console.log("Token expired!");

//     keycloak.updateToken(30)
//       .then((refreshed) => {
//           if (refreshed) {
//             config.headers.Authorization = `Bearer ${keycloak.token}`
//           console.log("Token was successfully refreshed");
//         } else {
//           console.log("Token is still valid");
//         }
//       })
//       .catch(() => keycloak.login({
//         redirectUri: window.location.origin,
//       }));
// };



//   $api.interceptors.response.use((response) => {
//     return response
//   }, async function (error) {
//       const originalRequest = error.config;
//       console.log(error)
//       const keycloak = useKeycloak()
//       if (error.response.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           try {
//             await keycloak.updateToken().then((refreshed) => {
//                 console.log(error)
//                   if (refreshed) {
//                       console.log(keycloak.token)
//                       axios.defaults.headers.common['Authorization'] = 'Bearer ' + keycloak.token;
//                       return $api(originalRequest);
//                 }
//             })
//           } catch {
//             await keycloak.login()
//           }

//     }

//   });


