import axios from "axios";

const api = axios.create({
    baseURL: "https://shironam-backend.themestransmit.com/api", // //https://admin-beta.shironam.live/api/
    withCredentials: false
});

// Add a response interceptor
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response && error.response.status === 429) {
//             // Retry the request after a delay
//             const delay = Math.pow(2, error.response.headers['retry-after']) * 1000;
//             await new Promise((resolve) => setTimeout(resolve, delay));
//             return api.request(error.config); // Retry the original request
//         }
//         return Promise.reject(error);
//     }
// );

export default api;