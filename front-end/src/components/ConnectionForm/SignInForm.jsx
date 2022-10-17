import React, { useState } from 'react'
import setCookie from '../../utils/setCookie'
import axios from 'axios'

const SignInForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailError = document.querySelector('.email.error')
  const passwordError = document.querySelector('.password.error')

  const handleLogin = (e) => {
    e.preventDefault()

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

export default SignInForm
