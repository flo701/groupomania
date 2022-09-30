import { useEffect } from 'react'
import axios from 'axios'

const DeleteCard = ({ post }) => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }
  const config = { headers }

  console.log(headers)
  console.log(`${token}`)

  useEffect(() => {
    const postId = post.id

    console.log(post)

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, config)
      .then((res) => {
        window.location = '/'
        console.log(res.data)
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line
  }, [])
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

export default DeleteCard
