import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'

const Unsubscribe = () => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }
  const config = { headers }

  let decodedToken
  if (token) {
    decodedToken = jwt_decode(token)
  }

  const userId = decodedToken.userId
  console.log(userId)

  const getUserPosts = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/posts/${userId}`,
      headers: headers,
    })
      .then((res) => {
        console.log(res.data)

        res.data.forEach((i) => {
          console.log(i)
          console.log(i.id)
          deletePost(i.id)
        })

        // for (let i of res.data) {
        //   console.log(i.id)
        //   deletePost(i.id)
        // }
      })
      .catch((err) => console.log(err))
  }
  getUserPosts()

  const deletePost = (postId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, config)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  const unsubscribe = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/auth/delete`, config)
      .then(() => {
        removeCookie('token')
        window.location = '/'
      })
      .catch((err) => console.log(err))
  }
  unsubscribe()

  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  return <div></div>
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

export default Unsubscribe
