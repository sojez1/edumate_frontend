import { useEffect, useRef, useState } from "react";

import type { unDocument } from "../utilitaires/DataTypes";

type Props = {
    onUpload?: (listeDocuments: unDocument[])=> void;  // calback optionnel
    chargerFichier: ()=>void;  // fonction pour enregistrer les pieces jointes dans la DB ou autres traitement sur les PJ
}

export default function DocumentATeleverser({chargerFichier, onUpload}:Props){
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [mesDocuments, setMesDocuments] = useState<unDocument[]>([]);

    // ouverture du selecteur
    const ouvrirSelecteur = ()=>{
        inputRef.current?.click();

    }

    // Choix de fichiers
    const ajouterDoc = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(!e.target.files) return;

        const newDocs: unDocument[] = Array.from(e.target.files).map((file)=>({
            id: crypto.randomUUID(),
            file
        }));

        setMesDocuments((prev)=>[...prev, ...newDocs])

    }

    const supprimerLigneDoc = (id:string)=>{
        setMesDocuments((prev)=>
            prev.filter((doc)=>doc.id !== id));
        
    }

    useEffect(()=>{
        onUpload?.(mesDocuments);
    }, [mesDocuments])

    

    return (
        <div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={()=>ouvrirSelecteur()}>Ajouter un doc</button>
            </div>            

            <input type="file" ref={inputRef} hidden onChange={ajouterDoc}/>            


            <table className="table table-stripped table-bordered">
                
            <thead className="thead thead-dark">
                <tr>
                    <th>Titre</th>
                    <th>Taille</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {mesDocuments.map((chaqueDoc)=>(
                    <tr key={chaqueDoc.id}>
                        <td>{chaqueDoc.file.name}</td>
                        <td>{chaqueDoc.file.size /1024} KB</td>
                        <td>
                            <button onClick={()=>supprimerLigneDoc(chaqueDoc.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>

    </div>
        


    )



    

}



