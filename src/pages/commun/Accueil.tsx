import { NavLink, useNavigate } from "react-router-dom";
import MyButton from "../../composants/MyButton";
import MyCard from "../../composants/MyCard";


export default function Accueil() {

    const navigateTo =  useNavigate();

    // Lien vers les photos de chaque carte
    const photoAdmission = "@/src/assets/admissions.png";

    // texte desccriptif de chaaque carte
    const texteAdmission:string = "Faites une demande d'admission pour vous meme ou pour votre enfants. (seulement pour les nouveaux etudiants";
    const textInscription:string = "Pour les anciens et les nouveaux etudiants. Proceder chaque annee a la reinscription au cours";
    

    const handleBtnInscriptionConnexion = ()=>{
        navigateTo("/login")
        
    }

  return (
    <div className="container d-flex flex-column fixed-top h-100">
        <div className="container d-flex flex-row h-25 m-3">
            <NavLink className="text text-uppercase fs-1 fw-bold flex-fill" to="/">edumate</NavLink>
            <MyButton label="Inscription/Connexion" type="button" actionToExecute={handleBtnInscriptionConnexion} className="btn btn-danger position-fixed end-0 m-3 flex-fill"/>
            
        </div>
        <div className="container">
            <h5 className="text text-center fs-3 fw-bold text-danger">Bienvenue sur Edumate</h5>
            <p className="text text-center fs-5">La plateforme de gestion professionnelle de vos activites academiques</p>
        </div>
        <div >
            <h5>Fonctionnalites clees</h5>
            <div className="container d-flex gap-3">
                <MyCard titre="Admission" url_destination="demanderAdmission" photo={photoAdmission} texte={texteAdmission}/>
                <MyCard titre="Inscription" texte={textInscription} url_destination="#"/>

            </div>
            
            
        </div>


    </div>
  )
}
