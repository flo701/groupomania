import React, { useState } from 'react'
import UploadImg from './UploadImg'
import { timestampParser } from '../Utils'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

var bcrypt = require('bcryptjs')

const UpdateProfile = () => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }

  const decodedToken = jwt_decode(token)

  const [updateFormSubmit, setUpdateFormSubmit] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [passwordUpdate, setPasswordUpdate] = useState('')
  const [controlPasswordUpdate, setControlPasswordUpdate] = useState('')

  const passwordUpdateInput = document.querySelector('#password-update')
  const controlPasswordUpdateInput = document.querySelector(
    '#password-conf-update'
  )
  const passwordError = document.querySelector('.password-update.error')
  const passwordConfirmError = document.querySelector(
    '.password-confirm-update.error'
  )
  const currentPasswordError = document.querySelector('.current-password.error')

  let regExpPassword =
    /^(?=.{8,25}$)(?=.*?[a-z])(?=.*?[A-Z])(?=(?:.*?[0-9]){2}).*$/

  const handleRegister = (e) => {
    e.preventDefault()

    const checkCurrentPassword = () => {
      if (bcrypt.compareSync(currentPassword, decodedToken.password)) {
        currentPasswordError.innerHTML = ''
        return true
      } else {
        currentPasswordError.innerHTML = 'Le mot de passe actuel est incorrect'
        return false
      }
    }
    checkCurrentPassword()

    const checkPasswordUpdate = () => {
      if (!passwordUpdateInput.value.match(regExpPassword)) {
        passwordError.innerHTML =
          'Le mot de passe doit comprendre entre 8 et 25 caractères, au moins une lettre minuscule, au moins une lettre majuscule et au moins 2 chiffres'
        return false
      } else {
        passwordError.innerHTML = ''
        return true
      }
    }
    checkPasswordUpdate()

    const checkControlPasswordUpdate = () => {
      if (passwordUpdateInput.value !== controlPasswordUpdateInput.value) {
        passwordConfirmError.innerHTML =
          'Les mots de passe ne correspondent pas'
        return false
      } else {
        passwordConfirmError.innerHTML = ''
        return true
      }
    }
    checkControlPasswordUpdate()

    if (
      checkCurrentPassword() &&
      checkPasswordUpdate() &&
      checkControlPasswordUpdate()
    ) {
      axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/api/auth/profile-infos`,
        headers: headers,
        data: {
          password: passwordUpdate,
        },
      })
        .then((res) => {
          setUpdateFormSubmit(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <div className="profile">
        <h3>
          {decodedToken.firstname} {decodedToken.lastname}
        </h3>
        <div className="profile_creation-date">
          Vous êtes membre depuis : {timestampParser(decodedToken.creationDate)}
        </div>
        <div className="profile_update-container">
          <>
            <>
              <div className="left-part">
                <h3>Photo de profil</h3>
                <UploadImg />
              </div>
            </>
            <div className="right-part">
              <div>
                <h3>Modifier votre mot de passe</h3>
                <form action="" onSubmit={handleRegister} id="form">
                  <label htmlFor="current-password">Mot de passe actuel</label>
                  <br />
                  <input
                    type="password"
                    name="current-password"
                    id="current-password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                  />
                  <div className="current-password error"></div>
                  <br />
                  <label htmlFor="password-update">Nouveau mot de passe</label>
                  <br />
                  <input
                    type="password"
                    name="password-update"
                    id="password-update"
                    onChange={(e) => setPasswordUpdate(e.target.value)}
                    value={passwordUpdate}
                  />
                  <div className="password-update error"></div>
                  <br />
                  <label htmlFor="password-conf-update">
                    Confirmez le mot de passe
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password-conf-update"
                    id="password-conf-update"
                    onChange={(e) => setControlPasswordUpdate(e.target.value)}
                    value={controlPasswordUpdate}
                  />
                  <div className="password-confirm-update error"></div>
                  {updateFormSubmit ? (
                    <>
                      <span className="update-success">
                        Nouveau mot de passe enregistré
                      </span>
                    </>
                  ) : (
                    <button type="submit">Valider la modification </button>
                  )}
                </form>
              </div>
            </div>
          </>
        </div>
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

export default UpdateProfile
