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
import VerifierOtp from "../pages/commun/VerifierOtp";
import InscriptionUtilisateur from "../pages/commun/InscriptionUtilisateur";
import EnregistrementAncienEtudiants from "../pages/commun/EnregistrementAncienEtudiants";
import Inscriptions from "../pages/eleves/Inscriptions";
import GestionDesUtilisateurs from "../pages/administration/GestionDesUtilisateurs";
import ListeUtilisateurSysteme from "../pages/administration/ListeUtilisateurSysteme";
import ProtectedRoutes from "./ProtectedRoutes";
import RoleBasedRoutes from "./RoleBasedRoutes";

export const mesRoutes = createBrowserRouter([

  // mes routes avec menu
  {
    path:"/",
    element:<BarreDeMenu/>,
    errorElement:<PageNavigationErreur/>,
    children:[

      // les routes publiques
      {index:true, element:<Accueil/>},
      {path:"demanderAdmission", element:<DemandeAdmission/>},
      {path:"login", element:<Logins/>},
      {path:"otp_verification", element:<VerifierOtp/>},

      // routes necessitant que l'interessee soit simplement connecte quelque soit son role
      {
        element:<ProtectedRoutes/>,
        children: [
          {path:"inscription", element:<Inscriptions/>},

          // routes pour admins uniquement ou webmaster
          {
            element: <RoleBasedRoutes listeRolesAutorises={["ADMINISTRATION"]} />,
            children:[
              {path:"classes", element:<GestionDesClasses/>},
              {path:"gestionUtilisateurs", element:<GestionDesUtilisateurs/>},
              {path:"listeUtilisateurs", element:<ListeUtilisateurSysteme/>},
              {path:"gestionAnneeScolaires", element:<GestionAnneeScolaires/>},
              {path:"decisionAdmission", element:<AdmissionPrendreDecision/>},
              {path: "listeDemandeAdmission", element:<ListeDemandeAdmission/>},
              {path:"messageAuxParents", element:<RapportJournalierEnfants/>},

            ]
          },
          {// routes pour enseignants uniquements
            element:<RoleBasedRoutes listeRolesAutorises={["ENSEIGNANT"]}/>,
            children:[
              {path:"publierNote", element:<PublierNoteParentsEleves/>},

            ]
          },
          {// routes pour etudiants seulements
            element:<RoleBasedRoutes listeRolesAutorises={["ETUDIANT"]}/>,
            children:[
              {path: "inscription_utilisateur", element:<InscriptionUtilisateur/>},
              {path:"enregistrement_ancien_etudiants", element:<EnregistrementAncienEtudiants/>},

            ]

          },
          {// routes pour parents seulement
            element:<RoleBasedRoutes listeRolesAutorises={["PARENTS"]}/>,
            children:[
              {path:"signalerAbsenceEnfant", element:<SignalerAbsenceMaladie/>},
            ]
          }

        ]
      }

    ]
    
  }

]);
