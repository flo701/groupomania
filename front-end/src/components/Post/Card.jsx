import React from 'react'
import { useState } from 'react'
import DeleteCard from './DeleteCard'
import LikeCard from './LikeCard'
import axios from 'axios'
import { timestampParser } from '../Utils'
import Picture from '../../assets/icons/picture.svg'
import jwt_decode from 'jwt-decode'
import ProfileNoConnected from '../../assets/images/profil-non-connecte.webp'

const Card = (props) => {
  const token = getCookie('token')
  let decodedToken
  if (token) {
    decodedToken = jwt_decode(token)
    console.log("Id de l'utilisateur : " + decodedToken.userId)
  }

  console.log('Id du créateur du post :' + props.post.user_id)
  console.log('Id du post :' + props.post.id)

  const [isUpdated, setIsUpdated] = useState(false)

  const [titleUpdated, setTitleUpdated] = useState(props.post.title)
  const [descriptionUpdated, setDescriptionUpdated] = useState(
    props.post.description
  )

  // postUpdatedPicture est l'image que l'on voit à l'écran lors de la modification du post :
  const [postUpdatedPicture, setPostUpdatedPicture] = useState()
  console.log(postUpdatedPicture)
  // file est la nouvelle image que l'on va envoyer au back-end :
  const [fileUpdated, setFileUpdated] = useState()
  console.log(fileUpdated)

  const [deleteButton, setDeleteButton] = useState(false)

  const handlePicture = (e) => {
    setPostUpdatedPicture(URL.createObjectURL(e.target.files[0]))
    setFileUpdated(e.target.files[0])
  }

  const headers = { Authorization: `Bearer ${token}` }

  const postId = props.post.id
  const title = titleUpdated
  const description = descriptionUpdated
  const file = fileUpdated

  const UpdateCard = () => {
    if (title.length > 4 && description.length > 4) {
      const data = new FormData()
      data.append('title', title)
      data.append('description', description)
      if (file) data.append('image', file)

      axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
        headers: headers,
        data: data,
      })
        .then((res) => {
          console.log(res)
          window.location = '/'
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert(
        'Veuillez renseigner un titre et une description comportant 5 caractères minimum'
      )
    }
  }

  return (
    <li className="card">
      <div className="card_profileImage-and-names-and-modify-and-like">
        {props.post.profileImage ? (
          <img
            className="card_profileImage"
            src={props.post.profileImage}
            alt=""
          ></img>
        ) : (
          <img
            className="card_profileImage"
            src={ProfileNoConnected}
            alt=""
          ></img>
        )}
        <div className="card_firstname">{props.post.firstname}</div>
        <div className="card_lastname">{props.post.lastname}</div>
        {decodedToken.userId === props.post.user_id && (
          <div className="card_modify-and-delete">
            <button
              className="card_modify"
              onClick={(e) => setIsUpdated(!isUpdated)}
            >
              Modifier
            </button>
            <button
              className="card_delete"
              onClick={(e) => {
                if (
                  window.confirm('Voulez-vous vraiment supprimer ce post ?')
                ) {
                  setDeleteButton(true)
                }
              }}
            >
              Supprimer
              {deleteButton && <DeleteCard props={props} />}
            </button>
          </div>
        )}

        <div className="card_like">
          <i className="fa-regular fa-2x fa-heart"></i>
          <LikeCard props={props} />
        </div>
      </div>

      {isUpdated === false && (
        <>
          <div className="card_date">
            <p>{timestampParser(props.post.creationDate)}</p>
          </div>
          <div className="card_title-and-description-and-image">
            <div className="card_title">
              <h2> {props.post.title}</h2>
            </div>
            <div className="card_description">{props.post.description}</div>
            {props.post.image && (
              <img src={props.post.image} alt="" className="card_post-img" />
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
            <textarea
              className="card_description"
              maxLength="255"
              defaultValue={props.post.description}
              onChange={(e) => setDescriptionUpdated(e.target.value)}
            />

            {props.post.image && (
              <>
                <img src={props.post.image} alt="" className="card_post-img" />
                <div className="card_file">
                  <img src={postUpdatedPicture} alt="" />
                </div>
                <div className="card_file-icon">
                  <img src={Picture} alt="img" />
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={(e) => handlePicture(e)}
                  />
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
