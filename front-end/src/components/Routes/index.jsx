import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../Header'
import Posts from '../../pages/Posts'
import Profile from '../../pages/Profile'
import Connection from '../../pages/Connection'
import Footer from '../Footer'

const index = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/connexion" element={<Connection />} />
        {/* Si aucune route ne correspond, on renvoie à la page d'accueil */}
        <Route path="*" element={<Posts />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default index
