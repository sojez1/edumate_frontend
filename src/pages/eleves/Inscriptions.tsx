import { useEffect, useState } from "react"


export default function Inscriptions() {

    const [studentInfo, setStudentInfo] = useState();
    const [studentActuelleClasse, setStudentActuelleClasse] = useState();
    const [inscriptionData, setInscriptionData] = useState();

    
    const getStudentInfo = ()=>{

    }
    const getStudentActuelleClasse = ()=>{

    }

    useEffect(()=>{

    },[])



    const onBtnSoumettre = ()=>{

    }
  return (
    <div>
        <p>Inscription a pour l'annee scolaire a venir</p>
        <p>Les nouveaux etudiants, veuillez vous inscrire a partir de la page de suivi de votre demande d'admission puis cliquez sur s'inscrire. <br/> Pour les anciens etudiants, vous devez vous authentifier au prealable </p>
        <form onSubmit={onBtnSoumettre}>


        </form>
    </div>
  )
}
