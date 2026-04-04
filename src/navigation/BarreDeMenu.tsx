import { NavLink, Outlet } from 'react-router-dom'

export default function BarreDeMenu() {
  return (
    <>
        <header>
            <nav className='navbar navbar-expand-lg fixed-top' style={{backgroundColor:"#CF27F5"}}>
                <div className='container'>
                    
                    <NavLink className='navbar-brand' to="/">Edumate</NavLink>

                    {/*Creation du bouton hamberger pour le menu sur appareils mobile*/}
                    <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls='navbarSupportedContent' aria-expanded="false" aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                {/*Debut de la creation du menu*/}
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                    
                    {/*Sous menu futurs etudiants*/}
                    <li className='nav-item dropdown'><NavLink className='nav-link dropdown-toggle' to="#" role='button' data-bs-toggle="dropdown" aria-expanded="false">Futurs etudiants</NavLink>
                        <ul className='dropdown-menu'>
                            <li><NavLink className="dropdown-item" to="demanderAdmission" >Demander une Admission</NavLink></li>
                            <li><NavLink className="dropdown-item" to="demanderAdmission" >Suivre une demande d'admission</NavLink></li>
                        </ul>
                    </li>


                    {/*Sous menu Etudiants actuels*/}
                    <li className='nav-item dropdown'><NavLink className='nav-link dropdown-toggle' to="#" role='button' data-bs-toggle="dropdown" aria-expanded="false">Etudiants actuels</NavLink>
                        <ul className='dropdown-menu'>
                            <li><NavLink className="dropdown-item" to="inscription" >S'inscrire pour la prochaine année scolaire</NavLink></li>
                            <li><NavLink className="dropdown-item" to="enregistrement_ancien_etudiants" >Enregistrement dans le systeme</NavLink></li>
                        </ul>
                    </li>

                    
                    {/*Sous menu enseignements*/}
                    <li className='nav-item dropdown'><NavLink className='nav-link dropdown-toggle' to="#" role='button' data-bs-toggle="dropdown" aria-expanded="false">Enseignants</NavLink>
                        <ul className='dropdown-menu'>
                            <li><NavLink className="dropdown-item" to="publierNote" >publier note des eleves</NavLink></li>

                        </ul>
                    </li>

                    {/*Sous menu administration*/}
                    <li className='nav-item dropdown'><span className='nav-link dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Administration</span>
                        <ul className='dropdown-menu'>
                            <li><NavLink className="dropdown-item" to="messageAuxParents" >Envoyer un mail aux parents</NavLink></li>
                            <li><NavLink className="dropdown-item" to="classes" >Gestion des classes</NavLink></li>
                            <li><NavLink className="dropdown-item" to="gestionAnneeScolaires" >Gestion des années scolaires</NavLink></li>
                            <li><NavLink className="dropdown-item" to="listeDemandeAdmission">Liste des demandes d'admission</NavLink></li>
                            <li><NavLink className="dropdown-item" to="decisionAdmission">Admission - prendre une decision</NavLink></li>
                            <li><NavLink className="dropdown-item" to="gestionUtilisateurs">Gestion des utilisateurs</NavLink></li>

                        </ul>
                    </li>

                    {/*Sous menu parents*/}
                    <li className='nav-item dropdown'><span className='nav-link dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Parents</span>
                        <ul className='dropdown-menu'>
                            <li><NavLink className="dropdown-item" to="signalerAbsenceEnfant" >Faire un paiement</NavLink></li>
                            <li><NavLink className="dropdown-item" to="signalerAbsenceEnfant" >Signaler une absence</NavLink></li>
                        </ul>
                    </li>

                    
                    {/*Sous menu profil utilisateur*/}
                    <li className='nav-item dropdown'><span className='nav-link dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Profil</span>
                        <ul className='dropdown-menu'>
                            <li><NavLink className="dropdown-item" to="login" >Se connecter</NavLink></li>
                            <li><NavLink className="dropdown-item" to="inscription_utilisateur" >Inscription</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/" onClick={()=>{sessionStorage.removeItem("accessToken")}}>Se deconnecter</NavLink></li>


                        </ul>
                    </li>
                               
                </ul>

                </div>

                </div>                  
            </nav>
        </header>
        
        <main className='container mt-5'>
            <Outlet/>
        </main>         

        
    </>
  )
}
