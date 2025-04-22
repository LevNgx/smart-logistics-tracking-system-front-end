import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import  LoginPage from './pages/loginPage'
import  DashBoardPage from './pages/dashboardPage'
import './App.css'
import ProtectedRoute from './components/protected-route';

function App() {


  return (
  < Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashBoardPage /></ProtectedRoute>} />
        {/* You can add other routes like /dashboard later */}
      </Routes>
    </Router>
  )
}

export default App
