import React from 'react'
import MyTextInput from '../../composants/MyTextInput'
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
            <MyTextInput label='nom utilsateur' name='username' value='abcd' placeholder='votre email' required/>
            <MyTextInput label='mot de passe' name='password' value='123456' placeholder='votre mot de passe' required/>
            <div className='container d-flex gap-2'>
                <MyButton label="Enregistrer" actionToExecute={onBtnClick}/>
                <MyButton label='mot de passe oublie' actionToExecute={onMotDePasseOublie}/>
            </div>
        </form>
        
    </div>
  )
}


