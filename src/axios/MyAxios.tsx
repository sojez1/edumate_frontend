import axios from 'axios';

export const myAxios = axios.create({
    baseURL: 'http://localhost:8091/edumate',
    headers: {
        'Content-Type': 'application/json',
    },
});