import { useEffect, useState } from 'react'
import MyButton from '../../composants/MyButton'
import type { admissionDetailsForm, anneesScolaires, classes, demandeAdmission, FiltreDemandeAdmission } from '../../utilitaires/DataTypes'
import MyComboBox from '../../composants/MyComboBox'
import { getAllSavedAnneeScolaire } from '../../services/AnneeScolaireService'
import { getAllClasses } from '../../services/ClasseService'
import MyEnumCombo from '../../composants/MyEnumCombo'
import { getAllDemandeAdmission, listeStatutDemandeAdmission } from '../../services/DemandeAdmissionService'



export default function ListeDemandeAdmission() {

    const [listeDemandeAdmission, setListeDemandeAdmission] = useState<demandeAdmission[]>([]);
    const [listeAnneeScolaire, setListeAnneeScolaire] = useState<anneesScolaires[]>([]);
    const [listeClasse, setListeClasse] = useState<classes[]>([]);    
    const [listeStatutDemande, setListeStatutDemande] = useState<string[]>([]);
    const [filtre, setFiltre] = useState<FiltreDemandeAdmission>({annee:"", classe:"", statut:""})

    const handleFiltreChange = (name:string, value:string)=>{
        setFiltre((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    useEffect(()=>{
        // recuperation des annees scolaires dans le combo
        (async()=>{
            const anneeScolaireReponse = await getAllSavedAnneeScolaire();
            setListeAnneeScolaire(anneeScolaireReponse);
        })();

        // recuperation de la liste des classes
        (async()=>{
            const classeListe = await getAllClasses();
            setListeClasse(classeListe);           
        })();

        // recuperer la liste des statuts possible de la demande d'admission
        (async()=>{
            const listeStatut = await listeStatutDemandeAdmission();
            setListeStatutDemande(listeStatut);
        })();
    },[])

    
    
    useEffect(()=>{
        
        // recuperation de la liste des demandes d'admission
        (async()=>{
            const listeDemande = await getAllDemandeAdmission(filtre);
            console.log(listeDemande)
            setListeDemandeAdmission(listeDemande);
        })(); 
    },[filtre]);


    // fonction pour prendre une decision
    const prendreDecision = ()=>{

    }

    // fonction pour telecharger la liste des pieces jointes
    const telechargerDocumentsJoint = ()=>{

    }


  return (
    <div className='container d-flex flex-column gap-2'>
        
        <div>
            <h5 className='Text text-primary'>Liste des demandes d'admission</h5>

            <fieldset className='border border-primary rounded gap-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Recherche</legend>
                <div className='container d-flex flex-column gap-3'>
                    <div className='container d-flex flex-row gap-3'>
                        <MyComboBox label='Annee scolaire' nom="anneeScolaire" liste={listeAnneeScolaire} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="anneeScolaire" onValueChange={(val)=>handleFiltreChange("annee",String(val))}  />
                        <MyEnumCombo label='Statut' liste={listeStatutDemande} name='statutDemande' handleSelecteurChange={(val)=>handleFiltreChange("statut", val)}/>
                    </div>                
                    <MyComboBox label='classe' nom="classeSouhaitee" liste={listeClasse} identifiant="id" valeurAfficher={["nomClasse","appelation"]} valeurretouree="nomClasse" onValueChange={(val)=>handleFiltreChange("classe",String(val))} />
                </div>   
            </fieldset>

        </div>

        

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {
                            listeDemandeAdmission.map((chaqueDemande)=><tr key={chaqueDemande.numeroDemande}>
                                
                                <td>{new Date(chaqueDemande.dateDemandeAdmission).toUTCString()}</td>
                                <td>{chaqueDemande.anneeScolaire.anneeScolaire}</td>
                                <td>{chaqueDemande.numeroDemande}</td>
                                <td>{chaqueDemande.candidatAdmission.prenom}</td>
                                <td>{chaqueDemande.classeSouhaitee.nomClasse}</td>
                                <td className='container gap-3'>
                                    <MyButton label='telecharger documents soumis' type='button' actionToExecute={telechargerDocumentsJoint} className='btn btn-primary gap-3'/>
                                    <MyButton label='prendre une decision' type='button' actionToExecute={prendreDecision}/>
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
