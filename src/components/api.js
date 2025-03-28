import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://capstone-friendship-plus-ce79680bc1a8.herokuapp.com/api',
    withCredentials: true // Cookies are sent with requests
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});