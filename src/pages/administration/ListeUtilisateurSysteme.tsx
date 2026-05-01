import { useEffect, useState } from "react"
import type { utilisateurDto } from "../../utilitaires/DataTypes";
import MyButton from "../../composants/MyButton";
import { myAxios } from "../../axios/MyAxios";


export default function ListeUtilisateurSysteme() {

    const [listeUser, setListeUser] = useState<utilisateurDto[]>();
    const [message, setMessage] = useState<string>("");

    const loaduserList = async ():Promise<utilisateurDto[]>=>{
        const result = await myAxios.get<utilisateurDto[]>("");
        return result.data;

    }

    useEffect(()=>{
        // charger la liste des utilisateurs
        (async ()=>{
            const liste = await loaduserList();
            setListeUser(liste);
        })();

    },[]);

    const activerOrDesactiverUser = ()=>{
        try {
            
        } catch (error) {
            setMessage("Echec de l'activation ou de desactivation de l'utilisateur")
            
        }

    }

    const resendEmailVerifcationLink = ()=>{
        try {
            
        } catch (error) {
            setMessage("Echec lors de l'envoi du lien pour l'activation du courriel")
            
        }

    }

    const seeSystemeUserDetails = ()=>{

    }


  return (
    <div>
        <p>Liste des utilisteurs du systeme</p>
        <p> Cette page permet de voir la liste des utilisateurs du systeme, afin d'activer ou de desactiver</p>

        { message && <p className="text text-danger fw-bold">message</p>}

        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Nom</th>
                    <th>Prenoms</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Compte actif</th>
                    <th>Email valide</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    listeUser.map(eachUser => <tr key={eachUser.id}>
                        <td></td>
                        <td>{eachUser.nom}</td>
                        <td>{eachUser.prenoms}</td>
                        <td>{eachUser.username}</td>
                        <td>{eachUser.email}</td>
                        <td>{eachUser.telephone}</td>
                        <td>{eachUser.actif == true? "OUI":"NON"}</td>
                        <td>{eachUser.valideEmail == true? "OUI":"NON"}</td>
                        <td>
                            <MyButton label={eachUser.actif == true? "Desactiver": "Activer"} actionToExecute={activerOrDesactiverUser} />
                            <MyButton label={eachUser.valideEmail == false? "Envoyer lien Verification Email":""} actionToExecute={resendEmailVerifcationLink}/>
                            <MyButton label="Voir Details" actionToExecute={seeSystemeUserDetails}/>
                        </td>

                    </tr>)
                }

            </tbody>
        </table>
    </div>
  )
}
