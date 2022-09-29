import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import GroupomaniaLogo from '../../assets/logo/icon-left-font.png'
import LogOutIcon from '../../assets/icons/logout.svg'
import LogOut from '../ConnectionForm/LogOut'

const Header = () => {
  const [logout, setLogout] = useState(false)

  const token = getCookie('token')

  return (
    <>
      {token ? (
        <div className="header">
          <NavLink to="/">
            <div className="header_img-container">
              <img src={GroupomaniaLogo} alt="logo groupomania" />
            </div>
          </NavLink>
          <div className="header_navigation">
            <ul>
              <NavLink
                to="/"
                className={(nav) => (nav.isActive ? 'nav-active' : '')}
              >
                <li>Posts</li>
              </NavLink>
              <NavLink
                to="/profil"
                className={(nav) => (nav.isActive ? 'nav-active' : '')}
              >
                <li>Profil</li>
              </NavLink>
              <li className="logOut" onClick={(e) => setLogout(true)}>
                <img src={LogOutIcon} alt="déconnexion" />
              </li>
              {logout && <LogOut />}
            </ul>
          </div>
        </div>
      ) : (
        <NavLink to="/">
          <div className="header_img-container-notoken">
            <img src={GroupomaniaLogo} alt="logo groupomania" />
          </div>
        </NavLink>
      )}
    </>
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

export default Header
