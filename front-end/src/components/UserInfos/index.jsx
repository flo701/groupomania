import React, { useState, useEffect } from 'react'
import getCookie from '../../utils/getCookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { UrlUser } from '../../utils/axiosUrl'
import { timestampParser } from '../../utils/timestampParser'
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
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: UrlUser + `getOneUser/${userId}`,
      headers: headers,
    })
      .then((res) => {
        if (res.data[0].active === 1) {
          setIsActive(true)
        } else {
          setIsActive(false)
        }
        if (res.data[0].status === 'ADMIN') {
          setIsAdmin(true)
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

  const handleActivation = () => {
    setIsActive(!isActive)
    accountActivation(userId)
  }

  const accountActivation = (id) => {
    axios({
      method: 'put',
      url: UrlUser + `accountActivation/${id}`,
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
      {isAdmin && <div className="user_admin">Administratrice</div>}
      <div className="user_creationDate">
        Membre depuis : <br />
        {creationDate}{' '}
      </div>

      {decodedToken.status === 'ADMIN' ? (
        <>
          {isActive ? (
            <div
              className="user_active user_active-admin"
              onClick={handleActivation}
            >
              Compte actif
            </div>
          ) : (
            <div
              className="user_deactivated user_deactivated-admin"
              onClick={handleActivation}
            >
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

export default UserInfos
