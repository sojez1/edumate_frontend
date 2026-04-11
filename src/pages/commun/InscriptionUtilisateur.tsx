import { useEffect, useState } from "react";
import MyButton from "../../composants/MyButton";
import MyEnumCombo from "../../composants/MyEnumCombo";
import MyTextInput from "../../composants/MyTextInput";
import { myAxios } from "../../axios/MyAxios";
import { getListeRoleUtilisateur } from "../../services/UtilisateurService";


import type { UtilisateurForm } from "../../utilitaires/DataTypes";

const defaultUtilisateur: UtilisateurForm = {
    nom:"",
    prenoms:"",
    username:"",
    email: "",
    telephone:"",
    password:"",
    role: [] as string[]
}

const saveUserUrl: string = "/utilisateurs/new_user";

export default function InscriptionUtilisateur() {

    const [utilisateur, setUtilisateur] = useState<UtilisateurForm>(defaultUtilisateur);
    const [message, setMessage] = useState<string>("");
    const [listeRole, setListeRole] = useState<string[]>([]);


    const defaultUsername = ()=>{
        const nomPrefixe = utilisateur.nom.slice(0,3).toLowerCase();
        const prenomPrefixe = utilisateur.prenoms.slice(0,3).toLowerCase();
        const suffixe = Math.floor(1 + Math.random()*998); // un entier entre 1 et 999
        return `${nomPrefixe}${prenomPrefixe}${suffixe}`;
    }

    const handleUtilisateurChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target

        setUtilisateur((prev)=>({
            ...prev,
            [name]:value
        }))
    }


    const onBtnEnvoyer = async (e:React.FormEvent)=>{
        e.preventDefault();
        try {
            await myAxios.post(saveUserUrl, utilisateur);
            setMessage("Utilisateur creee avec succees");    
        } catch (error) {
            setMessage("Echec lors de l'inscription")
            
        }        

    }

    useEffect(()=>{
        // recuperation de la liste des roles cote serveur
        (async ()=>{
            const roles = await getListeRoleUtilisateur();
            setListeRole(roles);
        })();

    },[]);

    useEffect(()=>{
        if(utilisateur.nom && utilisateur.prenoms){
            setUtilisateur(prev =>({
                ...prev,
                username: defaultUsername()
            }))
        };
    },[utilisateur.nom, utilisateur.prenoms])


  
  
  
  
    return (
    <div>
            <p>Inscription d'un etudiant pour la prochaine rentree scolaire</p>

        {
            !message.trim() &&
            <p>{message}</p>
        
        }


        <form onSubmit={onBtnEnvoyer}>
            <MyTextInput label="nom" name="nom" value={utilisateur.nom} onValueChange={handleUtilisateurChange} required/>
            <MyTextInput label="prenom" name="prenoms" value={utilisateur.prenoms} onValueChange={handleUtilisateurChange} required/>
            <MyTextInput label="nom d'utilisateur" name="username" value={utilisateur.username} onValueChange={handleUtilisateurChange} required/>

            <MyEnumCombo label="fonction" name="role" liste={listeRole} handleSelecteurChange={(roleSelected: string)=>
                setUtilisateur(prev => ({...prev, role:[roleSelected]}))}
            />
            
            <MyTextInput label="email" type="email" name="email"  value={utilisateur.email} onValueChange={handleUtilisateurChange}required/>
            <MyTextInput label="Telephone" name="telephone" value={utilisateur.telephone} onValueChange={handleUtilisateurChange}/>
            <MyTextInput label="mot de passe" type="password" name="password" value={utilisateur.password} onValueChange={handleUtilisateurChange} required/>
            <MyButton label="Envoyer" type="submit"/>
        </form>

    </div>
  )
}
