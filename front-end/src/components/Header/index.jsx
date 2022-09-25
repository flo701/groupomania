import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import GroupomaniaLogo from '../../assets/logo/icon-left-font.png'
import LogOutIcon from '../../assets/icons/logout.svg'
import LogOut from '../ConnectionForm/LogOut'

const Header = () => {
  const [Logout, setLogout] = useState(false)

  return (
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
          <NavLink
            to="/connexion"
            className={(nav) => (nav.isActive ? 'nav-active' : '')}
          >
            <li>Connexion</li>
          </NavLink>
          <li className="logOut" onClick={(e) => setLogout(true)}>
            <img src={LogOutIcon} alt="déconnexion" />
          </li>
          {Logout && <LogOut />}
        </ul>
      </div>
    </div>
  )
}

export default Header
