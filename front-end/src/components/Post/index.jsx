import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
import NewPostForm from './NewPostForm'
import jwt_decode from 'jwt-decode'

const Posts = () => {
  const [posts, setPosts] = useState([])

  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }
  const config = { headers }

  let decodedToken = jwt_decode(token)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts`, config)
      .then((res) => {
        setPosts(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line
  }, [])

  console.log(posts)

  return (
    <div className="posts">
      <>
        <h3 className="posts_h3">Bienvenue {decodedToken.firstname} </h3>
      </>
      <NewPostForm />
      <ul>
        {posts.map((post, index) => (
          <Card key={index} post={post} />
        ))}
      </ul>
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

export default Posts
