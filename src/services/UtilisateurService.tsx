import { myAxios } from "../axios/MyAxios";
import type { utilisateurDto } from "../utilitaires/DataTypes";




export const getListeRoleUtilisateur = async ():Promise<string[]>=>{
    const url_listeRole:string = "enumerations/listeRoleUtilisateur";
    const lesRoles = await myAxios.get<string[]>(url_listeRole);
    return lesRoles.data;
}

export const getAllUser = async ():Promise<utilisateurDto[]>=>{
    const url_allUser = "utilisateurs/all_users";
    const lesUsers = await myAxios.get<utilisateurDto[]>(url_allUser);
    return lesUsers.data;
}