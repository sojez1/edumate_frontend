import { myAxios, myPublicAxios } from "../axios/MyAxios"
import type { classes } from "../utilitaires/DataTypes";


const urlClasses:string = "classes/listerClasses";

// fonction pour recuperer la liste des classes depuis le backend
export const getAllClasses = async():Promise<classes[]>=>{
    const classeReponse = await myPublicAxios.get<classes[]>(urlClasses);
    return classeReponse.data;
}

// fonction prenant un string classe et retourne l'objet classe
export const classeObj = (clas:string, listeClas:classes[])=>{
    return listeClas.find((chaqClass)=>chaqClass.nomClasse === clas)
}

