import { Link } from "react-router-dom"

type card_Element = {
    titre: string
    texte: string
    url_destination: string
    photo?:string // lien vers la photo
}

export default function MyCard({titre, texte, url_destination, photo}:card_Element) {

  return (
    <Link className="card" to={url_destination}>

      {photo && 
        <img className="card-img-top img-fluid" alt={titre} src={photo} height={100} />
      }      
        <div className="card-body">
            <h5 className="card-title">{titre}</h5>
            <p className="card-text">{texte}</p>
        </div>
    

    </Link>

    



    
  )
}
