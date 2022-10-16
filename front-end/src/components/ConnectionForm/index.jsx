import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

// Les props ont été définies dans pages/Connection/index.jsx.
// Pour rappel, on a mis signup={false} signin={true} :
const ConnectionForm = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup)
  const [signInModal, setSignInModal] = useState(props.signin)

  const handleModals = (e) => {
    if (e.target.id === 'connection-form_register') {
      setSignUpModal(true)
      setSignInModal(false)
    } else if (e.target.id === 'connection-form_login') {
      setSignInModal(true)
      setSignUpModal(false)
    }
  }

  return (
    <>
      <h3 className="posts_h3">
        Bienvenue sur Groupomania, votre réseau social d'entreprise
      </h3>
      <p className="posts_p">
        Veuillez vous connecter pour créer un post et consulter les posts de vos
        collègues
      </p>
      <div className="connection-form">
        <ul>
          <li
            onClick={handleModals}
            id="connection-form_register"
            className={signUpModal ? 'connection-form_active-btn' : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="connection-form_login"
            className={signInModal ? 'connection-form_active-btn' : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </>
  )
}

export default ConnectionForm
