import React, { useState, useEffect } from 'react'
import getCookie from '../../utils/getCookie'
import axios from 'axios'
import { urlPost } from '../../utils/axiosUrl'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const LikeCard = (props) => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }

  const [postLiked, setPostLiked] = useState(false)
  const [numberOfLikes, setNumberOfLikes] = useState(props.post.postLikes)

  const arrayOfLikes = props.arrayPostsLiked
  const postId = props.post.id

  // On regarde quels posts ont été likés par l'utilisateur connecté, pour pouvoir afficher les coeurs rouges :
  useEffect(() => {
    for (let i = 0; i < arrayOfLikes.length; i++) {
      if (postId === arrayOfLikes[i].post_id) setPostLiked(true)
    }
    // eslint-disable-next-line
  }, [arrayOfLikes])

  // Au clic sur le coeur, on appelle la fonction "likePost" du back-end :
  const likeHandle = () => {
    axios({
      method: 'post',
      url: urlPost + `${postId}/like`,
      headers: headers,
    })
      .then((res) => {
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
      url: urlPost + `${postId}/like/count`,
      headers: headers,
    })
      .then((res) => {
        setNumberOfLikes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="card_like">
        <Tippy content="Aimer / Ne plus aimer">
          <div
            className={postLiked === true ? 'heart2' : 'heart1'}
            onClick={likeHandle}
          >
            <i className="fa-solid fa-2x fa-heart"></i>
          </div>
        </Tippy>
      </div>
      <span className="card_number-of-likes">{numberOfLikes}</span>
    </>
  )
}

export default LikeCard
