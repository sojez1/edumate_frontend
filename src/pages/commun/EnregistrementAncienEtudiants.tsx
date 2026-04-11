/**
 * Page d'enregistrement des anciens etudiants de l'ecole. Cette page est accessible a tous les anciens etudiants qui n'ont pas encore de compte utilisateur.
 * Elle leur permettra de s'enregistrer en fournissant les informations necessaires sur eux meme, leur classe actuelle et leur annee scolaire actuelle. 
 * Une fois que l'ancien etudiant a rempli le formulaire d'enregistrement et soumis, un compte utilisateur lui sera creee et il pourra se connecter a l'application avec les identifiants qu'il a fournis lors de l'enregistrement.
 * En cas de probleme lors de l'enregistrement, l'ancien etudiant peut contacter l'administration pour obtenir de l'aide.
 */

import { useEffect, useRef, useState } from "react";
import MyComboBox from "../../composants/MyComboBox";
import { getAllSavedAnneeScolaire } from "../../services/AnneeScolaireService";
import { getAllClasses } from "../../services/ClasseService";
import type { anneesScolaires, classes } from "../../utilitaires/DataTypes";
import MyButton from "../../composants/MyButton";
import MyTextInput from "../../composants/MyTextInput";
import { useNavigate } from "react-router-dom";
import { myPublicAxios } from "../../axios/MyAxios";

import type { oldStudentForm } from "../../utilitaires/DataTypes";
import { defaultOldStudentForm } from "../../utilitaires/DefaultDataValue";



export default function EnregistrementAncienEtudiants() {
    const navigateTo = useNavigate();
    const errorZone = useRef(null);

    const [listeClasses, setListeClasses] = useState<classes[]>([]);
    const [shortListeAnneeScolaire, setShortListeAnneeScolaire] = useState<anneesScolaires[]>([]);
    const [message, setMessage] = useState<string>("");
    const [studentFormData, setStudentFormData] = useState<oldStudentForm>(defaultOldStudentForm);  


    const handleEtudiantDataChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setStudentFormData((prev)=>({
            ...prev,
            etudiant:{
                ...prev.etudiant,
                utilisateur:{
                    ...prev.etudiant.utilisateur,
                    [name]:value
                },
                matricule: name === "matricule" ? value : prev.etudiant.matricule
            }
        }))

    } 

    useEffect(() => {
            // recuperation des annees scolaires
            (async () => {
                const listeDesAnneeScolaire = await getAllSavedAnneeScolaire();
                setShortListeAnneeScolaire(listeDesAnneeScolaire);     
            })();
            
            // recuperations des classes (unites pedagogiques)
    
            (async ()=>{
                const getAllsavedClasse = await getAllClasses();
                setListeClasses(getAllsavedClasse);    
            })();
    
        },[]);

        const onBtnSoumettre = (e:React.FormEvent)=>{
            e.preventDefault();
            try{
                // validation des donnees saisies
                if(!studentFormData.etudiant.utilisateur.nom.trim() || !studentFormData.etudiant.utilisateur.prenoms.trim() || !studentFormData.etudiant.utilisateur.email.trim() || !studentFormData.etudiant.utilisateur.username.trim() || !studentFormData.etudiant.utilisateur.password.trim() || !studentFormData.classe || !studentFormData.anneeScolaire){
                    setMessage("Veuillez remplir tous les champs du formulaire pour pouvoir soumettre votre demande d'enregistrement");
                    return;
                }
                // soumission des donnees au backend pour enregistrement
                async ()=>{
                    await myPublicAxios.post("/etudiants/enroler_ancien_etudiant", studentFormData);
                    setMessage("Votre demande d'enregistrement a ete soumise avec succees. L'administration de votre ecole va examiner votre demande et vous informer de la suite a donner dans les plus brefs delais. En cas de probleme de connexion ou pour toute autre question, veuillez contacter le support technique pour obtenir de l'aide.");
                }
            }
            catch(error){
                setMessage("Echec lors de l'enregistrement. Veuillez reessayer plus tard ou contacter le support technique en cas de probleme de connexion.") 
            }

        }
  

  return (
    <div>
        <p className="text text-uppercase text-danger fw-bold fs-4">Enregistrement d'un etudiant dans le systeme de gestionde l'ecole</p>
        <p className="text text-muted">Veuillez remplir le formulaire ci-dessous pour vous enregistrer sur la nouvelle plateforme. <br/> L'administration de votre ecole pourra ensuite valider votre demande d'enregistrement.</p>

        {message && <p className="text text-danger text-center">{message}</p>}        
        
        <form className="container d-flex flex-column gap-3" onSubmit={onBtnSoumettre}>

          <fieldset>
            <legend className="text text-primary fw-bold justify-content-end">Informations personnelles</legend>
            <div>
              <div className="container d-flex flex-row gap-3">
                <MyTextInput required label="Nom" name="nom" value={studentFormData.etudiant.utilisateur.nom} onValueChange={handleEtudiantDataChange} placeholder="nom"/>
                <MyTextInput required label="Prenom" name="prenoms" value={studentFormData.etudiant.utilisateur.prenoms} onValueChange={handleEtudiantDataChange} placeholder="prenoms"/>
              </div>
              <div className="container d-flex flex-row gap-3">
                <MyTextInput label="Matricule" name="matricule" value={studentFormData.etudiant.matricule} onValueChange={handleEtudiantDataChange} placeholder="nom" required/>
                
              </div>
              <div>
                <MyTextInput required label="Adresse email" name="email" type="email" value={studentFormData.etudiant.utilisateur.email} onValueChange={handleEtudiantDataChange} required/>
                <MyTextInput label="Telephone" name="telephone" value={studentFormData.etudiant.utilisateur.telephone} onValueChange={handleEtudiantDataChange}/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text text-primary fw-bold justify-content-end">Information pour le login</legend>
            <div>
              <MyTextInput label="Nom d'utilisateur" name="username" value={studentFormData.etudiant.utilisateur.username} onValueChange={handleEtudiantDataChange} placeholder="nom d'utilisateur" required/>
              <MyTextInput required label="Mot de passe" name="password" type="password" value={studentFormData.etudiant.utilisateur.password} onValueChange={handleEtudiantDataChange}/>
              <MyTextInput label="Confirmer le mot de passe" name="confirmerMotDePasse" type="password" value="" onValueChange={(e)=>e.target.value} required/>
            </div>
          </fieldset>


          <fieldset>
            <legend className="text text-primary fw-bold justify-content-end">Donnees scolaire de l'annee courante</legend>
            <div className="container d-flex flex-row gap-3">
              <MyComboBox required label="Classe actuelle" nom="classeActuelle" liste={listeClasses} identifiant="id" valeurAfficher={["nomClasse","Appelation"]} valeurretouree="id" />
              <MyComboBox required label="Annee scolaire actuelle" nom="anneeScolaireActuelle" liste={shortListeAnneeScolaire} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="id"/>
            </div>            
          </fieldset>
          <div>
            <MyButton label="Soumettre" type="submit" className="btn btn-primary"/>
          </div>
          

        </form>
    </div>
  )
}
