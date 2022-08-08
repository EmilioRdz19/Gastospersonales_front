import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <div>
        <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  )
}

export default App
