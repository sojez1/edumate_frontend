import { NavLink, Outlet } from 'react-router-dom'

export default function BarreDeMenu() {
  return (
    <>
        <header>
            <nav className='navbar navbar-expand-lg bg-body-tertiary fixed-top'>
                <div className='container'>
                    
                    <NavLink className='navbar-brand' to="/">Edumate</NavLink>

                    {/*Creation du bouton hamberger pour le menu sur appareils mobile*/}
                    <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls='navbarSupportedContent' aria-expanded="false" aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                {/*Debut de la creation du menu*/}
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                    
                    {/*Sous menu admission*/}
                    <li className='nav-item dropdown'><NavLink className='nav-link dropdown-toggle' to="#" role='button' data-bs-toggle="dropdown" aria-expanded="false">Admission</NavLink>
                        <ul className='dropdown-menu'>
                            <li><NavLink className="dropdown-item" to="demanderAdmission" >Demander une Admission</NavLink></li>
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
