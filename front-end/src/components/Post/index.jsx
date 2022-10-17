import React, { useState, useEffect } from 'react'
import getCookie from '../../utils/getCookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts`, config)
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
      url: `${process.env.REACT_APP_API_URL}/api/posts/verifyPostsLiked/${userId}`,
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
      <NewPostForm />
      <ul>
        {posts.map((post) => (
          <Card post={post} arrayPostsLiked={arrayPostsLiked} />
        ))}
      </ul>
    </div>
  )
}

export default Posts
