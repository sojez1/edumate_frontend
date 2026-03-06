import { myAxios } from "../axios/MyAxios"
import type {demandeAdmission, FiltreDemandeAdmission } from "../utilitaires/DataTypes";

const url_listeStatutDemandeAdmission:string = "enumerations/listeStatutDemandeAdmission";

const url_listeDemandeAdmission = "/demande-admission/listeDemandeAdmission";

export const getAllDemandeAdmission = async(filtre:FiltreDemandeAdmission):Promise<demandeAdmission[]>=>{
    const listeAdmissionReponse = await myAxios.post<demandeAdmission[]>(url_listeDemandeAdmission, filtre);
    return listeAdmissionReponse.data;

}

export const listeStatutDemandeAdmission = async()=>{
    const liste = await myAxios.get<string[]>(url_listeStatutDemandeAdmission);
    return liste.data;
}