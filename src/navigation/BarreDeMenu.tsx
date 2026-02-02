import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { mesRoutes } from './MesRoutes'

export default function BarreDeMenu() {
  return (
    <>
        <header>
            <nav className='navbar navbar-expand-lg bg-body-tertiary position-absolute top-0'>
                <div className='container'>
                    <ul className='navbar-nav ms-auto'>
                    
                    <li>Admission
                        <ul>
                            <li className="nav-item"><NavLink to="demanderAdmission" >Demander une Admission</NavLink></li>

                        </ul>
                    </li>

                    <li>Enseignants
                        <ul>
                            <li className="nav-item"><NavLink to="publierNote" >publier note des eleves</NavLink></li>

                        </ul>
                    </li>

                    <li>Administration
                        <ul>
                            <li><NavLink to="messageAuxParents" className="nav-item">Envoyer un mail aux parents</NavLink></li>
                            <li><NavLink to="classes" className="nav-item">Gestion des classes</NavLink></li>

                        </ul>
                    </li>

                    <li> Parents
                        <ul>
                            <li><NavLink to="signalerAbsenceEnfant" className="nav-item">Faire un paiement</NavLink> </li>
                            <li><NavLink to="signalerAbsenceEnfant" className="nav-item">Signaler une absence</NavLink> </li>

                        </ul>
                    </li>

                    <li>Profil
                        <ul>
                            <li><NavLink to="login" className="nav-item">Se connecter</NavLink></li>

                        </ul>
                    </li>
                               
                </ul>

                </div>
                                
            </nav>
        </header>         

        <div>
            <Outlet/>
        </div>
    </>
  )
}
