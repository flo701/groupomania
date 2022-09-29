import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../Header'
import Posts from '../../pages/Posts'
import Profile from '../../pages/Profile'
import Connection from '../../pages/Connection'
import Footer from '../Footer'
import jwt_decode from 'jwt-decode'

const token = getCookie('token')

let decodedToken
if (token) {
  decodedToken = jwt_decode(token)
}

const index = () => {
  return (
    <Router>
      <Header />
      {token ? (
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/profil" element={<Profile />} />
          {/* Si aucune route ne correspond, on renvoie à la page d'accueil */}
          <Route path="*" element={<Posts />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/connexion" element={<Connection />} />
          <Route path="*" element={<Connection />} />
        </Routes>
      )}
      <Footer />
    </Router>
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

export default index
