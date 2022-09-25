import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import cookie from 'js-cookie'
import ProfileNoConnected from '../../assets/images/profil-non-connecte.webp'

const UploadImg = () => {
  console.log('Je suis dans la fonction UploadImg')
  const [newPhoto, setNewPhoto] = useState(false)

  const token = getCookie('token')
  let decodedToken
  if (token) {
    decodedToken = jwt_decode(token)
    console.log(decodedToken.profileImage)
  }

  const [file, setFile] = useState()
  console.log(file)
  const [profileImage, setProfileImage] = useState()
  console.log(profileImage)

  const modifyPicture = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('image', file)

    console.log(file)

    const api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
    })
    api.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer ${token}`
      return req
    })

    if (file) {
      api
        .put('/auth/profile-image', data)
        .then((res) => {
          setNewPhoto(true)
          const removeCookie = (key) => {
            if (window !== 'undefined') {
              cookie.remove(key, { expires: 1 })
            }
          }
          removeCookie('token')
        })
        .catch((err) => console.log(err))
    }
  }

  const handlePicture = (e) => {
    e.preventDefault()
    setProfileImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  return (
    <>
      {newPhoto ? (
        <>
          <div className="profile-pictures">
            <img src={profileImage} className="new-image" alt="user-pic" />
          </div>
          <span className="update-success">
            Nouvelle photo de profil enregistrée.
            <br />
            Veuillez vous reconnecter.
          </span>
        </>
      ) : (
        <>
          {decodedToken.profileImage === null ? (
            <>
              <div className="profile-pictures">
                <div className="file">
                  <img
                    src={ProfileNoConnected}
                    className="token-image"
                    alt="user-pic"
                  />
                </div>
                <div>
                  <img src={profileImage} className="token-image" alt="" />
                </div>
              </div>
              <form action="" onSubmit={modifyPicture}>
                <label htmlFor="file">Ajouter une photo</label>
                <>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={(e) => handlePicture(e)}
                  />
                </>
                <input type="submit" value="Envoyer" />
              </form>
            </>
          ) : (
            <>
              <div className="profile-pictures">
                <div className="file">
                  <img
                    src={decodedToken.profileImage}
                    className="token-image"
                    alt="user-pic"
                  />
                </div>
                <div>
                  <img src={profileImage} className="token-image" alt="" />
                </div>
              </div>
              <form action="" onSubmit={modifyPicture}>
                <label htmlFor="file">Changer la photo</label>
                <>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={(e) => handlePicture(e)}
                  />
                </>
                <input type="submit" value="Envoyer" />
              </form>
            </>
          )}
        </>
      )}
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

export default UploadImg
