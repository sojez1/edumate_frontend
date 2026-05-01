/**
 * Ce composant permet de bloquer l'acces a la page demandee 
 * si l'utilisateur n'est pas connecte ou si son token est expire
 */



import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
    const token = sessionStorage.getItem("accessToken");
    return token? <Outlet/>:<Navigate to="/login"/>
}
