import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import ProfileNoConnected from '../../assets/images/profil-non-connecte.webp'

const UploadImg = () => {
  // Image que l'on envoie au back-end :
  const [file, setFile] = useState()
  console.log(file)

  // Image que l'on voit à l'écran après sélection de la photo :
  const [profileImage, setProfileImage] = useState()
  console.log(profileImage)

  // Photo de profil provenant du back-end :
  const [userProfileImage, setUserProfileImage] = useState()

  // Si on a ajouté/changé la photo de profil :
  const [newPhoto, setNewPhoto] = useState(false)

  const token = getCookie('token')
  let decodedToken
  if (token) {
    decodedToken = jwt_decode(token)
    console.log(decodedToken.profileImage)
  }
  const headers = { Authorization: `Bearer ${token}` }

  const getOneUser = (id) => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/auth/getOneUser/${id}`,
      headers: headers,
    })
      .then((res) => {
        console.log(res)
        setUserProfileImage(res.data[0].profileImage)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  if (token) getOneUser(decodedToken.userId)

  const modifyPicture = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('image', file)

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
          console.log(res.data.profileImage)
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
          <span className="update-success">Photo de profil enregistrée</span>
        </>
      ) : (
        <>
          {userProfileImage === null ? (
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
                    src={userProfileImage}
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
