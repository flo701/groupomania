import React from 'react'
import UserInfos from '../../components/UserInfos/index.jsx'
// import axios from 'axios'
// import { timestampParser } from '../../components/Utils'
// import { useState } from 'react'

const UserProfile = () => {
  //   const params = new URLSearchParams(window.location.search)
  //   const userId = params.get('id')

  //   const token = getCookie('token')
  //   const headers = { Authorization: `Bearer ${token}` }

  //   const [profileImage, setProfileImage] = useState('')
  //   const [firstname, setFirstname] = useState('')
  //   const [lastname, setLastname] = useState('')
  //   const [creationDate, setCreationDate] = useState('')

  //   const [isActive, setIsActive] = useState()

  //   const getOneUser = (id) => {
  //     axios({
  //       method: 'get',
  //       url: `${process.env.REACT_APP_API_URL}/api/auth/getOneUser/${id}`,
  //       headers: headers,
  //     })
  //       .then((res) => {
  //         if (res.data[0].active === 1) {
  //           setIsActive(true)
  //         } else {
  //           setIsActive(false)
  //         }
  //         setProfileImage(res.data[0].profileImage)
  //         setFirstname(res.data[0].firstname)
  //         setLastname(res.data[0].lastname)
  //         setCreationDate(timestampParser(res.data[0].creationDate))
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  //   getOneUser(userId)

  return (
    <div>
      <UserInfos
      // profileImage={profileImage}
      // firstname={firstname}
      // lastname={lastname}
      // creationDate={creationDate}
      // isActive={isActive}
      />
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

export default UserProfile
