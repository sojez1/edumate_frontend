import { useEffect, useState } from "react";
import MyTextToShow from "../../composants/MyTextToShow";
import type {anneesScolaires, classes, Etudiant, HistoriqueClasseEtudiant} from "../../utilitaires/DataTypes";
import { myAxios } from "../../axios/MyAxios";


type InfosEtudiant = {
  id: number;
  etudiant: Etudiant;
  classe: classes;
  anneeScolaire: anneesScolaires
}

const url_histo:string = "/etudiants/getStudentHistorique";


export default function Inscriptions(){
  const [etudiantInfo, setEtudiantInfo] = useState<InfosEtudiant | null>(null);
  const [message, setMessage] = useState<string>("");

  const getStudentHistoriqueData = async ():Promise<HistoriqueClasseEtudiant[]>=>{
    try {
      const studentdata = await myAxios.get<HistoriqueClasseEtudiant[]>(url_histo);
    return studentdata.data;
      
    } catch (error) {
      setMessage("Impossible de charger les donnees actuelles de l'utilisateur connecte")
      throw error;
      
    }
    
  }

  useEffect(()=>{

    // load student info
    (async () => {
      const myDatas = await getStudentHistoriqueData();
      const oneData = myDatas[0];
      setEtudiantInfo(oneData);
    })();
  },[]);

  

  return (
    <div>
      <p className="text text-danger fw-bold text-uppercase fs-4">Inscription a pour l'annee scolaire a venir</p>
      {message && <p>{message}</p>}

      {etudiantInfo && 

      <fieldset>
          <legend className="text text-primary fw-bold fs-4">Vos informations actuelles </legend>
          <div>
            <MyTextToShow label="Nom" val={etudiantInfo.etudiant.nom}/>
            <MyTextToShow label="prenom" val={etudiantInfo.etudiant.prenoms}/>
            <MyTextToShow label="Telephone" val={etudiantInfo.etudiant.telephone}/>
          </div>
          <div>
            <MyTextToShow label="derniere annee scolaire" val={etudiantInfo.anneeScolaire.anneeScolaire}/>
            <MyTextToShow label="classe Actuelle" val={etudiantInfo.classe.nomClasse}/>
          </div>

      </fieldset>

      }

      <form>
        <fieldset>
          <legend>Inscription pour l'annee suivante</legend>
          <div>

          </div>
          
        </fieldset>
      </form>



      
    </div>
  )
}
