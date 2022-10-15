import React from 'react'
import { useState } from 'react'
import LikeCard from './LikeCard'
import axios from 'axios'
import { timestampParser } from '../../utils/timestampParser'
import Picture from '../../assets/icons/picture.svg'
import jwt_decode from 'jwt-decode'
import DefaultProfilePhoto from '../../assets/images/photo-de-profil-par-defaut.webp'
import Trash from '../../assets/icons/trash.svg'
import Edit from '../../assets/icons/edit.svg'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Card = (props) => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }
  const config = { headers }

  const decodedToken = jwt_decode(token)

  const postId = props.post.id

  const [isUpdated, setIsUpdated] = useState(false)

  const [titleUpdated, setTitleUpdated] = useState(props.post.title)
  const [descriptionUpdated, setDescriptionUpdated] = useState(
    props.post.description
  )

  // postUpdatedPicture est l'image que l'on voit à l'écran lors de la modification du post :
  const [postUpdatedPicture, setPostUpdatedPicture] = useState()
  // file est la nouvelle image que l'on va envoyer au back-end :
  const [fileUpdated, setFileUpdated] = useState()

  const handleUserInfos = (id) => {
    window.location = `/infos-utilisateur?id=${props.post.user_id}`
  }

  const handlePicture = (e) => {
    setPostUpdatedPicture(URL.createObjectURL(e.target.files[0]))
    setFileUpdated(e.target.files[0])
  }

  const UpdateCard = () => {
    const titleUpdatedError = document.querySelector('.titleUpdated-error')
    const descriptionUpdatedError = document.querySelector(
      '.descriptionUpdated-error'
    )

    const checkTitleUpdated = () => {
      if (titleUpdated.length < 5) {
        titleUpdatedError.innerHTML =
          'Veuillez renseigner un titre avec 5 caractères minimum'
        return false
      } else {
        titleUpdatedError.innerHTML = ''
        return true
      }
    }
    checkTitleUpdated()

    const checkDescriptionUpdated = () => {
      if (descriptionUpdated.length < 5) {
        descriptionUpdatedError.innerHTML =
          'Veuillez renseigner une description avec 5 caractères minimum'
        return false
      } else {
        descriptionUpdatedError.innerHTML = ''
        return true
      }
    }
    checkDescriptionUpdated()

    if (checkTitleUpdated() && checkDescriptionUpdated()) {
      const data = new FormData()
      data.append('title', titleUpdated)
      data.append('description', descriptionUpdated)
      if (fileUpdated) data.append('image', fileUpdated)

      axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
        headers: headers,
        data: data,
      })
        .then((res) => {
          window.location = '/'
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const deleteCard = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, config)
      .then((res) => {
        window.location = '/'
      })
      .catch((err) => console.log(err))
  }

  return (
    <li className="card">
      <div className="card_profileImage-and-names-and-modify-and-like">
        {props.post.profileImage ? (
          <Tippy content="Voir la bio">
            <img
              className="card_profileImage"
              src={props.post.profileImage}
              alt="vrai profil"
              onClick={handleUserInfos}
            ></img>
          </Tippy>
        ) : (
          <Tippy content="Voir la bio">
            <img
              className="card_profileImage"
              src={DefaultProfilePhoto}
              alt="profil par défaut"
              onClick={handleUserInfos}
            ></img>
          </Tippy>
        )}
        <div className="card_firstname">{props.post.firstname}</div>
        <div className="card_lastname">{props.post.lastname}</div>
        {(decodedToken.userId === props.post.user_id ||
          decodedToken.status === 'ADMIN') && (
          <div className="card_modify-and-delete">
            <Tippy content="Modifier">
              <img
                className="card_modify"
                onClick={(e) => setIsUpdated(!isUpdated)}
                src={Edit}
                alt="modifier"
              />
            </Tippy>
            <Tippy content="Supprimer">
              <img
                className="card_delete"
                onClick={(e) => {
                  if (
                    window.confirm('Voulez-vous vraiment supprimer ce post ?')
                  ) {
                    deleteCard()
                  }
                }}
                src={Trash}
                alt="supprimer"
              />
            </Tippy>
          </div>
        )}
        <div className="card_like">
          <i className="fa-regular fa-2x fa-heart"></i>
          <LikeCard post={props.post} arrayPostsLiked={props.arrayPostsLiked} />
        </div>
      </div>

      {isUpdated === false && (
        <>
          <div className="card_date">
            <p>{timestampParser(props.post.creationDate)}</p>
          </div>
          <div className="card_title-and-description-and-image">
            <div className="card_title-and-description">
              <div className="card_title">
                <h3> {props.post.title}</h3>
              </div>
              <div className="card_description">{props.post.description}</div>
            </div>
            {props.post.image && (
              <img src={props.post.image} alt="img" className="card_post-img" />
            )}
          </div>
        </>
      )}

      {isUpdated && (
        <>
          <div className="card_date">
            <p>{timestampParser(props.post.creationDate)}</p>
          </div>
          <div className="card_title-and-description-and-image">
            <textarea
              className="card_title"
              maxLength="40"
              defaultValue={props.post.title}
              onChange={(e) => setTitleUpdated(e.target.value)}
            />
            <p className="titleUpdated-error"></p>
            <textarea
              className="card_description"
              maxLength="255"
              defaultValue={props.post.description}
              onChange={(e) => setDescriptionUpdated(e.target.value)}
            />
            <p className="descriptionUpdated-error"></p>
            {props.post.image && (
              <>
                <img
                  src={props.post.image}
                  alt="img"
                  className="card_post-img"
                />
                <div className="card_file">
                  <img src={postUpdatedPicture} alt="" />
                </div>
                <div className="card_file-icon">
                  <img src={Picture} alt="img" />
                  <Tippy content="Choisir une image">
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png, .webp"
                      onChange={(e) => handlePicture(e)}
                    />
                  </Tippy>
                </div>
              </>
            )}
            <div className="button-container">
              <button
                className="card_validation-btn"
                onClick={(e) => UpdateCard()}
              >
                Valider les modifications
              </button>
            </div>
          </div>
        </>
      )}
    </li>
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

export default Card
