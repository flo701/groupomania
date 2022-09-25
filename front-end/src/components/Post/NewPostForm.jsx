import React, { useState } from 'react'
import { timestampParser } from '../Utils'
import axios from 'axios'
import Picture from '../../assets/icons/picture.svg'

const NewPostForm = () => {
  const [title, setTitle] = useState('')
  console.log(title)
  const [description, setDescription] = useState('')
  console.log(description)

  // postPicture est l'image que l'on voit à l'écran lors de la création du post :
  const [postPicture, setPostPicture] = useState()
  console.log(postPicture)

  // file est l'image que l'on va envoyer au back-end :
  const [file, setFile] = useState()
  console.log(file)

  const token = getCookie('token')

  const api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` })
  api.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`
    return req
  })

  const handlePost = async () => {
    // if (title && description) {
    if (title.length > 4 && description.length > 4) {
      const data = new FormData()
      data.append('title', title)
      data.append('description', description)
      if (file) data.append('image', file)

      await api
        .post('/posts', data)
        .then((res) => {
          console.log(res)
          window.location = '/'
        })
        .catch((err) => console.log(err))
      // Une fois les données envoyées au back-end, on supprime le visuel de la création du post :
      cancelPost()
    } else {
      alert(
        'Veuillez renseigner un titre et une description comportant 5 caractères minimum'
      )
    }
  }

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const cancelPost = () => {
    setTitle('')
    setDescription('')
    setPostPicture('')
    setFile('')
  }

  return (
    <div className="new-post_container">
      <h3 className="new-post_h3">Créer un post</h3>
      <textarea
        name="title"
        maxLength="40"
        id="title"
        placeholder="Titre"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        name="description"
        maxLength="255"
        id="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      {title || description || postPicture ? (
        <li>
          <div>
            <span>{timestampParser(Date.now())}</span>
          </div>
          <div className="new-post_content">
            <p>{title}</p>
            <p>{description}</p>
            <img src={postPicture} alt="" />
          </div>
        </li>
      ) : null}
      <div className="new-post_footer">
        <div className="icon">
          <>
            <img src={Picture} alt="img" />
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png, .webp"
              onChange={(e) => handlePicture(e)}
            />
          </>
        </div>
        <div className="btn-send">
          {title || description || postPicture ? (
            <button className="cancel" onClick={cancelPost}>
              Annuler
            </button>
          ) : null}
          {token ? (
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          ) : null}
        </div>
      </div>
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

export default NewPostForm
