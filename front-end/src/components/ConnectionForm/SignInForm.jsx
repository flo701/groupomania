import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    // On ne veut pas que la page se recharge, donc on empêche le comportement par défaut :
    e.preventDefault()
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/auth/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token
          const decodedToken = jwt_decode(token)
          console.log('Token décodé : ' + JSON.stringify(decodedToken))
          console.log(decodedToken.lastname)
          setCookie('token', token, 1)
          window.location = '/'
        }
      })
      .catch((error) => {
        if (
          error.response.data.error ===
          'Email non enregistré dans la base de données'
        ) {
          emailError.innerHTML = error.response.data.error
        } else {
          emailError.innerHTML = ''
        }
        if (error.response.data.error === 'Mot de passe erroné') {
          passwordError.innerHTML = error.response.data.error
        } else {
          passwordError.innerHTML = ''
        }
        console.log(error)
      })
  }

  return (
    <form action="" onSubmit={handleLogin} className="signin_form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input id="submit" type="submit" value="Se connecter" />
    </form>
  )
}

// https://www.w3schools.com/js/js_cookies.asp :
function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export default SignInForm
