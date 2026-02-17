import MyCard from "../../composants/MyCard";

export default function Accueil() {

  return (
    <div className="container d-flex flex-column">
        <div>
            <p>edumate</p>
            <button>Inscription/Connexion</button>
        </div>
        <div>
            <p>Bienvenue dur Edumate</p>
            <p>La plateforme de gestion professionnelle de vos activites academiques</p>
        </div>
        <div >
            <h5>Fonctionnalites clees</h5>
            <div className="container d-flex gap-3">
                <MyCard titre="Admission" texte="Faites une demande d'admission pour vous meme ou pour votre enfants. (seulement pour les nouveaux etudiants"/>
            <MyCard titre="Inscription" texte="POur les anciens et les nouveaux etudiants. Proceder chaque annee a la reinscription au cours"/>

            </div>
            
            
        </div>


    </div>
  )
}
