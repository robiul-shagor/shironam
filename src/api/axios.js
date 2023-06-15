import axios from "axios";

export default axios.create({
    baseURL: "https://shironam-backend.themestransmit.com/api",
    withCredentials: false
});