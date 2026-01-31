import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function PageNavigationErreur() {
    const erreur = useRouteError();
  return (
    <div>
        <h1>Erreur de navigation</h1>
        <p>Impossible d'acceder a la page demandée. Cause erreur: </p>
    </div>
  )
}
