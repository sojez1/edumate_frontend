import React from 'react'


type enumCoomboType = {
    label: string;
    nom: string;
    liste: string[];
    required?: boolean;
}

export default function MyEnumCombo({label, nom, liste, required=false}:enumCoomboType) {
  return (
    <div>
        <label htmlFor={nom}>{label}{required && <span className='text-danger'>*</span>}</label>

        <select name={nom} id={nom} className='form-select'>
            <option value="">--Sélectionner--</option>
            {liste.map((item) => (
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
    </div>
  )
}
