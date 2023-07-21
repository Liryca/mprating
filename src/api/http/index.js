import axios from "axios";



export const $instance = axios.create({

    // withCredentials: true,
    // baseURL: 'http://205f6154688e.vps.myjino.ru:49283/',
    // http://ovz21.j90211046.m6zkp.vps.myjino.ru:49156/get_client?client_id=2
    headers: {
        'Accept': 'application/json',
        'Content-Type':"application/json"
    },
});

$instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    }
)



// instance.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     async (error) => {
//         const originalRequest = { ...error.config };
//         originalRequest._isRetry = true;
//         if (
//             error.response.status === 401 &&
//             error.config &&
//             !error.config._isRetry
//         ) {
//             try {
//                 const resp = await instance.get("/api/refresh")
//                 localStorage.setItem("token", resp.data.accessToken);
//                 return instance.request(originalRequest);
//             } catch (error) {
//                 console.log("AUTH ERROR");
//             }
//         }
//         throw error;
//     }
// );