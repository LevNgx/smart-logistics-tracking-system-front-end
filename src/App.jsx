import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import  LoginPage from './pages/loginPage'
import './App.css'

function App() {


  return (
  < Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* You can add other routes like /dashboard later */}
      </Routes>
    </Router>
  )
}

export default App
