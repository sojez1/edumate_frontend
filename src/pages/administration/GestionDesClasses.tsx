import React, { useState, useEffect } from 'react'
import type { classeForm, classes } from '../../utilitaires/DataTypes'
import { myAxios } from '../../axios/MyAxios';
import MyTextInput from '../../composants/MyTextInput';
import MyEnumCombo from '../../composants/MyEnumCombo';

const saveClasseUrl = 'classes/ajouterClasse'; //URL pour enregistrer une nouvelle classe
const getAllClassesUrl = 'classes/listerClasses';//URL pour recuperer la liste des classes existantes

const defaultClasseFormData:classeForm ={
    nomClasse:"",
    appelation:"",
    ordreEnseignement:""
}


export default function GestionDesClasses() {

    const [newClasseData, setNewClasseData] = useState<classeForm>(defaultClasseFormData);
    const [listeClasses, setListeClasses] = useState<classes[]>([]);
    const [niveauxEnseignement, setNiveauxEnseignement] = useState<string[]>([]);

    const handleClasseDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        
        const {name, value} = e.target;

        setNewClasseData((oldData) => ({
            ...oldData,
            [name]:value
        }));
    }

    // Fonction pour récupérer la liste des classes depuis le backend
    const handleListeClasses = async ()=>{
        try{
            const response = await myAxios.get(getAllClassesUrl);
            setListeClasses(response.data);
        }catch(error){
            console.error("Erreur lors de la récupération des classes:", error);
        }
        
    }

    // Fonction pour récupérer les ordres d'enseignement depuis le backend
    const handleListeOrdreEnseignement = async ()=>{
        try{
            const {data} = await myAxios.get("/enumerations/ordreEnseignements");
            setNiveauxEnseignement(data);
        }catch(error){
            console.error("Erreur lors de la récupération des ordres d'enseignement:", error);
        }
    }

    // useEffect pour charger les données initiales
    useEffect(()=>{
        handleListeClasses();
        handleListeOrdreEnseignement();
        
    }, []) 

    // Fonction pour enregistrer une nouvelle classe
    const handleSaveNewClasse = async (e: React.FormEvent)=>{
        e.preventDefault();
        myAxios.post(saveClasseUrl, newClasseData)
        .then((response)=>{
            alert("Classe enregistrée avec succès");
            handleListeClasses(); // Met à jour la liste des classes après l'enregistrement
        })
        .catch((error)=>{
            console.error("Erreur lors de l'enregistrement de la classe:", error);
        });
    }

    const handleBtnAnnuler = (e: React.FormEvent)=>{
        e.preventDefault();
        setNewClasseData(defaultClasseFormData);
    }

    
    
     


  return (
    <div className='container'>
        <div>
            <form onSubmit={handleSaveNewClasse}>
                <h3>Ajouter une nouvelle classe</h3>
                <MyTextInput label='Nom de la classe' name='nomClasse' value={newClasseData?.nomClasse || ''} onValueChange={handleClasseDataChange} placeholder='ex: 6eme A' required/>
                <MyTextInput label='Appelation' name='appelation' value={newClasseData?.appelation || ''} onValueChange={handleClasseDataChange} placeholder='ex: sixieme A' required/>    
                <MyEnumCombo label='Niveau d enseignement' name='ordreEnseignement' liste={niveauxEnseignement} required={true} />
                <div className='mt-3'>
                    <button type='submit' className='btn btn-primary'>Enregistrer</button>
                    <button type='button' className='btn btn-secondary ms-2' onClick={handleBtnAnnuler}>Annuler</button>
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
                        <th>Action</th>   
                    </tr>
                </thead>
                <tbody>
                    {listeClasses.map((eachClasse, index) => (
                        <tr key={eachClasse.id}>
                            <td>{index + 1}</td>
                            <td>{eachClasse.nomClasse}</td>
                         <td>{eachClasse.ordreEnseignement}</td>
                         <td>
                            <button className='btn btn-sm btn-primary me-2'>Modifier</button>
                            <button className='btn btn-sm btn-danger'>Supprimer</button>
                         </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                       
        </div>}
        
        
        
    </div>

                
  )
}
