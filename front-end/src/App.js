import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import getCookie from './utils/getCookie'
import Header from './components/Header'
import Connection from './pages/Connection'
import Posts from './pages/Posts'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import Footer from './components/Footer'

const App = () => {
  const token = getCookie('token')

  return (
    <Router>
      <Header />
      {token ? (
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/infos-utilisateur" element={<UserProfile />} />
          {/* Si aucune route ne correspond, on renvoie à la page d'accueil */}
          <Route path="*" element={<Posts />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Connection />} />
          <Route path="*" element={<Connection />} />
        </Routes>
      )}
      <Footer />
    </Router>
  )
}

export default App
