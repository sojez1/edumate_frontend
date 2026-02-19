import axios from 'axios';

export const myAxios = axios.create({
    baseURL: 'https://edumate-backend-0rjc.onrender.com/edumate',
    headers: {
        'Content-Type': 'application/json',
    },
});