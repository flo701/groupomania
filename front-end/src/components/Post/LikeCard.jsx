import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const LikeCard = (props) => {
  const token = getCookie('token')
  let decodedToken
  decodedToken = jwt_decode(token)
  console.log("Id de l'utilisateur : " + decodedToken.userId)

  const headers = { Authorization: `Bearer ${token}` }

  const arrayOfLikes = props.arrayPostsLiked

  const postId = props.post.id
  console.log('Id du post : ' + postId)

  const [postLiked, setPostLiked] = useState(false)
  console.log('Statut de la const postLiked dans LikeCard: ', postLiked)
  const [numberOfLikes, setNumberOfLikes] = useState(props.post.postLikes)

  // Ca fonctionne, et on évite une requête pour chaque post.
  // Au rechargement de la page, les coeurs rouges restent rouges.
  // (Bugs parfois après la visite du profil...) :
  useEffect(() => {
    for (let i = 0; i < arrayOfLikes.length; i++) {
      console.log(arrayOfLikes[i].post_id)
      if (postId === arrayOfLikes[i].post_id) setPostLiked(true)
    }
    // eslint-disable-next-line
  }, [])

  // On regarde quels posts ont été likés par l'utilisateur connecté, pour voir les coeurs rouges :
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: `${process.env.REACT_APP_API_URL}/api/posts/verifyLikes/${postId}`,
  //     headers: headers,
  //   })
  //     .then((res) => {
  //       console.log(res)
  //       if (res.data.length > 0) {
  //         setPostLiked(true)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   // eslint-disable-next-line
  // }, [])

  // On regarde quels posts ont été likés par l'utilisateur connecté, pour voir les coeurs rouges :
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: `${process.env.REACT_APP_API_URL}/api/posts/verifyPostsLiked/${postId}`,
  //     headers: headers,
  //   })
  //     .then((res) => {
  //       console.log(res.data)

  //       res.data.forEach((i) => {
  //         console.log(i)
  //         if (i.post_id === postId) {
  //           setPostLiked(true)
  //         }
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   // eslint-disable-next-line
  // }, [])

  // Au click sur le coeur, on appelle la fonction "likePost" :
  const likeHandle = () => {
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
          'Résultat de post.likes pour ce post : ' + props.post.postLikes
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
