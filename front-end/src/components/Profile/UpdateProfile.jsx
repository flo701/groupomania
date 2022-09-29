import React, { useState } from 'react'
import UploadImg from './UploadImg'
import { timestampParser } from '../Utils'
import axios from 'axios'
import ProfileNoConnected from '../../assets/images/profil-non-connecte.webp'
import jwt_decode from 'jwt-decode'

const UpdateProfile = () => {
  const token = getCookie('token')
  let decodedToken
  if (token) {
    decodedToken = jwt_decode(token)
  }
  const headers = { Authorization: `Bearer ${token}` }

  const [updateFormSubmit, setUpdateFormSubmit] = useState(false)

  const [passwordUpdate, setPasswordUpdate] = useState('')
  const [controlPasswordUpdate, setControlPasswordUpdate] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    const passwordUpdateInput = document.querySelector('#password-update')
    const controlPasswordUpdateInput = document.querySelector(
      '#password-conf-update'
    )
    const passwordError = document.querySelector('.password-update.error')
    const passwordConfirmError = document.querySelector(
      '.password-confirm-update.error'
    )

    // Entre 8 et 25 caractères, au moins une lettre minuscule, au moins une lettre majuscule et au moins 2 chiffres :
    let regExpPassword =
      /^(?=.{8,25}$)(?=.*?[a-z])(?=.*?[A-Z])(?=(?:.*?[0-9]){2}).*$/

    const checkPasswordUpdate = () => {
      console.log()
      if (!passwordUpdateInput.value.match(regExpPassword)) {
        passwordError.innerHTML =
          'Le mot de passe doit comprendre entre 8 et 25 caractères, au moins une lettre minuscule, au moins une lettre majuscule et au moins 2 chiffres'
        return false
      } else {
        passwordError.innerHTML = ''
        console.log(passwordUpdate)
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

    if (checkPasswordUpdate() && checkControlPasswordUpdate()) {
      await axios({
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
        <>
          {token ? (
            <>
              <h3>Voici votre profil {decodedToken.firstname}</h3>
              <div className="profile_creation-date">
                Vous êtes membre depuis :{' '}
                {timestampParser(decodedToken.creationDate)}
              </div>
            </>
          ) : (
            <>
              <h3>Veuillez vous connecter pour modifier votre profil</h3>
            </>
          )}
        </>
        <>
          <div className="profile_update-container">
            <>
              {token ? (
                <>
                  <div className="left-part">
                    <h3>Photo de profil</h3>
                    <UploadImg />
                  </div>
                </>
              ) : (
                <div className="left-part">
                  <h3>Photo de profil</h3>
                  <img
                    className="no-token-image"
                    src={ProfileNoConnected}
                    alt="user-pic"
                  />
                </div>
              )}
            </>
            <>
              <div className="right-part">
                <div>
                  <h3>Modifier votre mot de passe</h3>
                  <form action="" onSubmit={handleRegister} id="form">
                    <br />
                    <label htmlFor="password-update">
                      Nouveau mot de passe
                    </label>
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
                    ) : token ? (
                      <button type="submit">Valider la modification </button>
                    ) : null}
                  </form>
                </div>
              </div>
            </>
          </div>
        </>
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
