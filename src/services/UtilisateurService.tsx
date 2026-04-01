import { myAxios } from "../axios/MyAxios";


export const getListeRoleUtilisateur = async ():Promise<string[]>=>{
    const url_listeRole:string = "enumerations/listeRoleUtilisateur";
    const lesRoles = await myAxios.get<string[]>(url_listeRole);
    return lesRoles.data;

}