import { createBrowserRouter } from "react-router-dom";
import Logins from "../pages/commun/Logins";
import BarreDeMenu from "./BarreDeMenu";
import DemandeAdmission from "../pages/commun/DemandeAdmission";
import PublierNoteParentsEleves from "../pages/enseignants/PublierNoteParentsEleves";
import RapportJournalierEnfants from "../pages/enseignants/RapportJournalierEnfants";
import SignalerAbsenceMaladie from "../pages/parents/SignalerAbsenceMaladie";
import PageNavigationErreur from "../pages/commun/PageNavigationErreur";
import GestionDesClasses from "../pages/administration/GestionDesClasses";
import GestionAnneeScolaires from "../pages/administration/GestionAnneeScolaires";
import ListeDemandeAdmission from "../pages/administration/ListeDemandeAdmission";
import Accueil from "../pages/commun/Accueil";
import AdmissionPrendreDecision from "../pages/administration/AdmissionPrendreDecision";
import SansBarreDeMenu from "./SansBarreDeMenu";
import VerifierOtp from "../pages/commun/VerifierOtp";
import InscriptionUtilisateur from "../pages/commun/InscriptionUtilisateur";
import EnregistrementAncienEtudiants from "../pages/commun/EnregistrementAncienEtudiants";
import Inscriptions from "../pages/eleves/Inscriptions";
import GestionDesUtilisateurs from "../pages/administration/GestionDesUtilisateurs";

export const mesRoutes = createBrowserRouter([

  // mes routes avec menu
  {
    path:"/",
    element:<BarreDeMenu/>,
    errorElement:<PageNavigationErreur/>,
    children:[
      //{index:true, element:<Accueil/>},
      {path:"demanderAdmission", element:<DemandeAdmission/>},
      {path:"publierNote", element:<PublierNoteParentsEleves/>},
      {path:"messageAuxParents", element:<RapportJournalierEnfants/>},
      //{path:"login", element:<Logins/>},
      {path:"signalerAbsenceEnfant", element:<SignalerAbsenceMaladie/>},
      {path:"classes", element:<GestionDesClasses/>},
      {path:"gestionAnneeScolaires", element:<GestionAnneeScolaires/>},
      {path: "listeDemandeAdmission", element:<ListeDemandeAdmission/>},
      {path:"decisionAdmission", element:<AdmissionPrendreDecision/>},
      {path:"otp_verification", element:<VerifierOtp/>},
      {path: "inscription_utilisateur", element:<InscriptionUtilisateur/>},
      {path:"enregistrement_ancien_etudiants", element:<EnregistrementAncienEtudiants/>},
      {path:"inscription", element:<Inscriptions/>},
      {path:"gestionUtilisateurs", element:<GestionDesUtilisateurs/>}

    ]
    
  },

  // mes routes sans menu
  {
    
    element:<SansBarreDeMenu/>,
    errorElement:<PageNavigationErreur/>,
    children:[
      
      {path:"login", element:<Logins/>},
      {index:true, element:<Accueil/>},
      
    ]

  }


]);
