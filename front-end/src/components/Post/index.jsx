import React, { useState, useEffect } from 'react'
import getCookie from '../../utils/getCookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { UrlPost } from '../../utils/axiosUrl'
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
      .get(UrlPost, config)
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
      url: UrlPost + `verifyPostsLiked/${userId}`,
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
          <Card post={post} key={post.id} arrayPostsLiked={arrayPostsLiked} />
        ))}
      </ul>
    </div>
  )
}

export default Posts
