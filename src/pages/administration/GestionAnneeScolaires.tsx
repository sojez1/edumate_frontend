import React, { use, useEffect, useState } from 'react'
import MyTextInput from '../../composants/MyTextInput'
import type { anneesScolaires } from '../../utilitaires/DataTypes';
import { myAxios } from '../../axios/MyAxios';
import MyButton from '../../composants/MyButton';

const nouvelleAnneeScolaireUrl:string= 'anneeScolaires/creer'; //URL pour enregistrer une nouvelle année scolaire
const getAllAnneesScolairesUrl:string= 'anneeScolaires/lister'; //URL pour recuperer la liste des années scolaires existantes   


export default function GestionAnneeScolaires() {
    
    const defaultAnneeScolaireData = {
        anneeScolaire: "",
        active: false
    };

    const [anneescolaire, setAnneeScolaire] = useState<anneesScolaires>(defaultAnneeScolaireData);
    const [listeAnneesScolaires, setListeAnneesScolaires] = useState<anneesScolaires[]>([]);

    const handleAnneeScolaireChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setAnneeScolaire({...anneescolaire, 
            [name]: value
        });
    }

    const listeAnnee = async ()=>{
        const reponse = await myAxios.get(getAllAnneesScolairesUrl);
        setListeAnneesScolaires(reponse.data);
    };

    const handleBtnEnregistrerAnnee = async (e: React.FormEvent)=>{
        e.preventDefault();
        await myAxios.post(nouvelleAnneeScolaireUrl, anneescolaire);
        listeAnnee(); // Recharger la liste des années scolaires après l'ajout
    };

    const handleBtnAnnulerAnnee = (e: React.FormEvent)=>{
        e.preventDefault();
        setAnneeScolaire(defaultAnneeScolaireData);
    }

    useEffect(() => {
        listeAnnee();
        
    }, []);

  return (
    <div>
        <div>
            <h3>Ajouter une nouvelle année scolaire</h3>

            <form onSubmit={handleBtnEnregistrerAnnee}>            
            <div className='mb-3'>
                <MyTextInput label='annee scolaire' name='anneeScolaire' placeholder='ex 2024-2025' value={anneescolaire.anneeScolaire || ""} onValueChange={handleAnneeScolaireChange} required={true}/>
                <div className='container d-flex gap-2'>
                    <MyButton label='enregistrer'/>
                    <MyButton label='annuler' type='button' actionToExecute={handleBtnAnnulerAnnee}/>
                </div>
                
            </div>
            </form>

        </div>
        
        
        {listeAnneesScolaires.length > 0 && (
            <div>
                <h3>Liste des années scolaires existantes</h3>
                <table className='table table-striped'>
                    <thead className='table-primary'>
                        <tr>
                            <th>ID</th>
                            <th>Année scolaire</th>
                            <th>Est active</th>
                            <th colSpan={3}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listeAnneesScolaires.map((eachAnnee) => (
                            <tr key={eachAnnee.id}>
                                <td>{eachAnnee.id}</td>
                                <td>{eachAnnee.anneeScolaire}</td>
                                <td>{eachAnnee.active ? "Oui" : "Non"}</td>
                                <span>
                                    <button className='btn btn-sm btn-primary me-2'>Modifier</button>
                                    <button className='btn btn-sm btn-danger'>Supprimer</button>
                                    <button className='btn btn-sm btn-success ms-2'>Activer</button>
                                </span>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>  
        )}
    </div>
  )
}
