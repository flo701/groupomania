import React, { useState, useEffect } from 'react'
import getCookie from '../../utils/getCookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { urlPost } from '../../utils/axiosUrl'
import Card from './Card'
import NewPostForm from './NewPostForm'

const Posts = () => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }
  const config = { headers }

  const decodedToken = jwt_decode(token)
  const userId = decodedToken.userId

  const [posts, setPosts] = useState([])
  const [arrayPostsLiked, setArrayPostsLiked] = useState([])

  const addPostToState = (post) => {
    const newPosts = [post, ...posts]
    setPosts(newPosts)
  }

  const modifyPostInState = (postId, modif) => {
    console.log(modif)
    const newPosts = posts.map((p) =>
      p.id !== postId
        ? p
        : {
            ...p,
            ...modif,
          }
    )
    setPosts(newPosts)
  }

  const removePostToState = (postId) => {
    const newPosts = posts.filter((p) => p.id !== postId)
    setPosts(newPosts)
  }

  useEffect(() => {
    axios
      .get(urlPost, config)
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line
  }, [])

  // On regarde quels posts ont été likés par l'utilisateur connecté :
  useEffect(() => {
    axios({
      method: 'get',
      url: urlPost + `verifyPostsLiked/${userId}`,
      headers: headers,
    })
      .then((res) => {
        setArrayPostsLiked(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <div className="posts">
      <>
        <h3 className="posts_h3">Bienvenue {decodedToken.firstname} </h3>
      </>
      <NewPostForm addPostToState={addPostToState} />
      <ul>
        {posts.map((post) => (
          <Card
            post={post}
            key={post.id}
            arrayPostsLiked={arrayPostsLiked}
            modifyPostInState={modifyPostInState}
            removePostToState={removePostToState}
          />
        ))}
      </ul>
    </div>
  )
}

export default Posts
