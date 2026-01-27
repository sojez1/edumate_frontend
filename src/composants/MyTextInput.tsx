import React, { useId } from 'react'

type inputAtrrib ={
    label: string,
    name: string,
    placeholder?: string,
    value: string,
    required?: boolean
}

export default function MyTextInput({label, name, placeholder, value, required=false}:inputAtrrib) {

    const champId = useId();
  return (
    <div className='form-floating mb-3'>
        
        <input className='form-control'
            name={name}
            placeholder={placeholder}
            required={required}     
        
        />
        <label htmlFor={champId}>{label} {required && <span className='text-danger'>*</span>}</label>

    </div>
  )
}
