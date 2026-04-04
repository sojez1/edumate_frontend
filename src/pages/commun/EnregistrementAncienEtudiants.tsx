import React, { useEffect, useState } from 'react'
import type { anneesScolaires, classes } from '../../utilitaires/DataTypes';
import MyTextInput from '../../composants/MyTextInput';
import MyComboBox from '../../composants/MyComboBox';
import MyButton from '../../composants/MyButton';
import { getAllClasses } from '../../services/ClasseService';
import { getAllSavedAnneeScolaire } from '../../services/AnneeScolaireService';


type etudiantForm ={
    nom: string;
    prenoms: string;
    dateDeNaissance: string;
    lieuDeNaissance: string;
    nationalite: string;
    adresse: string;
    telephoneParent: string;
}

type utilisateurForm = {
    nom: string;
    prenoms: string;
    username: string;
    email: string;
    telephone: string;
    password: string;
    role: string[];
}

type EnregistrementAncienEtudiantsProps = {
    utilisateur: utilisateurForm;
    etudiant: etudiantForm;
    classeActuelle:classes;
    anneeScolaireActuelle: anneesScolaires
}

const defaultUtilisateurForm = {
    nom:"",
    prenoms:"",
    username:"",
    email: "",
    telephone: "",
    password: "",
    role: [] as string[]
}



const defaultEtudiantForm: etudiantForm = {
    nom:"",
    prenoms:"",
    dateDeNaissance: "",
    lieuDeNaissance: "",
    nationalite: "",
    adresse: "",
    telephoneParent: ""
}

const defaultClasse:classes = {
    id: 0,
    nomClasse: "",
    appelation: "",
    ordreEnseignement: ""
}

const defaultAnneeScolaire:anneesScolaires = {
    id: 0,
    anneeScolaire: "",
    active: false
}

export default function EnregistrementAncienEtudiants({utilisateur, etudiant, classeActuelle, anneeScolaireActuelle}:EnregistrementAncienEtudiantsProps) {
  const [newEnregistrementEtudiantActuel, setNewEnregistrementEtudiantActuel] = useState<EnregistrementAncienEtudiantsProps>();
  const [listeClasses, setListeClasses] = useState<classes[]>([]);
  const [listeAnneesScolaires, setListeAnneesScolaires] = useState<anneesScolaires[]>([]);

  const handleNewEnregistrementEtudiantChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setNewEnregistrementEtudiantActuel((prev)=>({
      ...prev!,
      [name]:value
    }));
  }

  const onBtnEnregistrerClick = (e: React.FormEvent)=>{
    e.preventDefault();
  }

  useEffect(()=>{
    // fetch des classes et annees scolaires pour les combo box
    (async ()=>{
      const lesClasses = await getAllClasses();
      setListeClasses(lesClasses)
    })();

    (async ()=>{
      const lesAnneesScolaires = await getAllSavedAnneeScolaire();
      setListeAnneesScolaires(lesAnneesScolaires)
    })();
  },[])



  return (
    <div>
        <p>Enregistrement des anciens etudiants</p>
        <p>Si vous etes un ancien etudiant de l'ecole et que vous n'avez pas encore de compte utilisateur, veuillez vous enregistrer. 
          <br/> Vous pouvez aussi contacter l'administration pour obtenir de l'aide</p>

        <form onSubmit={onBtnEnregistrerClick}>
          <fieldset>
            <legend>Informations sur l'étudiant</legend>
            <MyTextInput label="nom" name="nom" value={etudiant.nom} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="prenom" name="prenoms" value={etudiant.prenoms} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="date de naissance" name="dateDeNaissance" type="date" value={etudiant.dateDeNaissance} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="lieu de naissance" name="lieuDeNaissance" value={etudiant.lieuDeNaissance} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="nationalite" name="nationalite" value={etudiant.nationalite} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="adresse" name="adresse" value={etudiant.adresse} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="telephone parent" name="telephoneParent" value={etudiant.telephoneParent} onValueChange={handleNewEnregistrementEtudiantChange} required/>
          </fieldset>
          <fieldset>
            <legend>Informations sur la classe actuelle</legend>
            <MyComboBox label="classe actuelle" name="classeActuelle" liste={classes} handleSelecteurChange={(classeSelected: string)=>
                setNewEnregistrementEtudiantActuel(prev => ({...prev, classeActuelle:classeSelected}))}
            />

            <MyComboBox label="annee scolaire actuelle" name="anneeScolaireActuelle" liste={anneesScolaires} handleSelecteurChange={(anneeScolaireSelected: string)=>
                setNewEnregistrementEtudiantActuel(prev => ({...prev, anneeScolaireActuelle:anneeScolaireSelected}))}
            />
          </fieldset>
          <fieldset>
            
              <legend>Informations sur les parents</legend>
            <MyTextInput label="nom du parent" name="nomParent" value={utilisateur.nom} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="prenom du parent" name="prenomsParent" value={utilisateur.prenoms} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="telephone du parent" name="telephoneParent" value={utilisateur.telephone} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            <MyTextInput label="email du parent" name="emailParent" type="email" value={utilisateur.email} onValueChange={handleNewEnregistrementEtudiantChange} required/>
            
            
          </fieldset>

          <MyButton label="Enregistrer" type="submit"/>
          <MyButton label="Annuler" type="button"/>


        </form>
    </div>
  )
}
