import axios from 'axios';

export const myAxios = axios.create({
    baseURL: import.meta.env.VITE_EDUMATE_BASE_URL,
    
});