import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

function LoginPage() {
    return (
      <div className="login-page">
        <h2>Smart Logistics</h2>
        <LoginForm />
      </div>
    );
  }
  
export default LoginPage;