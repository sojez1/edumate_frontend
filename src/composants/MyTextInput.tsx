import React, { useId } from 'react'

type inputAtrrib ={
    label: string,
    name: string,
    placeholder?: string,
    value: string,
    onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}

export default function MyTextInput({label, name, placeholder, value, onValueChange, required=false}:inputAtrrib) {

    const champId = useId();
  return (
    <div className='form-floating mb-3 flex-fill'>
        
        <input className='form-control'
            name={name}
            value={value}
            onChange={onValueChange}
            placeholder={placeholder}
            required={required}     
        
        />
        <label  className='form-label' htmlFor={champId}>{label} {required && <span className='text-danger'>*</span>}</label>

    </div>
  )
}
