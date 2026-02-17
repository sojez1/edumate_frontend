
type card_Element = {
    titre: string
    texte: string
    pageOnClic?: ()=>void
}

export default function MyCard({titre, texte}:card_Element) {

  return (
    <div className="card">
        <img className="card-img-top" src="..." />
        <div className="card-body">
            <h5 className="card-title">{titre}</h5>
            <p className="card-text">{texte}</p>
            <a href="#">Go to</a>
        </div>
    </div>
  )
}
