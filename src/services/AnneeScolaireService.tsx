import {myPublicAxios } from "../axios/MyAxios"
import type { anneesScolaires } from "../utilitaires/DataTypes";



const urlAnneeScolaire:string = "/anneeScolaires/lister";


export const getAllSavedAnneeScolaire = async ():Promise<anneesScolaires[]>=>{
    const anneeReponse = await myPublicAxios.get<anneesScolaires[]>(urlAnneeScolaire);
    return anneeReponse.data;
}

export const anneeObj = (annee:string, listeObjetAnnee:anneesScolaires[])=>{
    return listeObjetAnnee.find(chaqueAnnee =>chaqueAnnee.anneeScolaire === annee)
}