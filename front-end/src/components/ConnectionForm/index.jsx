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

  const token = getCookie('token')

  return (
    <>
      {token ? (
        <>
          <h3 className="posts_h3">{''} </h3>
        </>
      ) : (
        <>
          <h3 className="posts_h3">
            Bienvenue sur Groupomania, votre réseau social d'entreprise
          </h3>
          <p className="posts_p">
            Veuillez vous connecter pour créer un post et consulter les posts de
            vos collègues
          </p>
        </>
      )}
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

// https://www.w3schools.com/js/js_cookies.asp :
function getCookie(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export default ConnectionForm
