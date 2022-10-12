import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { timestampParser } from '../Utils'

const UserInfos = ({ userId }) => {
  const token = getCookie('token')
  const headers = { Authorization: `Bearer ${token}` }

  const [profileImage, setProfileImage] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [creationDate, setCreationDate] = useState('')

  const getOneUser = (id) => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/auth/getOneUser/${id}`,
      headers: headers,
    })
      .then((res) => {
        setProfileImage(res.data[0].profileImage)
        setFirstname(res.data[0].firstname)
        setLastname(res.data[0].lastname)
        setCreationDate(timestampParser(res.data[0].creationDate))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getOneUser(userId)

  return (
    <div>
      <div className="user_profileImage">{profileImage} </div>
      <div className="user_firstname">{firstname} </div>
      <div className="user_lastname">{lastname} </div>
      <div className="user_creationDate">Membre depuis : {creationDate} </div>
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

export default UserInfos
