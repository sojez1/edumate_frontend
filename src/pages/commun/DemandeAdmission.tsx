import React from 'react'
import MyTextInput from '../../composants/MyTextInput'

export default function DemandeAdmission() {
  return (
    <div className='container'>
        <h3>Nouvelle Demande d'admission</h3>
        <form>
            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Informations personnelles du futur etudiant</legend>
                <div className='container d-flex gap-2'>
                  <MyTextInput label='nom' name='nom' placeholder='votre nom' value='' required={true}/>
                  <MyTextInput label='prenom' name='prenom' placeholder='votre prenom' value='' required={true}/>
                  <select name='sexe' className='form-select'>
                    <option value="">--Sélectionner le sexe--</option>
                    <option value="masculin">Masculin</option> 
                    <option value="feminin">Féminin</option>
                  </select>

                </div>
                    
            </fieldset>

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Informations sur les parents</legend>
                <div>
                    <MyTextInput label='nom du pere' name='nomPere' placeholder='nom du parent' value='' required={true}/>
                    <MyTextInput label='prenom du pere' name='prenomPere' placeholder='prenom du parent' value='' required={true}/>
                </div>
                <div>
                    <MyTextInput label='nom de la mere' name='nomMere' placeholder='nom du parent' value='' required={true}/>
                    <MyTextInput label='prenom de la mere' name='prenomMere' placeholder='prenom du parent' value='' required={true}/>
                </div>
            </fieldset>

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Details de la demande d'admission</legend>
                <div>
                  <label>Annee Scolaire 2025-2026</label>
                    <MyTextInput label='classe demandee' name='classeDemandee' placeholder='classe demandee' value='' required={true}/>
                    
                    <MyTextInput label='motivation' name='motivation' placeholder='votre motivation' value='' required={true}/>
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
