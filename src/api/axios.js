import axios from "axios";

const api = axios.create({
    baseURL: "https://api.shironam.live/v1/", // //https://admin-beta.shironam.live/api/
    withCredentials: false
});

export default api;