import React, { useId } from 'react'

type ComboInput<T> = {
    label: string;
    nom: string;
    liste: T[];
    identifiant: keyof T;
    valeurAfficher: keyof T;
    valeurretouree: keyof T;
    selectionMultiple?: boolean;
}

export default function MyComboBox<T>({label, nom, liste, identifiant, valeurAfficher, valeurretouree, selectionMultiple = false}: ComboInput<T>){

    const selecteurId = useId();

  return (
    <div>
        <label htmlFor={selecteurId}>{label}</label>

        <select name={nom} id={selecteurId} onChange={(e)=>e.target.value} multiple={selectionMultiple} className='form-select'>

            <option value="">--Sélectionner--</option>

            {liste.map((eachElement) => (
                <option 
                key={String(eachElement[identifiant])} 
                value={String(eachElement[valeurretouree])}>
                    {String(eachElement[valeurAfficher])}
                </option>
            ))}
    </select>



    </div>
    
  )
}
