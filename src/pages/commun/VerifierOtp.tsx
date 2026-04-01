import MyTextInput from '../../composants/MyTextInput'
import MyButton from '../../composants/MyButton'
import { useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';

const defaultOtpRequest = {
    tokenTemporaire:"",
    otp:""
}

export default function VerifierOtp() {
    const navigateTo = useNavigate();
    const [otpReq, setOtp] = useState(defaultOtpRequest);


    const sendOtp = ()=>{

    }

    const onBtnRetour = ()=>{
        navigateTo(-1);

    }

  return (
    <div>
        <p className='text text-danger'>Authentification Double facteur</p>
        <p>Veuillez saisir le code envoye sur votre courriel</p>
        <MyTextInput label='code OTP' name='otp' value={otp} onValueChange={(e)=>setOtp(e.target.value)} placeholder='code OTP' required/>
        <MyButton label='Verifier' actionToExecute={sendOtp}/>
        <MyButton label='Retour' actionToExecute={onBtnRetour}/>
    </div>
  )
}
