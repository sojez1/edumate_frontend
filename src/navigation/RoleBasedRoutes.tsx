import { Navigate, Outlet } from "react-router-dom";
import GetUserRoles from "./GetUserRoles"

export default function RoleBasedRoutes({listeRolesAutorises}) {
    const role = GetUserRoles();

    if(!role) return <Navigate to="/login"/>

    return listeRolesAutorises.includes(role)?<Outlet/>:<Navigate to="/"/>

}
