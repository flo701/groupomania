import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

// Les props ont été définis dans pages/Connection/index.jsx.
// Pour rappel, on a mis signup={true} signin={false}.
// ({signup}) est l'équivalent de (props.signup) :
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
  )
}

export default ConnectionForm
