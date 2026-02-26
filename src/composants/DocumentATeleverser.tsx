/**
 * Ce composant sert a ajouter des pieces jointes dans le systeme.
 * Il ne prends rien en parametres (ne recoit rien du parent)
 * Retourne au parents la liste des fichiers (files) charge par l"utilisateurs
 */

import { useEffect, useRef, useState } from "react";

import type {unDocumentForm } from "../utilitaires/DataTypes";

type Props = {
    handleLoadedFiles: (docs:unDocumentForm[])=>void;  // fonction pour enregistrer les pieces jointes dans la DB ou autres traitement sur les PJ
}

export default function DocumentATeleverser({handleLoadedFiles}:Props){
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [mesDocuments, setMesDocuments] = useState<unDocumentForm[]>([]);

    // ouverture du selecteur
    const ouvrirSelecteur = ()=>{ 
        inputRef.current?.click();
    }

    // Choix de fichiers
    const ajouterDoc = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(!e.target.files) return;

        const newDocs: unDocumentForm[] = Array.from(e.target.files).map((file)=>({
            localId: crypto.randomUUID(),
            typeDoc:file.type,
            nomDuDocument:file.name,
            documentData:file
        }));

        setMesDocuments((prev)=>[...prev, ...newDocs])
        e.target.value = ""; // reinitialiser l'input pour pouvoir re-selectionner le meme fichier

    }

    const supprimerLigneDoc = (id:string)=>{
        setMesDocuments((prev)=>
            prev.filter((doc)=>doc.localId !== id));
        
    }

    // Informer le parents de chaque modification
    useEffect(()=>{
        handleLoadedFiles(mesDocuments)
    },[mesDocuments])


    return (
        <div className="container-fluid">

            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="button" onClick={()=>ouvrirSelecteur()}>Ajouter un doc</button>
            </div>            

            <input type="file" multiple ref={inputRef} hidden onChange={ajouterDoc} accept=".pdf, .png, .jpeg, .doc, .docx"/> 

            {mesDocuments.length >0 && 

                <table className="table table-stripped table-bordered table-hover">
                
            <thead className="thead thead-dark">
                <tr>
                    <th>Titre</th>
                    <th>Taille</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {mesDocuments.map((chaqueDoc)=>(
                    <tr key={chaqueDoc.localId}>
                        <td>{chaqueDoc.documentData.name}</td>
                        <td>{(chaqueDoc.documentData.size /1024).toFixed(2)} KB</td>
                        <td>
                            <button onClick={()=>supprimerLigneDoc(chaqueDoc.localId)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
            
            
            }           


            

    </div>
        


    )



    

}



