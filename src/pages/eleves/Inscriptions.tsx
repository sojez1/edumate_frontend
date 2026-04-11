import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { anneesScolaires, classes, utilisateurDto } from "../../utilitaires/DataTypes";
import MyComboBox from "../../composants/MyComboBox";
import { getAllSavedAnneeScolaire } from "../../services/AnneeScolaireService";
import { getAllClasses } from "../../services/ClasseService";
import MyButton from "../../composants/MyButton";


export default function Inscriptions() {
  const navigateTo = useNavigate();

    const [studentInfo, setStudentInfo] = useState<utilisateurDto>();
    const [studentActuelleClasse, setStudentActuelleClasse] = useState();
    const [inscriptionData, setInscriptionData] = useState();
    const [message, setMessage] = useState<String>("");
    const [listeClasse, setListeClasse] = useState<classes[]>([]);
    const [shortListeAnneeScolaire, setShortListeAnneeScolaire] = useState<anneesScolaires[]>([]);

    
    const getStudentInfo = ()=>{

    }
    const getStudentActuelleClasse = ()=>{

    }

    useEffect(()=>{
      if(sessionStorage.getItem("accessToken") == null){
        // rediriger vers la page de connexion
        setMessage("Vous devez vous connecter pour acceder a cette page. En cas de probleme de connexion, veuillez contacter le support technique.");       
        //navigateTo("/login");
        return;
      }else{
        // recuperer les infos de l'etudiant a partir du token
        getStudentInfo();
        getStudentActuelleClasse();
      }
    },[]);

    useEffect(()=>{
      // recuperation des annees scolaires
      (async () => {
          const listeDesAnneeScolaire = await getAllSavedAnneeScolaire();
          setShortListeAnneeScolaire(listeDesAnneeScolaire);     
      })();

      // recuperations des classes (unites pedagogiques)
      (async ()=>{
          const getAllsavedClasse = await getAllClasses();
          setListeClasse(getAllsavedClasse);    
      })();
    },[]);



    const onBtnSoumettre = ()=>{

    };
  return (
    <div>
      <p className="text text-danger fw-bold text-uppercase fs-4">Inscription a pour l'annee scolaire a venir</p>

      {message && <p className="text text-danger text-center">{message}</p>}

        <div>
          <fieldset>
            <legend className="text text-primary fw-bold fs-4">Informations sur l'etudiant</legend>
            <dl className="container d-flex gap-3">
              <div>
                <dt>Nom</dt>
                <dd>{studentInfo?.nom}</dd>
              </div>
              <div>
                <dt>Prénom</dt>
                <dd>{studentInfo?.prenoms}</dd>
              </div>
              <div>
                <dt>Adresse email</dt>
                <dd>{studentInfo?.adresseEmail}</dd>
              </div>
            </dl>            
          </fieldset> 
        </div>
        
        <form onSubmit={onBtnSoumettre} className="container d-flex flex-column gap-3">
          
          <fieldset>  
            <legend className="text text-primary fw-bold fs-4">Details de l'inscription</legend>
            <div className="container d-flex flex-row gap-3">
              <MyComboBox required label="annee scolaire d'inscription" nom="anneescolaie" liste={shortListeAnneeScolaire} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="id" onValueChange={()=>{}} />
              <MyComboBox required label="s'inscrire en :" nom="classe" liste={listeClasse} identifiant="id" valeurAfficher={["nomClasse","appelation"]} valeurretouree="id" onValueChange={()=>{}} />
            </div>            
          </fieldset>
          <div className="container d-flex justify-content-end">
            <MyButton label="soumettre" type="submit" className="btn btn-primary"/>
          </div>
        </form>
    </div>
  )
}
