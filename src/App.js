import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Download from './pages/Download'
import Profile from './pages/Profile'
import Redirect from './pages/Redirect'
import Expired from './pages/Expired'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/download" element={<Download />} />
        <Route path="/profile/:shortCode" element={<Profile />} />
        <Route path="/redirect/:shortCode" element={<Redirect />} />
        <Route path="/expired" element={<Expired />} />
        <Route path="/" element={<div>HOME</div>} />
      </Routes>
    </Router>
  )
}

export default App
