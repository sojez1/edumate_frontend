/**
 * Cecomposant permet d'avoir un groupe de bouton a cocher
 * Le parent lui envoie la liste des options possibles et le nom du champ
 * Ce composant retourne au parent, la liste des options selectionnees
 */

import { useState } from "react";

type RadioBoutonType = {
    nomChamp: string;
    radioDataListe:string[];
    label?:string;    
    onValueChange: (e:string | string[])=>void;
    multiple?:boolean // true == selection multiple autorisee,  false == selection unique

}

export default function MyRadioGroup({nomChamp, radioDataListe, onValueChange, multiple=false, label=""}:RadioBoutonType ) {

    const [selected, setSeleted] = useState<string | string[]>(multiple?[]:"")
    

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value, checked} = e.target; 
        
        if(multiple){
            const current = selected as string[];
            let newSelected: string[];
            if (checked){
                newSelected = [...current, value]
            }else{
                newSelected = current.filter((val => val !== value))
            }
             
            setSeleted(newSelected)
            onValueChange(newSelected)
        }else{
            setSeleted(value)
            onValueChange(value)
        }


    }

    
  return (

    <div className="container d-flex flex-row gap-3">
        <label>{label}</label>
        {radioDataListe.map((elt:string)=>(
        <div className="form-check" key={elt}>            
            <input className="form-check-input" type={multiple ? "checkbox" : "radio"} name={nomChamp} value={elt} id={`${nomChamp}-${elt}`} checked={multiple? ((selected as string[]).includes(elt)):(selected===elt)} onChange={handleChange}/>
            <label className="form-check-label" htmlFor={`${nomChamp}-${elt}`}>{elt}</label>
        </div>  
    ))}
    </div>
)





}
