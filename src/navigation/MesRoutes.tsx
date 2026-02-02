import { createBrowserRouter } from "react-router-dom";
import Logins from "../pages/commun/Logins";
import BarreDeMenu from "./BarreDeMenu";
import DemandeAdmission from "../pages/commun/DemandeAdmission";
import PublierNoteParentsEleves from "../pages/enseignants/PublierNoteParentsEleves";
import RapportJournalierEnfants from "../pages/enseignants/RapportJournalierEnfants";
import SignalerAbsenceMaladie from "../pages/parents/SignalerAbsenceMaladie";
import PageNavigationErreur from "../pages/commun/PageNavigationErreur";
import GestionDesClasses from "../pages/administration/GestionDesClasses";

export const mesRoutes = createBrowserRouter([
  {
    path:"/",
    element:<BarreDeMenu/>,
    errorElement:<PageNavigationErreur/>,
    children:[
      {index:true, element:<Logins/>},
      {path:"demanderAdmission", element:<DemandeAdmission/>},
      {path:"publierNote", element:<PublierNoteParentsEleves/>},
      {path:"messageAuxParents", element:<RapportJournalierEnfants/>},
      {path:"login", element:<Logins/>},
      {path:"signalerAbsenceEnfant", element:<SignalerAbsenceMaladie/>},
      {path:"classes", element:<GestionDesClasses/>},
    ]
    
  }


]);
