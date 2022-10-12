import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { timestampParser } from '../Utils'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import DefaultProfilePhoto from '../../assets/images/photo-de-profil-par-defaut.webp'

const UserInfos = () => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }
  const decodedToken = jwt_decode(token)

  const params = new URLSearchParams(window.location.search)
  const userId = params.get('id')

  const [profileImage, setProfileImage] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [creationDate, setCreationDate] = useState('')

  const [isActive, setIsActive] = useState()

  const handleActivation = () => {
    setIsActive(!isActive)
    accountActivation(userId)
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/auth/getOneUser/${userId}`,
      headers: headers,
    })
      .then((res) => {
        if (res.data[0].active === 1) {
          setIsActive(true)
        } else {
          setIsActive(false)
        }
        setProfileImage(res.data[0].profileImage)
        setFirstname(res.data[0].firstname)
        setLastname(res.data[0].lastname)
        setCreationDate(timestampParser(res.data[0].creationDate))
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line
  }, [])

  const accountActivation = (id) => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/api/auth/accountActivation/${id}`,
      headers: headers,
    })
      .then((res) => {
        if (res.data.message === 'Compte réactivé') {
          setIsActive(true)
        } else {
          setIsActive(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="user_container">
      {profileImage ? (
        <div>
          <img
            src={profileImage}
            alt="img profil"
            className="user_profileImage"
          ></img>{' '}
        </div>
      ) : (
        <div>
          <img
            src={DefaultProfilePhoto}
            alt="img profil"
            className="user_profileImage"
          ></img>{' '}
        </div>
      )}
      <div className="user_names">
        {firstname} {lastname}
      </div>
      <div className="user_creationDate">
        Membre depuis : <br />
        {creationDate}{' '}
      </div>

      {decodedToken.status === 'ADMIN' ? (
        <>
          {isActive ? (
            <div className="user_active-admin" onClick={handleActivation}>
              Compte actif
            </div>
          ) : (
            <div className="user_deactivated-admin" onClick={handleActivation}>
              Compte désactivé
            </div>
          )}
        </>
      ) : (
        <>
          {isActive ? (
            <div className="user_active">Compte actif</div>
          ) : (
            <div className="user_deactivated">Compte désactivé</div>
          )}
        </>
      )}
    </div>
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

export default UserInfos
