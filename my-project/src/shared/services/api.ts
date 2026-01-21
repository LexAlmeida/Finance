import axios from 'axios';

const api = axios.create({
    baseURL: 'http://72.60.54.143:3000',
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('APP_ACCESS_TOKEN');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export {api};