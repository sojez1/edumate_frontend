import axios from 'axios';

export const myAxios = axios.create({
    baseURL: import.meta.env.VITE_EDUMATE_BASE_URL,
    
});

myAxios.interceptors.request.use(
    (config)=>{
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

