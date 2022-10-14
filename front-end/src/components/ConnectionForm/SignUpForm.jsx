import React, { useState } from 'react'
import axios from 'axios'
import SignInForm from './SignInForm'

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)

  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    const lastNameInput = document.querySelector('#lastName')
    const firstNameInput = document.querySelector('#firstName')
    const emailInput = document.querySelector('#email')
    const passwordInput = document.querySelector('#password')
    const controlPasswordInput = document.querySelector('#password-conf')
    const terms = document.getElementById('terms')

    const lastNameError = document.querySelector('.lastName.error')
    const firstNameError = document.querySelector('.firstName.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error'
    )
    const termsError = document.querySelector('.terms.error')

    let regExpNames = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ'\s-]{2,20}$/i
    let regExpEmail = /^[A-Z0-9.+-_]+@[A-Z0-9]+\.[A-Z]{2,4}$/i
    // Entre 8 et 25 caractères, au moins une lettre minuscule, au moins une lettre majuscule et au moins 2 chiffres :
    let regExpPassword =
      /^(?=.{8,25}$)(?=.*?[a-z])(?=.*?[A-Z])(?=(?:.*?[0-9]){2}).*$/

    const checkFirstName = () => {
      if (!firstNameInput.value.match(regExpNames)) {
        firstNameError.innerHTML =
          'Le prénom doit comprendre entre 2 et 20 caractères. Chiffres et caractères spéciaux non autorisés'
        return false
      } else {
        firstNameError.innerHTML = ''
        console.log(firstName)
        return true
      }
    }
    checkFirstName()

    const checkLastName = () => {
      if (!lastNameInput.value.match(regExpNames)) {
        lastNameError.textContent =
          'Le nom doit comprendre entre 2 et 20 caractères. Chiffres et caractères spéciaux non autorisés'
        return false
      } else {
        lastNameError.textContent = ''
        console.log(lastName)
        return true
      }
    }
    checkLastName()

    const checkEmail = () => {
      if (!emailInput.value.match(regExpEmail)) {
        emailError.innerHTML = 'Email invalide'
        return false
      } else {
        emailError.innerHTML = ''
        console.log(email)
        return true
      }
    }
    checkEmail()

    const checkPassword = () => {
      console.log()
      if (!passwordInput.value.match(regExpPassword)) {
        passwordError.innerHTML =
          'Le mot de passe doit comprendre entre 8 et 25 caractères, au moins une lettre minuscule, au moins une lettre majuscule et au moins 2 chiffres'
        return false
      } else {
        passwordError.innerHTML = ''
        console.log(password)
        return true
      }
    }
    checkPassword()

    const checkControlPassword = () => {
      if (passwordInput.value !== controlPasswordInput.value) {
        passwordConfirmError.innerHTML =
          'Les mots de passe ne correspondent pas'
        return false
      } else {
        passwordConfirmError.innerHTML = ''
        return true
      }
    }
    checkControlPassword()

    const checkTerms = () => {
      if (!terms.checked) {
        termsError.innerHTML = 'Veuillez valider les conditions générales'
        return false
      } else {
        termsError.innerHTML = ''
        return true
      }
    }
    checkTerms()

    if (
      checkFirstName() &&
      checkLastName() &&
      checkEmail() &&
      checkPassword() &&
      checkControlPassword() &&
      checkTerms()
    ) {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        data: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.data.error) {
            emailError.innerHTML =
              'Email déjà enregistré dans la base de données'
          } else {
            setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <span className="signup_success">
            Enregistrement réussi. <br />
            Vous pouvez vous connecter.
          </span>
          <SignInForm />
        </>
      ) : (
        <form action="" onSubmit={handleRegister} className="signup_form">
          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <div className="firstName error"></div>
          <br />
          <label htmlFor="lastName">Nom</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <div className="lastName error"></div>
          <br />
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
          <label htmlFor="password-conf">Confirmez le mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{' '}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input id="submit" type="submit" value="Valider l'inscription" />
        </form>
      )}
    </>
  )
}

export default SignUpForm
