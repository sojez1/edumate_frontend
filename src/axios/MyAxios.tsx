import axios from 'axios';

// axios pour les requetes avec token d'authentification
export const myAxios = axios.create({
    baseURL: import.meta.env.VITE_EDUMATE_BASE_URL,
    
});

// axios pour les requetes publiques (sans token)
export const myPublicAxios = axios.create({
    baseURL: import.meta.env.VITE_EDUMATE_BASE_URL,     
});


// Intercepteur pour ajouter le token d'authentification a chaque requete sortante
myAxios.interceptors.request.use(
    (config)=>{
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);



