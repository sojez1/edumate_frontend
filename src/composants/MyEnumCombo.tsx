import React from 'react'


type enumCoomboType = {
    label: string;
    name: string;
    liste: string[];
    required?: boolean;
}

export default function MyEnumCombo({label, name, liste, required=false}:enumCoomboType) {
  return (
    <div>
        <label htmlFor={name}>{label}{required && <span className='text-danger'>*</span>}</label>

        <select name={name} id={name} className='form-select'>
            <option value="">--Sélectionner--</option>
            {liste.map((item) => (
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
    </div>
  )
}
