import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'

import { mesRoutes } from './navigation/MesRoutes.tsx'


createRoot(document.getElementById('root')!).render(
  
    <RouterProvider router={mesRoutes}/>


  
  
)
