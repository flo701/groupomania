import React from 'react'
import { NavLink } from 'react-router-dom'
import cookie from 'js-cookie'
import getCookie from '../../utils/getCookie'
import axios from 'axios'
import { urlUser } from '../../utils/axiosUrl'
import GroupomaniaLogo from '../../assets/logo/icon-left-font.png'
import LogOutIcon from '../../assets/icons/logout.svg'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Header = () => {
  const token = getCookie('token')

  const logOut = () => {
    const removeCookie = (key) => {
      cookie.remove(key, { expires: 1 })
    }

    axios({
      method: 'get',
      url: urlUser + 'logout',
    })
      .then(() => removeCookie('token'))
      .catch((err) => console.log(err))

    window.location = '/'
  }

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
              <li className="logOut" onClick={logOut}>
                <Tippy content="Se déconnecter">
                  <img src={LogOutIcon} alt="déconnexion" />
                </Tippy>
              </li>
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

export default Header
