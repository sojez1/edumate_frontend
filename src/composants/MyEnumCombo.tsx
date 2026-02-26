import { useState } from "react";

type enumCoomboType = {
    label: string;
    name: string;
    liste: string[];
    handleSelecteurChange: (value: string)=>void;
    required?: boolean;
}

export default function MyEnumCombo({label, name, liste, handleSelecteurChange, required=false}:enumCoomboType) {
    const [valeurSelectionnee, setValeurSelectionnee] = useState("");

    const onValeurChange = (e: string)=>{
        setValeurSelectionnee(e);
        handleSelecteurChange(e)
    }
    
  return (
    <div>
        <label htmlFor={name}>{label}{required && <span className='text-danger'>*</span>}</label>

        <select className='form-select' name={name} id={name} value={valeurSelectionnee} onChange={(e)=>onValeurChange(e.target.value)}>
            <option value="">--Sélectionner--</option>
            {liste.map((item) => (
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
    </div>
  )
}
