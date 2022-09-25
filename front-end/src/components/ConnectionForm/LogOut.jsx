// import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'

const LogOut = () => {
  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/api/auth/logout`,
  })
    .then(() => removeCookie('token'))
    .catch((err) => console.log(err))

  window.location = '/'
}

export default LogOut
