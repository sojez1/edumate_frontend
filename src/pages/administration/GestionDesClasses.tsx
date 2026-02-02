import React, { useState, useEffect, use } from 'react'
import type { classes } from '../../utilitaires/DataTypes'
import { myAxios } from '../../axios/MyAxios';
import MyTextInput from '../../composants/MyTextInput';
import MyEnumCombo from '../../composants/MyEnumCombo';

const saveClasseUrl = 'classes/ajouterClasse'; //URL pour enregistrer une nouvelle classe
const getAllClassesUrl = 'classes/listerClasses';//URL pour recuperer la liste des classes existantes

export default function GestionDesClasses() {

    const [newClasse, setNewClasse] = useState<classes | null>(null);
    const [listeClasses, setListeClasses] = useState<classes[]>([]);
    const [niveauxEnseignement, setNiveauxEnseignement] = useState<string[]>([]);

    const handleListeClasses = async ()=>{
        try{
            const response = await myAxios.get(getAllClassesUrl);
            setListeClasses(response.data);
        }catch(error){
            console.error("Erreur lors de la récupération des classes:", error);
        }
        
    }

    const handleListeOrdreEnseignement = async ()=>{
        try{
            const {data} = await myAxios.get("/enumerations/ordreEnseignements");
            setNiveauxEnseignement(data);
        }catch(error){
            console.error("Erreur lors de la récupération des ordres d'enseignement:", error);
        }
    }

    const handleSaveNewClasse = async (e: React.FormEvent)=>{
        e.preventDefault();
        myAxios.post(saveClasseUrl, newClasse)
        .then((response)=>{
            alert("Classe enregistrée avec succès");
            handleListeClasses(); // Met à jour la liste des classes après l'enregistrement
        })
        .catch((error)=>{
            console.error("Erreur lors de l'enregistrement de la classe:", error);
        });
    }

    
    
    useEffect(()=>{
        handleListeClasses();
        handleListeOrdreEnseignement();
        
    }, [])  


  return (
    <div className='container'>
        <div>
            <form>
                <h3>Ajouter une nouvelle classe</h3>
                <MyTextInput label='Nom de la classe' name='nomClasse' value={newClasse?.nomClasse || ''} placeholder='ex: 6eme A' required/>
                <MyEnumCombo label='Niveau d enseignement' nom='ordreEnseignement' liste={niveauxEnseignement} required={true} />
                <div className='mt-3'>
                    <button type='submit' onClick={handleSaveNewClasse} className='btn btn-primary'>Enregistrer</button>
                </div>
            </form>
        </div>
        
        {listeClasses.length > 0 && <div>
            <h3>Liste des classes existantes</h3>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>Nom de la classe</th>
                        <th>Ordre d'enseignement</th>   
                    </tr>
                </thead>
                <tbody>
                    {listeClasses.map((eachClasse, index) => (
                        <tr key={eachClasse.id}>
                            <td>{index + 1}</td>
                            <td>{eachClasse.nomClasse}</td>
                            <td>{eachClasse.ordreEnseignement}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                       
        </div>}
        
        
        
    </div>

                
  )
}
