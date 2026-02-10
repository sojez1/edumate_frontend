import React, { useEffect, useState } from 'react'
import MyTextInput from '../../composants/MyTextInput'
import type { anneesScolaires, classes } from '../../utilitaires/DataTypes'
import { myAxios } from '../../axios/MyAxios'
import MyComboBox from '../../composants/MyComboBox'
import DocumentATeleverser from '../../composants/DocumentATeleverser'


export default function DemandeAdmission() {

    const[listeAnnees, setListeAnnees] = useState<anneesScolaires[]>([]);
    const [listeClasses, setListeClasses] = useState<classes[]>([])
    const [anneeScolaire, setAnneeScolaire]= useState("");
    const [listeDoc, setListeDoc] = useState<File[]>([]);

    const handleAnneeScolaireChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setAnneeScolaire(e.target.value)
    }

    const [dateNaissance, setDateNaissance] = React.useState<Date | null>(null)  

    useEffect(() => {
        // reduperation des annees scolaires
        (async () => {
            const AnneesReponse = await myAxios.get<anneesScolaires[]>("/anneeScolaires/lister");
            setListeAnnees(AnneesReponse.data);     
        })();
        
        // recuperations des classes (unites pedagogiques)

        (async ()=>{
            const classesReponse = await myAxios.get<classes>("classes/listerClasses");
            setListeClasses(classesReponse.data);

        })();


    }, [])

    const ajouterunDoc = (fichier:File)=>{



    }


  return (
    <div className='container'>
        <h3>Nouvelle Demande d'admission</h3>
        <p className='text'> Si vous posseder deja un compte (parents, etudiants, enseignants, ...) veuillez vous y connecter et faire la demande d'admission a partir de votre compte.</p>
        <form>
            <fieldset className='border border-primary rounded p-3 d-flex flex-column gap-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Informations personnelles du futur etudiant</legend>
                <div>
                    <MyTextInput label='nom' name='nom' placeholder='votre nom' value='' required={true}/>
                  <MyTextInput  label='prenom' name='prenom' placeholder='votre prenom' value='' required={true}/>
                  
                  <div className='container d-flex gap-2'>
                    <div className='container d-flex flex-column'>
                        <label className='form-label'>Date de naissance</label>
                        <input type='date' className='form-control flex-fill'/>
                    </div>

                    <div className='container'>
                        <label className='form-label'>sexe <span className='text-danger'>*</span></label>
                        <select name='sexe' className='form-select'>
                            <option value="">--Sélectionner le sexe--</option>
                            <option value="masculin">Masculin</option> 
                            <option value="feminin">Féminin</option>
                        </select>
                    </div>

                  </div>
                  <div className='container d-flex gap-2'>
                    <MyTextInput  label='telephone' name='telephone' placeholder='votre numero de telephone' value='' required={true}/>
                    <MyTextInput  label='email' name='email' placeholder='votre adresse email' value='' required={true}/>

                  </div>
                  <MyTextInput  label='adresse' name='adresse' placeholder='votre adresse' value='' required={true}/>

                </div>
                <div>

                </div>
                
                    
            </fieldset>

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Informations sur les parents</legend>
                <div className='container d-flex gap-2'>
                    <MyTextInput label='nom du pere' name='nomPere' placeholder='nom du parent' value='' required={true}/>
                    <MyTextInput label='prenom du pere' name='prenomPere' placeholder='prenom du parent' value='' required={true}/>
                </div>
                <div className='container d-flex gap-2'>
                    <MyTextInput label='nom de la mere' name='nomMere' placeholder='nom du parent' value='' required={true}/>
                    <MyTextInput label='prenom de la mere' name='prenomMere' placeholder='prenom du parent' value='' required={true}/>
                </div>
            </fieldset>

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Details de la demande d'admission</legend>
                <div className='container d-flex gap-2'>
                  <MyComboBox label='Annee scolaire' nom="anneeScoalire" liste={listeAnnees} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="id"/>
                  <MyComboBox label='classe Souhaite' nom="classe" liste={listeClasses} identifiant="id" valeurAfficher={["nomClasse","appelation"]} valeurretouree="id"/>
                </div>
                <MyTextInput label='motivation' name='motivation' placeholder='votre motivation' value='' required={true}/>
            </fieldset>

            <fieldset className='border border-primary rounded p-3 d-flex flex-column gap-3'>
                <legend>Documents a l'appui de la demande</legend>
                <DocumentATeleverser/>
                <div>
                    
                </div>
            </fieldset>

            <div>
                <button type='submit' className='btn btn-primary'>Soumettre</button>
                <button type='button' className='btn btn-secondary ms-2'>Annuler</button>
            </div>

            
                
        </form>
    </div>
  )
}
