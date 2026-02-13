import React, { useId } from 'react'

type ComboInput<T> = {
    label: string;
    nom: string;
    liste: T[];
    identifiant: keyof T;
    valeurAfficher: keyof T | (keyof T)[];
    valeurretouree: keyof T;
    selectionMultiple?: boolean;
    valeur?:string | number;
    onValueChange?:(value: string | number)=>void;
}

export default function MyComboBox<T>({label, nom, liste, identifiant, valeurAfficher, valeurretouree, valeur, onValueChange, selectionMultiple = false}: ComboInput<T>){

    const selecteurId = useId();

  return (
    <div className='flex-fill'>
        <label htmlFor={selecteurId}>{label}</label>

        <select name={nom} value={valeur} id={selecteurId} onChange={(e)=>onValueChange && onValueChange(e.target.value)} multiple={selectionMultiple} className='form-select'>

            <option value="">--Sélectionner--</option>

            {liste.map((ligneCombo) =>{
                {/*on verifie si la valeur retournee est un tableau ou non. Ensuite afficher les valeurs separees par |*/}
                const label_affichee = Array.isArray(valeurAfficher)? valeurAfficher.map(elt => String(ligneCombo[elt])).join("  |  ") : String(ligneCombo[valeurAfficher]);
                
                return <option key={String(ligneCombo[identifiant])} value={String(ligneCombo[valeurretouree])}>{label_affichee}</option>
            })}      
    </select>



    </div>
    
  )
}
