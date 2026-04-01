import React, { useEffect, useState } from "react";
import MyButton from "../../composants/MyButton";
import MyTextInput from "../../composants/MyTextInput";
import type { decisionAdmission, demandeAdmission } from "../../utilitaires/DataTypes";
import { getDemandeAdmissionByNumeroDemande, listeStatutDemandeAdmission } from "../../services/DemandeAdmissionService";
import MyEnumCombo from "../../composants/MyEnumCombo";
import MyRadioGroup from "../../composants/MyRadioGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { myAxios } from "../../axios/MyAxios";



const url_decision:string = "demande-admission/prendre_decision";




export default function AdmissionPrendreDecision() {

  const location = useLocation();
  const navigateTo = useNavigate();
  const num:string = location.state!.numDemande;

  const initialDecision:decisionAdmission = {
    id:0,
    demandeAdmission:{} as demandeAdmission,
    statut:"",
    necessiteAction:false,
    dateDecision:new Date(),
    dateLimiteAction: new Date(),
    commentaires:""
  }
  

  const [decision, setDecision] = useState<decisionAdmission>(initialDecision);
  const [listeDecision, setListeDecisions] = useState<decisionAdmission[]>([]);
  const [listeStatutDemande, setListeStatutDemande] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  

  //const deadline:number = 14; // delai de 14 jours pour repondre si necessite action

  

  const handleDecisionChange = (e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name, value} = e.target;

    // cas de l'attribut imbriquee demandeAdmission.xyz
    if(name.startsWith("demandeAdmission.")){
      const enfant = name.split(".")[1];
      setDecision((prev)=>({
        ...prev,
        demandeAdmission:{
          ...prev.demandeAdmission,
          [enfant]:value
        }
      }));
    }else{// pour les autres cas
      setListeDecisions((prev)=>({
      ...prev,
      [name]:value
    }))

    }
  }

  useEffect(()=>{
    
    // recuperation du numero de la demande provenant du clic sur btn de listeDemandeAdmission.tsx
     

    if(num == null){
      setMessage("Aucune demande d'admission. Retourner sur la page liste des demandes d'admissions");
      navigateTo("/listeDemandeAdmission");
    }    

    // mettre la valeur du numero demande dans le state
    (async ()=>{      
      const chargerDemandeAdm = await getDemandeAdmissionByNumeroDemande(num);
      console.log(chargerDemandeAdm)
      setDecision((prev)=>({
        ...prev,
        demandeAdmission:chargerDemandeAdm
      }))
    })(); 
    
    //recuperation de la liste des statuts de demande d'admission
    (async ()=>{
      const liste = await listeStatutDemandeAdmission();
      setListeStatutDemande(liste);
    })();

  },[]);



    const handleBtnSoumettre = (e:React.FormEvent)=>{
      e.preventDefault();
      try {
        const {id, ...decisionSansId} = decision; 
        myAxios.post(url_decision,decisionSansId);
        setMessage("Decision enregistree et notification envoyee au candidat");
        
      } catch (error) {
        setMessage("erreur ")
        
      }
      navigateTo("/listeDemandeAdmission");

    }



  return (
    <div>
      <p className="Text fw-bold text-primary fs-3">Rendre une decision d'admission</p>
      {message && <p className="text text-danger fw-bold fs-4">{message}</p>}
        
        <form onSubmit={handleBtnSoumettre} className="card ">
          <MyTextInput label="numero de la demande" name="demandeAdmission.numeroDemande" value={location.state.numDemande} onValueChange={handleDecisionChange}/>
          <div className="container d-flex gap-3">
            <MyTextInput label="statut actuel" name="staut" value={decision.demandeAdmission.numeroDemande} onValueChange={()=>({})} />
            <MyEnumCombo label='Nouveau statut' liste={listeStatutDemande} name='statut' handleSelecteurChange={(val)=>setDecision((prev)=>({...prev,statut:val}))}/>
          </div>
          

          <div>
            <label className="form-label" htmlFor="commentaires">Commentaires</label>
            <textarea className="form-control" autoCorrect="ON" rows={4} name="commentaires"  id="commentaires" value={decision.commentaires} onChange={(val)=>setDecision((prev)=>({...prev, commentaires:val.target.value}))} required></textarea>
          </div>
          
          <MyRadioGroup label="necessite une action ?" nomChamp="necessiteAction" radioDataListe={["OUI", "NON"]} onValueChange={(val)=>setDecision((prev)=>({...prev, necessiteAction:val==="OUI"}))} />
          {decision.necessiteAction && <MyTextInput label="date limite retour" name="dateLimiteAction" placeholder="deadline" type="date" value={(decision.dateLimiteAction).toLocaleDateString()} onValueChange={handleDecisionChange}/>}
          
          <MyButton label="soumettre" type="submit"/>
        </form>
        <div>

          <p>Liste des decisions anterieures</p>
          
          <table className="table table-stripped bordered">
            
            <thead>
              <tr>
                <th>date decision</th>
                <th>numero demande</th>
                <th>Commentaire</th>
                <th>statut</th>
                <th>Necessite action</th>
              </tr>
            </thead>
            <tbody>
              {listeDecision.length > 0 && listeDecision.map(
                (decis)=><tr key={decis.id}>
                  <td>{new Date(decis.dateDecision).toISOString()}</td>
                  <td>{decis.demandeAdmission.numeroDemande}</td>
                  <td>{decis.commentaires}</td>
                  <td>{decis.statut}</td>
                  <td>{decis.necessiteAction?"OUI":"NON"}</td>
                  <td>{new Date(decis.dateLimiteAction).toISOString()}</td> 
                </tr>
              )}

            </tbody>
          </table>
        </div>
        
    </div>
  )
}
