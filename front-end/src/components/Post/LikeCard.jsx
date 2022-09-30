import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const LikeCard = ({ post }) => {
  const token = getCookie('token')
  let decodedToken
  if (token) {
    decodedToken = jwt_decode(token)
    console.log("Id de l'utilisateur : " + decodedToken.userId)
  }
  const headers = { Authorization: `Bearer ${token}` }

  console.log({ post })

  const postId = post.id
  console.log('Id du post : ' + postId)

  const [postLiked, setPostLiked] = useState(false)
  console.log('Statut de la const postLiked dans LikeCard: ', postLiked)

  const [numberOfLikes, setNumberOfLikes] = useState(post.postLikes)

  // On regarde si l'utilisateur a déjà liké ce post :
  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/posts/verifyLike/${postId}`,
      headers: headers,
    })
      .then((res) => {
        console.log(
          'Résultat de la recherche de like de ce user pour ce post : ' +
            res.data.length
        )
        if (res.data.length > 0) {
          setPostLiked(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })

  // Au click sur le coeur, on appelle la fonction "likePost" :
  const likeHandle = () => {
    const postId = post.id

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/posts/${postId}/like`,
      headers: headers,
    })
      .then((res) => {
        console.log(res.data)
        if (res.data === 'Post liké') {
          setPostLiked(true)
        } else {
          setPostLiked(false)
        }
        countLikes()
      })
      .catch((err) => console.log(err))
  }

  // On met à jour le nombre de likes pour ce post :
  const countLikes = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/posts/${postId}/like/count`,
      headers: headers,
    })
      .then((res) => {
        setNumberOfLikes(res.data)

        console.log('Nombre de likes pour ce post : ' + res.data)
        console.log(
          'Résultat de props.props.post.likes pour ce post : ' + post.postLikes
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="card_like">
        <div
          className={postLiked === true ? 'heart2' : 'heart1'}
          onClick={likeHandle}
        >
          <i className="fa-solid fa-2x fa-heart"></i>
        </div>
      </div>
      <span className="card_number-of-likes">{numberOfLikes} </span>
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

export default LikeCard
