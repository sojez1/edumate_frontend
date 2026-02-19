import React from 'react'

type btnFonction = {
  label: string,
  type?: "button" | "submit" | "reset",
  actionToExecute?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  className?:string
}
export default function MyButton({label, type="submit", actionToExecute, className}:btnFonction) {
  return (
    <div>
        <button className={className} type={type} onClick={actionToExecute}>{label}</button>
    </div>
  )
}