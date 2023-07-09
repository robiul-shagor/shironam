import axios from "axios";

const api = axios.create({
    baseURL: "https://shironam-backend.themestransmit.com/api", // //https://admin-beta.shironam.live/api/
    withCredentials: false
});

// Retry configuration
api.defaults.retry = 3; // Number of retry attempts
api.defaults.retryDelay = 1000; // Initial retry delay in milliseconds
api.defaults.retryBackoff = 2; // Exponential backoff factor

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { config, response } = error;
    const { retry, retryDelay, retryBackoff } = config;

    if (response && response.status === 429) {
      // Too many requests error
      if (retry && retry > 0) {
        return new Promise((resolve) => {
          setTimeout(() => {
            config.retry = retry - 1;
            config.retryDelay *= retryBackoff;
            resolve(api(config));
          }, retryDelay);
        });
      }
    }

    return Promise.reject(error);
  }
);


export default api;