import React, {useEffect } from 'react'
import { getAllUser } from '../../services/UtilisateurService';
import type { utilisateurDto } from '../../utilitaires/DataTypes';
import MyButton from '../../composants/MyButton';
import { useNavigate } from 'react-router-dom';
import { myAxios } from '../../axios/MyAxios';

export default function GestionDesUtilisateurs() {
    const navigateTo = useNavigate();
    const [listeUtilisateurs, setListeUtilisateurs] = React.useState<utilisateurDto[]>([]);

    useEffect(()=>{
        // get all users from the backend and set the list of users
        (async ()=>{
            const lesUsers = await getAllUser();
            setListeUtilisateurs(lesUsers);
            //console.log("la liste des utilisateurs est: ", lesUsers);
        })();
    },[]);

    const onBtnActiverDesactiver = (id:number)=>{
        const url:string = "utilisateurs/activer-desactiver"
        myAxios.post(url, null, {params:{id}});
        // actualiser la page
        window.location.reload();  
    }

    const onBtnSupprimer = (id:number)=>{
        
    }

    const onBtnModifier = (id:number)=>{
        
    }

    const onBtnAjouter = ()=>{
        navigateTo("/inscription_utilisateur");
        
    }

    const onBtnRechercher = (e:React.FormEvent)=>{
        
    }

  return (
    <div>
        <h1>Gestion des utilisateurs</h1>
        <p>Cette page est reservee a l'administrateur du systeme. Elle lui permettra de creer de nouveaux utilisateurs, de modifier les informations des utilisateurs existants et de supprimer des utilisateurs du systeme.</p>
        <p>Pour creer un nouvel utilisateur, cliquez sur le bouton "Ajouter un utilisateur" et remplissez le formulaire avec les informations requises. Vous pouvez choisir le role de l'utilisateur parmi les options disponibles (etudiant, enseignant, parent, administrateur). Une fois que vous avez rempli le formulaire, cliquez sur "Enregistrer" pour ajouter l'utilisateur au systeme.</p>
        <p>Pour modifier les informations d'un utilisateur existant, cliquez sur le bouton "Modifier" à côté de l'utilisateur que vous souhaitez modifier. Apportez les modifications nécessaires dans le formulaire qui s'affiche, puis cliquez sur "Enregistrer" pour sauvegarder les changements.</p>
        <p>Pour supprimer un utilisateur du systeme, cliquez sur le bouton "Supprimer" à côté de l'utilisateur que vous souhaitez supprimer. Confirmez la suppression lorsque vous y êtes invité pour retirer l'utilisateur du systeme.</p>
        <p>Veuillez noter que la gestion des utilisateurs est une fonctionnalité sensible et doit être utilisée avec précaution. Assurez-vous de ne supprimer que les utilisateurs qui ne sont plus nécessaires et de ne pas modifier les informations des utilisateurs sans raison valable.</p>
        <p>En cas de doute ou de problème avec la gestion des utilisateurs, veuillez contacter le support technique pour obtenir de l'aide.</p>
        
        <button onClick={()=>onBtnRechercher}>Filtrer</button>
        
        <div className='container d-flex justify-content-end'>
            <MyButton label='Ajouter utilisateur' actionToExecute={onBtnAjouter} type='button' className='btn btn-primary'/>
        </div>
        <div className='container'>
            <h2 className='text fw-bold text-center'>Liste des utilisateurs</h2>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>username</th>
                        <th>Telephone</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listeUtilisateurs.map((utilisateur:utilisateurDto)=>(
                        <tr key={utilisateur.id}>
                            <td>{utilisateur.nom}</td>
                            <td>{utilisateur.prenoms}</td>
                            <td>{utilisateur.username}</td>
                            <td>{utilisateur.telephone}</td>
                            <td>{utilisateur.email}</td>
                            <td>{utilisateur.role}</td>
                            <td>
                                <button className='btn btn-sm btn-outline-primary' onClick={()=>onBtnActiverDesactiver(utilisateur.id)}>{utilisateur.actif?"Desactiver":"Activer"}</button>
                                {!utilisateur.valideEmail && <button className='btn btn-outline-secondary' title='Envoie un lien de validation par email'>Valider email</button>}
                                <button className='btn btn-sm btn-outline-danger' onClick={()=>onBtnModifier(utilisateur.id)}>Modifier</button>
                                <button className='btn btn-outline-secondary'>Update roles</button>
                                <button className='btn btn-sm btn-outline-danger' onClick={()=>onBtnSupprimer(utilisateur.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
