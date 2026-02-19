import { useEffect, useState } from 'react'
import MyButton from '../../composants/MyButton'
import type { admissionDetailsForm, anneesScolaires } from '../../utilitaires/DataTypes'
import MyComboBox from '../../composants/MyComboBox'
import { myAxios } from '../../axios/MyAxios'


const url_anneesScolaire = "/anneeScolaires/lister";
const url_listeDemandeAdmission = "/demande-admission/liste-demande-admission";

export default function ListeDemandeAdmission() {

    const [listeDemandeAdmission, setListeDemandeAdmission] = useState<admissionDetailsForm[]>([]);
    const [listeAnneeScolaire, setListeAnneeScolaire] = useState<anneesScolaires[]>([]);

    useEffect(()=>{
        // recuperation des annees scolaires dans le combo
        (async ()=>{
            const response = await myAxios.get<anneesScolaires[]>(url_anneesScolaire);
            setListeAnneeScolaire(response.data);

        })();

    },[]);

    const afficherListe = async ()=>{
        // recupereation de la liste dans listeDemandeAdmission
        const listeReponse = await myAxios.get(url_listeDemandeAdmission);
        setListeDemandeAdmission(listeReponse.data);
        
    }


  return (
    <div className='container d-flex flex-column gap-2'>

        <h5 className='Text text-primary'>Liste des demandes d'admission</h5>

        <fieldset className='border border-primary rounded p-3'>
            <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Recherche</legend>
            <div>
                <MyComboBox label='Annee scolaire' nom="anneeScolaire" liste={listeAnneeScolaire} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="anneeScolaire"  />
                                
            </div>
            <MyButton label='rechercher' actionToExecute={afficherListe} type='button'/>
            
        </fieldset>

        {listeDemandeAdmission.length == 0?  
            <div><p>Aucune demande d'admission ne correspond a vos critere de recherche</p></div>:
            <div className='table-responsive'>
                <table className='table table-striped table-bordered table-hover'>
                    <thead className='table-warning'>
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
                    <tbody className='table-group-divider'>
                        {
                            listeDemandeAdmission.map((chaqueDemande)=><tr key={chaqueDemande.numeroDemande}>
                                <td>{chaqueDemande.dateDemande}</td>
                                <td>{chaqueDemande.anneeScolaire}</td>
                                <td>{chaqueDemande.numeroDemande}</td>
                                <td>{chaqueDemande.demandeur}</td>
                                <td>{chaqueDemande.classeSollicitee}</td>
                                <td>{chaqueDemande.statut}</td>
                                <td colSpan={2}>
                                    <button className='btn  btn-primary mx-2 '>docs soumis</button>
                                    <button className='btn btn-primary'>Decision</button>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        }

       
    </div>
  )
}
