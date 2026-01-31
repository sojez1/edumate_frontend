import React from 'react'

type btnFonction = {
  label: string,
  actionToExecute: ()=>void
}
export default function MyButton({label, actionToExecute}:btnFonction) {
  return (
    <div>
        <button onClick={actionToExecute}>{label}</button>
    </div>
  )
}
