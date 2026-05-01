/**
 * Page d'enregistrement des anciens etudiants de l'ecole. Cette page est accessible a tous les anciens etudiants qui n'ont pas encore de compte utilisateur.
 * Elle leur permettra de s'enregistrer en fournissant les informations necessaires sur eux meme, leur classe actuelle et leur annee scolaire actuelle. 
 * Une fois que l'ancien etudiant a rempli le formulaire d'enregistrement et soumis, un compte utilisateur lui sera creee et il pourra se connecter a l'application avec les identifiants qu'il a fournis lors de l'enregistrement.
 * En cas de probleme lors de l'enregistrement, l'ancien etudiant peut contacter l'administration pour obtenir de l'aide.
 */

import { useEffect, useState } from "react";
import MyComboBox from "../../composants/MyComboBox";
import { getAllSavedAnneeScolaire } from "../../services/AnneeScolaireService";
import { getAllClasses } from "../../services/ClasseService";
import type { anneesScolaires, classes } from "../../utilitaires/DataTypes";
import MyButton from "../../composants/MyButton";
import MyTextInput from "../../composants/MyTextInput";
import { myPublicAxios } from "../../axios/MyAxios";

import type { oldStudentForm } from "../../utilitaires/DataTypes";
import { defaultOldStudentForm } from "../../utilitaires/DefaultDataValue";



export default function EnregistrementAncienEtudiants() {
    //const navigateTo = useNavigate();
    //const errorZone = useRef(null);

    const [listeClasses, setListeClasses] = useState<classes[]>([]);
    const [shortListeAnneeScolaire, setShortListeAnneeScolaire] = useState<anneesScolaires[]>([]);
    const [message, setMessage] = useState<string>("");
    const [studentFormData, setStudentFormData] = useState<oldStudentForm>(defaultOldStudentForm);
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const url_enrolerAncienEtudiant = "/etudiants/enroler_ancien_etudiant";

      


    const handleEtudiantDataChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setStudentFormData((prev)=>({
            ...prev,
            etudiant:{
                ...prev.etudiant,
                [name]:value
            }
        }))

    }
    
    const handleAnneeScolaireChange = (selectedAnneeId:number)=>{
        
      // get the anneeScolaire from the listAnneeScolaire according to the seleted anneeScolaire id.
        const selectedAnnee = shortListeAnneeScolaire.find(annee => annee.id === selectedAnneeId);

        if(!selectedAnnee){
            setMessage("Annee scolaire selectionnee invalide. Veuillez selectionner une annee scolaire valide dans la liste.");
            return;
        }
        setStudentFormData((prev)=>({
            ...prev,
            anneeScolaire: selectedAnnee
        }))
    };

    const handleClasseChange = (selectedClasseId:number)=>{
        // get the classe from the listClasse according to the seleted classe id.
        const selectedClasse = listeClasses.find(classe => classe.id === selectedClasseId);
        if(!selectedClasse){
            setMessage("Classe selectionnee invalide. Veuillez selectionner une classe valide dans la liste.");
            return;
        }
        setStudentFormData((prev)=>({
            ...prev,
            classe: selectedClasse
        }))
    };

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


        const handleConfirmPassword = ()=>{
            if(confirmPassword !== studentFormData.etudiant.password){
                setMessage("Le mot de passe et la confirmation du mot de passe ne correspondent pas. Veuillez verifier les deux champs et reessayer.");
                return;
            }else{
                setMessage("");
            }
        }

        const onBtnSoumettre = async (e:React.FormEvent)=>{
            e.preventDefault();
            try{
                // validation des donnees saisies
                if(!studentFormData.etudiant.nom.trim() || !studentFormData.etudiant.prenoms.trim() || !studentFormData.etudiant.email.trim() || !studentFormData.etudiant.username.trim() || !studentFormData.etudiant.password.trim() || !studentFormData.classe || !studentFormData.anneeScolaire){
                    setMessage("Veuillez remplir tous les champs du formulaire pour pouvoir soumettre votre demande d'enregistrement");
                    return;
                }
                // Assigner le role ELEVE a l'utilisateur cree
                studentFormData.etudiant.role = ["ETUDIANT"];
              
                // soumission des donnees au backend pour enregistrement
                await myPublicAxios.post(url_enrolerAncienEtudiant, studentFormData);
                setMessage("Votre demande d'enregistrement a ete soumise avec succees. L'administration de votre ecole va examiner votre demande et vous informer de la suite a donner dans les plus brefs delais. En cas de probleme de connexion ou pour toute autre question, veuillez contacter le support technique pour obtenir de l'aide.");
                
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
                <MyTextInput required label="Nom" name="nom" value={studentFormData.etudiant.nom} onValueChange={handleEtudiantDataChange} placeholder="nom"/>
                <MyTextInput required label="Prenom" name="prenoms" value={studentFormData.etudiant.prenoms} onValueChange={handleEtudiantDataChange} placeholder="prenoms"/>
              </div>
              <div className="container d-flex flex-row gap-3">
                <MyTextInput label="Matricule" name="matricule" value={studentFormData.etudiant.matricule} onValueChange={handleEtudiantDataChange} placeholder="nom" required/>
                
              </div>
              <div>
                <MyTextInput required label="Adresse email" name="email" type="email" value={studentFormData.etudiant.email} onValueChange={handleEtudiantDataChange}/>
                <MyTextInput label="Telephone" name="telephone" value={studentFormData.etudiant.telephone} onValueChange={handleEtudiantDataChange}/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text text-primary fw-bold justify-content-end">Information pour le login</legend>
            <div>
              <MyTextInput label="Nom d'utilisateur" name="username" value={studentFormData.etudiant.username} onValueChange={handleEtudiantDataChange} placeholder="nom d'utilisateur" required/>
              <MyTextInput required label="Mot de passe" name="password" type="password" value={studentFormData.etudiant.password} onValueChange={handleEtudiantDataChange}/>
              <div className='form-floating mb-3 flex-fill'>
                <label className="form-label">Confirmer le mot de passe <span className="text text-danger">*</span></label>
                <input className="form-control" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirmer le mot de passe" onBlur={handleConfirmPassword} required/>
              </div>
              
            </div>
          </fieldset>


          <fieldset>
            <legend className="text text-primary fw-bold justify-content-end">Donnees scolaire de l'annee courante</legend>
            <div className="container d-flex flex-row gap-3">
              <MyComboBox required label="Classe actuelle" nom="classe" liste={listeClasses} identifiant="id" valeurAfficher={["nomClasse","appelation"]} valeurretouree="id" onValueChange={(clas)=>{handleClasseChange(Number(clas))}} />
              <MyComboBox required label="Annee scolaire actuelle" nom="anneeScolaire" liste={shortListeAnneeScolaire} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="id" onValueChange={(annee)=>{handleAnneeScolaireChange(Number(annee))}}/>
            </div>            
          </fieldset>
          <div>
            <MyButton label="Soumettre" type="submit" className="btn btn-primary"/>
          </div>
          

        </form>
    </div>
  )
}
