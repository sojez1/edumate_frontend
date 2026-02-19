
import { Outlet } from 'react-router-dom'

export default function SansBarreDeMenu() {
  return (
    <main className='container mt-5'>
            <Outlet/>
        </main> 
  )
}
