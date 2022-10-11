import React, { useState } from 'react'
import { timestampParser } from '../Utils'
import axios from 'axios'
import Picture from '../../assets/icons/picture.svg'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const NewPostForm = () => {
  const token = getCookie('token')

  const api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` })
  api.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`
    return req
  })

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const titleError = document.querySelector('.title-error')
  const descriptionError = document.querySelector('.description-error')

  // postPicture est l'image que l'on voit à l'écran lors de la création du post :
  const [postPicture, setPostPicture] = useState()
  // file est l'image que l'on va envoyer au back-end :
  const [file, setFile] = useState()

  const handlePost = () => {
    const checkTitle = () => {
      if (title.length < 5) {
        titleError.innerHTML =
          'Veuillez renseigner un titre avec 5 caractères minimum'
        return false
      } else {
        titleError.innerHTML = ''
        return true
      }
    }
    checkTitle()

    const checkDescription = () => {
      if (description.length < 5) {
        descriptionError.innerHTML =
          'Veuillez renseigner une description avec 5 caractères minimum'
        return false
      } else {
        descriptionError.innerHTML = ''
        return true
      }
    }
    checkDescription()

    if (checkTitle() && checkDescription()) {
      const data = new FormData()
      data.append('title', title)
      data.append('description', description)
      if (file) data.append('image', file)

      api
        .post('/posts', data)
        .then((res) => {
          window.location = '/'
        })
        .catch((err) => console.log(err))
      // Une fois les données envoyées au back-end, on supprime le visuel de la création du post :
      cancelPost()
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
    titleError.innerHTML = ''
    descriptionError.innerHTML = ''
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
      <p className="title-error"></p>
      <textarea
        name="description"
        maxLength="255"
        id="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <p className="description-error"></p>
      {title || description || postPicture ? (
        <>
          <div>
            <span>{timestampParser(Date.now())}</span>
          </div>
          <div className="new-post_content">
            <p>{title}</p>
            <p>{description}</p>
            <img src={postPicture} alt="" />
          </div>
        </>
      ) : null}
      <div className="new-post_footer">
        <div className="icon">
          <>
            <img src={Picture} alt="" />
            <Tippy content="Choisir une image">
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={(e) => handlePicture(e)}
              />
            </Tippy>
          </>
        </div>
        <div className="buttons">
          {title || description || postPicture ? (
            <button className="cancel" onClick={cancelPost}>
              Annuler
            </button>
          ) : null}
          <button className="send" onClick={handlePost}>
            Envoyer
          </button>
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
