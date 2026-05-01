import { jwtDecode } from "jwt-decode";

export default function GetUserRoles() {
    const token = sessionStorage.getItem("accessToken");
    if(!token) return null;
    const decodedToken = jwtDecode(token);
    return decodedToken.roles;
  
}
