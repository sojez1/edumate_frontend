
import MyButton from '../../composants/MyButton'
import { useNavigate } from 'react-router-dom'

export default function Logins() {
    const navigateTo = useNavigate();

    const onBtnClick = ()=>{
        alert("clic sur le bouton enregistrer")
        navigateTo("/publierNote");

    }

    const onMotDePasseOublie = ()=>{

    }


  return (
    <div>

        <form>
            
            <div className='container d-flex gap-2'>
                <MyButton label="Enregistrer" actionToExecute={onBtnClick}/>
                <MyButton label='mot de passe oublie' actionToExecute={onMotDePasseOublie}/>
            </div>
        </form>
        
    </div>
  )
}


