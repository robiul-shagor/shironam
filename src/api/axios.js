import axios from "axios";

const api = axios.create({
    baseURL: "https://shironam-backend.themestransmit.com/api", // //https://admin-beta.shironam.live/api/
    withCredentials: false
});

export default api;