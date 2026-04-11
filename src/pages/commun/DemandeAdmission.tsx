import React, { useEffect, useState } from 'react'
import MyTextInput from '../../composants/MyTextInput'
import type { anneesScolaires, classes, demandeAdmissionForm, parentsForm, unDocumentForm } from '../../utilitaires/DataTypes'
import { myAxios, myPublicAxios } from '../../axios/MyAxios'
import MyComboBox from '../../composants/MyComboBox'
import DocumentATeleverser from '../../composants/DocumentATeleverser'
import MyRadioGroup from '../../composants/MyRadioGroup'
import {anneeObj, getAllSavedAnneeScolaire } from '../../services/AnneeScolaireService'
import { classeObj, getAllClasses } from '../../services/ClasseService'


const urlEnregistrer:string = "demande-admission/soumettre";

const initialParentsForm:parentsForm = {
    nom:"",
    prenoms:"",
    typeParent:null,
    numeroTelephone:"",
    courriel:""
}


const initialForrmData:demandeAdmissionForm = {
            candidatAdmission: {
                nom: "",
                prenom: "",
                sexe: "",
                dateNaissance: "2000-01-01",  // date de naissance par defaut: 01 janvier 1900
                email: "",
                numeroTelephone: "",
                adresse:""
            },
            anneeScolaire: {
                id: 0,
                anneeScolaire:"",
                active: false
            },
            classeSouhaitee: {
                id:0,
                nomClasse:"",
                appelation:"",
                ordreEnseignement:""

            },
            motivation: "",
            //documentsJoint: [],
            parents: [initialParentsForm, initialParentsForm, initialParentsForm],
            vieAvecLesDeuxParents: true,
}


export default function DemandeAdmission() {

    const [listeAnnees, setListeAnnees] = useState<anneesScolaires[]>([]);
    const [AnneeSccolaireChoisie, setAnneeScolaireChoisie] = useState<string>("");
    const [listeClasses, setListeClasses] = useState<classes[]>([]);
    const [classeChoisie, setClasseChoisie] = useState<string>("");
    const [listeOptions, setListeOption] = useState<string[]>([]); // type parents (PERE, MERE, TUTEUR)
    const listeOuiNon: string[] = ["OUI", "NON"]

    const [demandeAdmissionData, setDemandeAdmissionData] = useState<demandeAdmissionForm>(initialForrmData);
    const [messages, setMessages] = useState<string>("");

    const [listeDocs, setListDocs] = useState<unDocumentForm[]>([]);

    // gestion des changements de valeurs dans le formulaire de demande d'admission
    const handleChangeDemandeAdmissiom = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        const {name, value} = e.target;

        // cas parents[index].nomDuChamp
        const leParent = name.match(/parents\[(\d+)\]\.(\w+)/);
        if(leParent){
            const index = Number(leParent[1]);
            const champ = leParent[2];
            setDemandeAdmissionData((prev)=>{
                const parentModifie = [...prev.parents];
                parentModifie[index] ={
                    ...parentModifie[index],
                    [champ]:value
                }
                return {
                    ...prev,
                    parents:parentModifie,
                }
            })
            return;
        }
        
        
        // Cas annees scolaires. Transformer annee scolaire String du combo en annee scolaire Objet
        const annee = anneeObj(AnneeSccolaireChoisie, listeAnnees);
        if (annee){
            setDemandeAdmissionData((prev)=>({...prev, anneeScolaire:annee}));
        };

        // Cas des classes. Transformation classe string en classe objet
        const clas = classeObj(classeChoisie, listeClasses);
        if(clas){
            setDemandeAdmissionData((prev)=>({...prev, classeSouhaitee:clas}));
        }
              
        // cas candidatAdmission.champ
        if (name.includes(".")){
            const [parent, enfant] = name.split(".");
                   
            setDemandeAdmissionData((prev)=>({
                ...prev,
                [parent]:{
                    ...(prev as any)[parent],
                    [enfant]:value,

                }
            }));
            return;
        }
        
        
        // pour les autres champs simples
        setDemandeAdmissionData((prev)=>({
            ...prev,
            [name]:value,
        }));
        
        
    };

    

    
  

    useEffect(() => {
        // recuperation des annees scolaires
        (async () => {
            const listeDesAnneeScolaire = await getAllSavedAnneeScolaire();
            setListeAnnees(listeDesAnneeScolaire);     
        })();
        
        // recuperations des classes (unites pedagogiques)

        (async ()=>{
            const getAllsavedClasse = await getAllClasses();
            setListeClasses(getAllsavedClasse);

        })();

        // recuperer la liste des types de parents
        (async ()=>{
            const listeType = await myPublicAxios.get<string[]>("enumerations/getTypeParents")
            setListeOption(listeType.data);
        })();

    },[]);
    

    const handleBtnSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();


        const payload = new FormData();       

        payload.append("demandeAdmission", new Blob([JSON.stringify(demandeAdmissionData)], {type: "application/json"}));
        listeDocs.forEach((docs => {
            payload.append("documentsJoint", docs.documentData)
        }))
        console.log(demandeAdmissionData)
        console.log(payload)

        // sauvegarde des donnees via l'API

        try {
            const result = await myAxios.post(urlEnregistrer,payload);
            setMessages("Operation reussie "+ result.data)
            setDemandeAdmissionData(initialForrmData);
        }catch(erreur: any){
            setMessages("Echec de la soumission de votre demande d'admission. " + erreur)
        }

    }

    const handleBtnAnnuler = (e:React.FormEvent)=>{
        e.preventDefault();
        setDemandeAdmissionData(initialForrmData);

    }

    const updateTypeParents = (i: number, valeur: string | null) => {
        valeur = valeur ==="" ? null : valeur;
        setDemandeAdmissionData(prev => {
            const parentsModifies = [...prev.parents];

            parentsModifies[i] = {
                ...parentsModifies[i],
                typeParent: valeur
            };

            return {
                ...prev,
                parents: parentsModifies
            };
        });
};

    


  return (
    <div className='container d-flex flex-column gap-3'>
        <div>
            <h3 className='text fw-bold fs-3 text-primary'>Nouvelle Demande d'admission</h3>
            <p className='text'> Si vous posseder deja un compte (parents, etudiants, enseignants, ...) veuillez vous y connecter et faire la demande d'admission a partir de votre compte.</p>
            {messages &&  <p className='text text-danger'>{messages}</p>}
            
        </div>
        
        <form onSubmit={handleBtnSubmit}>
            
            {/*-------Informations personnelles --------*/}

            <fieldset className='border border-primary rounded p-3 d-flex flex-column gap-3'>
                <legend className='float-none w-auto px-2 fs-4 fw-bold text-danger'>Informations personnelles du futur etudiant</legend>
                <div className='container'>
                    <MyTextInput label='nom' name='candidatAdmission.nom' placeholder='votre nom' value={demandeAdmissionData.candidatAdmission.nom} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
                    <MyTextInput  label='prenom' name='candidatAdmission.prenom' placeholder='votre prenom' value={demandeAdmissionData.candidatAdmission.prenom} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
                  
                  <div className='container d-flex flex-column gap-3'>
                        <div className='container d-flex gap-2'>
                    <div className='container d-flex flex-column'>
                        <label className='form-label'>Date de naissance <span className='text-danger'>*</span></label>
                        <input className='form-control flex-fill' type='date' name='candidatAdmission.dateNaissance'  value={demandeAdmissionData.candidatAdmission.dateNaissance} onChange={handleChangeDemandeAdmissiom}/>
                    </div>

                    <div className='container'>
                        <label className='form-label'>sexe <span className='text-danger'>*</span></label>
                        <select className='form-select' name='candidatAdmission.sexe' value={demandeAdmissionData.candidatAdmission.sexe} onChange={handleChangeDemandeAdmissiom}>
                            <option >--Sélectionner le sexe--</option>
                            <option value="masculin">Masculin</option> 
                            <option value="feminin">Féminin</option>
                        </select>
                    </div>
                    
                  </div>
                  <div className='container d-flex gap-2'>
                    <MyTextInput  type='tel' label='telephone' name='candidatAdmission.numeroTelephone' placeholder='votre numero de telephone' value={demandeAdmissionData.candidatAdmission.numeroTelephone} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
                    <MyTextInput  type='email' label='email' name='candidatAdmission.email' placeholder='votre adresse email' value={demandeAdmissionData.candidatAdmission.email} onValueChange={handleChangeDemandeAdmissiom} required={true}/>

                  </div>

                  </div>
                  
                  <MyTextInput  label='adresse' name='candidatAdmission.adresse' placeholder='votre adresse' value={demandeAdmissionData.candidatAdmission.adresse} onValueChange={handleChangeDemandeAdmissiom} required={true}/>

                </div>
                <div>

                </div>       
            </fieldset>


            {/* ----------------   Details de la demande ------------------------------------------*/}

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-4 fw-bold text-danger'>Details de la demande d'admission</legend>
                <div className='container d-flex flex-column gap-3'>
                    <div className='container d-flex gap-2'>
                        <MyComboBox required label='Annee scolaire' nom="anneeScolaire" liste={listeAnnees} identifiant="id" valeurAfficher="anneeScolaire" valeurretouree="anneeScolaire" valeur={AnneeSccolaireChoisie} onValueChange={(val)=>setAnneeScolaireChoisie(String(val))} />
                        <MyComboBox required label='classe Souhaite' nom="classeSouhaitee" liste={listeClasses} identifiant="id" valeurAfficher={["nomClasse","appelation"]} valeurretouree="nomClasse" valeur={classeChoisie} onValueChange={(val)=>(setClasseChoisie(String(val)))}/>
                    </div>                
                    <MyTextInput label='motivation' name='motivation' placeholder='votre motivation' value={demandeAdmissionData.motivation} onValueChange={handleChangeDemandeAdmissiom} required={true}/>
                </div>     
            </fieldset>

            {/* ---------------Informations sur les parents ------------------------- */}

            <fieldset className='border border-primary rounded p-3'>
                <legend className='float-none w-auto px-2 fs-4 fw-bold text-danger'>Informations sur les parents</legend>
                { demandeAdmissionData.parents.map((parent, index)=>{
                    
                    const obligatoire = index < 2;
                    
                    return (                        
                    <div className='container border d-flex flex-column gap-2' key={index}>
                        <h5 className='text fw-bold text-primary'>Informations du parent {index + 1} {!obligatoire && "(Tuteur ou gardiens)"}</h5>                        
                        <div>
                            <MyRadioGroup nomChamp={`parents[${index}].typeParent`} radioDataListe={listeOptions} onValueChange={(valeur)=>{if (typeof valeur ==='string') updateTypeParents(index, valeur)}}/>
                            <MyTextInput label='nom' name={`parents[${index}].nom`} placeholder='nom du parent' value={parent.nom} onValueChange={handleChangeDemandeAdmissiom} required={obligatoire}/>
                            <MyTextInput label='prenom' name={`parents[${index}].prenoms`} placeholder='prenom du parent' value={parent.prenoms} onValueChange={handleChangeDemandeAdmissiom} required={obligatoire}/>
                            <MyTextInput type='email' label='Email' name={`parents[${index}].courriel`} placeholder='prenom du parent' value={parent.courriel} onValueChange={handleChangeDemandeAdmissiom} required={obligatoire}/>
                            <MyTextInput type='tel' label='numero de telephone' name={`parents[${index}].numeroTelephone`} placeholder='prenom du parent' value={parent.numeroTelephone} onValueChange={handleChangeDemandeAdmissiom} required={obligatoire}/>
                        </div>                                                
                    </div>)
                })}
            </fieldset> 

            {/* -----------------------Situation familiale ---------------------------- */}  
            <fieldset className='border border-primary rounded p-3 d-flex flex-column gap-3'>
                <legend className='float-none w-auto px-2 fs-4 fw-bold text-danger'>Situation familiale</legend>
                <div>
                    <MyRadioGroup label="L'enfant vie avec ses deux parents? :" nomChamp='vieAvecLesDeuxParents' radioDataListe={listeOuiNon} onValueChange={(val)=>(setDemandeAdmissionData((prev)=>({...prev, vieAvecLesDeuxParents:val==="OUI" })))} multiple={false}   />
                </div>
            </fieldset>

            {/*------------Documents soumis --------------------------------------- */}

            <fieldset className='border border-primary rounded p-3 d-flex flex-column gap-3'>
                <legend className='float-none w-auto px-2 fs-4 fw-bold text-danger'>Documents a l'appui de la demande</legend>
                <div className='container d-flex gap-2'>  
                    <DocumentATeleverser handleLoadedFiles={setListDocs}/>                   
                </div>
            </fieldset>

            {/* -------------------------boutons ----------------------- */}

            <div className='container d-flex flex-row gap-3'>
                <button type='submit' className='btn btn-primary'>Soumettre</button>
                <button type='button' className='btn btn-secondary ms-2' onClick={handleBtnAnnuler}>Annuler</button>
            </div>       
        </form>
    </div>
  )
}
