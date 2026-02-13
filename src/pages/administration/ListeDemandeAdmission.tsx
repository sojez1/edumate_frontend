import React, { useState } from 'react'
import MyTextInput from '../../composants/MyTextInput'
import MyButton from '../../composants/MyButton'
import type { demandeAdmission } from '../../utilitaires/DataTypes'

export default function ListeDemandeAdmission() {

    const [listeDemandeAdmission, setListeDemandeAdmission] = useState<demandeAdmission[]>([])

    const afficherListe = ()=>{
        alert("test en cours");

    }


  return (
    <div>

        <fieldset>
            <legend>Recherche</legend>
            <MyButton label='rechercher' actionToExecute={afficherListe} type='button'/>
            
        </fieldset>
        <table className='table table-stripped'>
            <thead>
                <tr> 
                    <th>date de la demande</th>
                    <th>Annee Scolaire</th>
                    <th> numnero demande</th>
                    <th>Demandeur</th>
                    <th>Classe sollicite</th>
                    <th>statut</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    listeDemandeAdmission.map((chaqueDemande)=><tr>
                        <td>{chaqueDemande.dateDemande.toISOString().split("T")}</td>
                        <td>{chaqueDemande.anneeScolaire}</td>

                    </tr>)
                }

            </tbody>
        </table>
    </div>
  )
}
