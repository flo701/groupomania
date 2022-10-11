import React from 'react'
import GroupomaniaLogo from '../../assets/logo/icon-left-font.png'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Footer = () => {
  return (
    <div className="footer_img-container">
      <a href="/">
        <Tippy content="Revenir en haut de la page d'accueil">
          <img src={GroupomaniaLogo} alt="logo groupomania" />
        </Tippy>
      </a>
    </div>
  )
}

export default Footer
