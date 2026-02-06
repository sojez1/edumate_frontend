import React from 'react'

type btnFonction = {
  label: string,
  type?: "button" | "submit" | "reset",
  actionToExecute?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}
export default function MyButton({label, type="submit", actionToExecute}:btnFonction) {
  return (
    <div>
        <button type={type} onClick={actionToExecute}>{label}</button>
    </div>
  )
}