
import { useState } from 'react';
import { myAxios } from '../../axios/MyAxios';
import MyButton from '../../composants/MyButton'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import MyTextInput from '../../composants/MyTextInput';


const login_url:string = "/auth/login";

const defaultLoginData = {
    username:"",
    password:""
}

export default function Logins() {
    const navigateTo = useNavigate();
    const [loginData, setLogindata] = useState(defaultLoginData);
    const [message, setMessage] = useState<String>("");

    const handleChangeLoginData = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setLogindata((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const onBtnClick = async(e:React.FormEvent)=>{
        e.preventDefault();
        // verification si donnees saisies
        if(!loginData.username.trim() || !loginData.password.trim()){
            setMessage("Vous devez saisir votre nom d'utilisateur ou votre mot de passe");
            return;
        }
        try {
            const user_connex = await myAxios.post(login_url, loginData);
            sessionStorage.setItem("accessToken", user_connex.data);
            console.log("mon token est: ", user_connex.data);   
            navigateTo("/");            
        } catch (error) {
            setMessage("Erreur de connexion. Veuillez verifier vos identifiants.")    
        }
        
        

    }

    const onMotDePasseOublie = (e:React.FormEvent)=>{
        e.preventDefault();

    }

    const onBtnCancel = (e:React.FormEvent)=>{
        e.preventDefault();                 
        setLogindata(defaultLoginData);
        navigateTo(-1) || navigateTo("/");
    }


  return (
    <div>
        <p className='text text-uppercase fw-bold fs-2 fs-underline text-danger'>Authentification</p>

        

        <form onSubmit={onBtnClick}>            
            <div className='container flex gap-2'>
                <div>
                    <MyTextInput label='username or Email' name='username' value={loginData.username} onValueChange={handleChangeLoginData}/>
                    <MyTextInput label='password' type='password' name='password' value={loginData.password} onValueChange={handleChangeLoginData}/>
                </div>
                {message !== "" && <p className='text text-danger fw-bold fs-6'>{message}</p>}
                <div className='container flex flex-row'>
                    <MyButton type='submit' label="Connexion" className='btn btn-primary'/>
                    <NavLink to="/inscription_utilisateur" className="btn btn-secondary">Vous n'etes pas encore utilisateur? S'inscrire</NavLink>                
                    <MyButton type='button' label='Retour' actionToExecute={onBtnCancel}/>
                    <MyButton type='button' label='mot de passe oublie' actionToExecute={onMotDePasseOublie} className='btn btn-warning'/>
                </div>      
            </div>
        </form>
        
    </div>
  )
}


