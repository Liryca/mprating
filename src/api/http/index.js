import axios from "axios";



export const $instance = axios.create({
    // withCredentials: true,
    // baseURL: '',
    headers: {
        'Accept': 'application/json'
    },
});


$instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    }
)




// let data = '{\r\n    "login":"222",\r\n    "password":"222"\r\n}';

// let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://auth.mprating.ru:8765/login',

//     headers: {
//         // 'Content-type': 'multipart/form-data',
//         'Accept': 'application / json'
//     },
//     data: data
// };

// $instance.request(config)
//     .then((response) => {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//         console.log(error);
//     });


// 22222222








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
            // !error.config._isRetry
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