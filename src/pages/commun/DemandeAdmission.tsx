import React, { useEffect, useState } from 'react'
import MyTextInput from '../../composants/MyTextInput'
import type { anneesScolaires, classes, demandeAdmissionForm } from '../../utilitaires/DataTypes'
import { myAxios } from '../../axios/MyAxios'
import MyComboBox from '../../composants/MyComboBox'




const urlAnneeScolaire:string = "/anneeScolaires/lister";
const urlClasses:string = "classes/listerClasses";
const urlEnregistrer:string = "demande-admission/soumettre";

const initialForrmData:demandeAdmissionForm = {
            candidat: {
                nom: "",
                prenom: "",
                sexe: "",
                dateNaissance: "1900-01-01",  // date de naissance par defaut: 01 janvier 1900
                email: "",
                numeroTelephone: "",
                adresse:""
            },
            anneeScolaire: "",
            classeSouhaitee: "",
            motivation: "",
            documentsJoint: [],

}


export default function DemandeAdmission() {

    const [listeAnnees, setListeAnnees] = useState<anneesScolaires[]>([]);
    const [listeClasses, setListeClasses] = useState<classes[]>([]);
    const [demandeAdmissionData, setDemandeAdmissionData] = useState<demandeAdmissionForm>(initialForrmData);
    const [messages, setMessages] = useState<string>("");

    const handleChangeDemandeAdmissiom = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        const {name, value} = e.target;

        if (name.includes(".")){
            const [parent, enfant] = name.split(".");
                   
            setDemandeAdmissionData((prev)=>({
                ...prev,
                [parent]:{
                    ...(prev as any)[parent],
                    [enfant]:value,

                }
            }));


        }else{
            setDemandeAdmissionData((prev)=>({
                ...prev,
                [name]:value,
            }));
        }
        
    };
  

    useEffect(() => {
        // reduperation des annees scolaires
        (async () => {
            const AnneesReponse = await myAxios.get<anneesScolaires[]>(urlAnneeScolaire);
            setListeAnnees(AnneesReponse.data);     
        })();
        
        // recuperations des classes (unites pedagogiques)

        (async ()=>{
            const classesReponse = await myAxios.get<classes[]>(urlClasses);
            setListeClasses(classesReponse.data);

        })();
    }, []);

    const handleBtnSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();

        // adapter la structure des donnees envoyees a la structures attendu cote backend
        const payLoad = {
            ...demandeAdmissionData.candidat,
            classeSouhaitee: demandeAdmissionData.classeSouhaitee,
            anneeScolaire: demandeAdmissionData.anneeScolaire,
            motivation: demandeAdmissionData.motivation,
            listeDocs: demandeAdmissionData.documentsJoint
        }

        try {
            const result = await myAxios.post(urlEnregistrer, payLoad);
            setMessages("Operation reussie "+ result.data)
            setDemandeAdmissionData(initialForrmData);
        }catch(erreur: any){
            setMessages("Echec de la soumission de votre demande d'admission. " + erreur.message)
            console.log(erreur.response?.data || erreur)
        }

    }

    const handleBtnAnnuler = (e:React.FormEvent)=>{
        e.preventDefault();
        setDemandeAdmissionData(initialForrmData);

    }

    


  return (
    <div className='container'>
        <h3>Nouvelle Demande d'admission</h3>
        <p className='text'> Si vous posseder deja un compte (parents, etudiants, enseignants, ...) veuillez vous y connecter et faire la demande d'admission a partir de votre compte.</p>
        {messages!=="" && <div> <p className='text text-danger'>{messages}</p></div>}
        <form onSubmit={handleBtnSubmit}>
            <fieldset className='border border-primary rounded p-3 d-flex flex-column gap-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Informations personnelles du futur etudiant</legend>
                <div className='container'>
                    <MyTextInput label='nom' name='candidat.nom' placeholder='votre nom' value={demandeAdmissionData.candidat.nom} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
                  <MyTextInput  label='prenom' name='candidat.prenom' placeholder='votre prenom' value={demandeAdmissionData.candidat.prenom} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
                  
                  <div className='container d-flex gap-2'>
                    <div className='container d-flex flex-column'>
                        <label className='form-label'>Date de naissance</label>
                        <input className='form-control flex-fill' type='date' name='candidat.dateNaissance'  value={demandeAdmissionData.candidat.dateNaissance} onChange={handleChangeDemandeAdmissiom}/>
                    </div>
                    <div className='container'>
                        <label className='form-label'>sexe <span className='text-danger'>*</span></label>
                        <select className='form-select' name='candidat.sexe' value={demandeAdmissionData.candidat.sexe} onChange={handleChangeDemandeAdmissiom}>
                            <option >--Sélectionner le sexe--</option>
                            <option value="masculin">Masculin</option> 
                            <option value="feminin">Féminin</option>
                        </select>
                    </div>
                    
                  </div>
                  <div className='container d-flex gap-2'>
                    <MyTextInput  label='telephone' name='candidat.numeroTelephone' placeholder='votre numero de telephone' value={demandeAdmissionData.candidat.numeroTelephone} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
                    <MyTextInput  label='email' name='candidat.email' placeholder='votre adresse email' value={demandeAdmissionData.candidat.email} onValueChange={handleChangeDemandeAdmissiom} required={true}/>

                  </div>
                  <MyTextInput  label='adresse' name='candidat.adresse' placeholder='votre adresse' value={demandeAdmissionData.candidat.adresse} onValueChange={handleChangeDemandeAdmissiom} required={true}/>

                </div>
                <div>

                </div>
                
                    
            </fieldset>

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Informations sur les parents</legend>
                <div className='container d-flex gap-2'>
                    {/*
                    <MyTextInput label='nom du pere' name='nomPere' placeholder='nom du parent' value='' required={true}/>
                    <MyTextInput label='prenom du pere' name='prenomPere' placeholder='prenom du parent' value='' required={true}/>
                    */}
                </div>
                <div className='container d-flex gap-2'>
                    {/*
                    <MyTextInput label='nom de la mere' name='nomMere' placeholder='nom du parent' value='' required={true}/>
                    <MyTextInput label='prenom de la mere' name='prenomMere' placeholder='prenom du parent' value='' required={true}/>
                    
                    */}
                    
                </div>
            </fieldset>

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-6 fw-bold text-danger'>Details de la demande d'admission</legend>
                <div className='container d-flex gap-2'>
                  <MyComboBox label='Annee scolaire' nom="anneeScolaire" liste={listeAnnees} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="anneeScolaire" valeur={demandeAdmissionData.anneeScolaire} onValueChange={(val)=>(setDemandeAdmissionData((an)=>({...an, anneeScolaire:String(val)})))} />
                  <MyComboBox label='classe Souhaite' nom="classeSouhaitee" liste={listeClasses} identifiant="id" valeurAfficher={["nomClasse","appelation"]} valeurretouree="nomClasse" valeur={demandeAdmissionData.classeSouhaitee} onValueChange={(val)=>(setDemandeAdmissionData((clas)=>({...clas, classeSouhaitee:String(val)})))}/>
                </div>
                <MyTextInput label='motivation' name='motivation' placeholder='votre motivation' value={demandeAdmissionData.motivation} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
            </fieldset>

            <fieldset className='border border-primary rounded p-3 d-flex flex-column gap-3'>
                <legend>Documents a l'appui de la demande</legend>
                <div className='container d-flex gap-2'>
                    {/** <DocumentATeleverser />*/}
                    
                    
                </div>
            </fieldset>

            

            <div>
                <button type='submit' className='btn btn-primary'>Soumettre</button>
                <button type='button' className='btn btn-secondary ms-2' onClick={handleBtnAnnuler}>Annuler</button>
            </div>
            
            
            

            
                
        </form>
    </div>
  )
}
