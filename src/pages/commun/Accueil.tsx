import { NavLink, useNavigate } from "react-router-dom";
import MyButton from "../../composants/MyButton";
import MyCard from "../../composants/MyCard";
import photoAdmission from "../../assets/admissions.png"


export default function Accueil() {

    const navigateTo =  useNavigate();
    
    // texte desccriptif de chaaque carte
    const texteAdmission:string = "Faites une demande d'admission pour vous meme ou pour votre enfants. (seulement pour les nouveaux etudiants";
    const textInscription:string = "POur les parents. Cliquer ici pour aviser l'ecole du retard ou de l'absence de votre enfants";
    

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
        <div className="container d-flex flex-column mt-3">
            <h5 className="text text-danger fw-bold fs-3">Fonctionnalites clees</h5>
            <div className="container d-flex gap-3">
                <MyCard titre="Admission" url_destination="demanderAdmission" photo={photoAdmission} texte={texteAdmission}/>
                <MyCard titre="Aviser pour retard ou absence" texte={textInscription} url_destination="signalerAbsenceEnfant"/>

            </div>
            
            
        </div>


    </div>
  )
}
