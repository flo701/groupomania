import React from 'react'
import ConnectionForm from '../../components/ConnectionForm'

const Connection = () => {
  /* signup et signin sont les props que l'on va passer dans components/ConnectionForm/index.jsx  */
  /* Quand nous sommes sur la page "Connexion", on veut que ce soit le bouton "Inscription" qui soit mis en valeur */

  return (
    <div>
      <ConnectionForm signup={false} signin={true} />
    </div>
  )
}

export default Connection
