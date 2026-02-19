import MyButton from "../../composants/MyButton";



export default function AdmissionPrendreDecision() {


    const handleBtnSoumettre = ()=>{

    }



  return (
    <div>
        
        <form onSubmit={handleBtnSoumettre}>
          
            
            <MyButton label="soumettre" type="submit"/>

        </form>
        
    </div>
  )
}
