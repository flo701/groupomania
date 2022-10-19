import React, { useState } from 'react'
import getCookie from '../../utils/getCookie'
import setCookie from '../../utils/setCookie'
import jwt_decode from 'jwt-decode'
import jwt_encode from 'jwt-encode'
import axios from 'axios'
import { UrlUser } from '../../utils/axiosUrl'
import DefaultProfilePhoto from '../../assets/images/photo-de-profil-par-defaut.webp'

const UploadImg = () => {
  const token = getCookie('token')
  const decodedToken = jwt_decode(token)

  // Image que l'on voit à l'écran après sélection de la photo :
  const [profileImage, setProfileImage] = useState()
  // Image que l'on envoie au back-end :
  const [file, setFile] = useState()

  // Si on a ajouté/changé la photo de profil :
  const [newPhoto, setNewPhoto] = useState(false)

  const handlePicture = (e) => {
    e.preventDefault()
    setProfileImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const modifyTokenProfileImage = (image) => {
    decodedToken.profileImage = image
    const encodedToken = jwt_encode(
      decodedToken,
      `${process.env.REACT_APP_RANDOM_TOKEN_SECRET}`
    )
    setCookie('token', encodedToken, 1)
  }

  const modifyPicture = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('image', file)

    const api = axios.create({
      baseURL: UrlUser,
    })
    api.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer ${token}`
      return req
    })

    if (file) {
      api
        .put('profile-image', data)
        .then((res) => {
          setNewPhoto(true)
          modifyTokenProfileImage(res.data.profileImage)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {newPhoto ? (
        <>
          <div className="profile-pictures">
            <img src={profileImage} className="new-image" alt="img de profil" />
          </div>
          <span className="update-success">Photo de profil enregistrée</span>
        </>
      ) : (
        <>
          {decodedToken.profileImage === null ? (
            <>
              <div className="profile-pictures">
                <div className="file">
                  <img
                    src={DefaultProfilePhoto}
                    className="profile-image"
                    alt="img de profil par défaut"
                  />
                </div>
                <div>
                  <img src={profileImage} className="profile-image" alt="" />
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
                    className="profile-image"
                    alt="img de profil"
                  />
                </div>
                <div>
                  <img src={profileImage} className="profile-image" alt="" />
                </div>
              </div>
              <form action="" onSubmit={modifyPicture}>
                <label htmlFor="file">Choisir une photo</label>
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

export default UploadImg
