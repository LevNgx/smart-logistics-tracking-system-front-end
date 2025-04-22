import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const LOGIN_URL = import.meta.env.VITE_API_BASE_URL + '/auth/login'
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState("");

  const [touched, setTouched] = useState({ username: false, password: false });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    try {
      setError('')
      const response = await fetch(`${LOGIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.text(); // or .json() depending on your backend
        console.log("✅ Login successful:", data);
        localStorage.setItem("jwt", data);
        navigate("/dashboard")

        // 🔐 Store JWT later
      } else {
        const errorObj = await response.json()
        console.log("error obj", errorObj.message)
        setError(errorObj.message)
      }
    }
    catch (err) {
      console.error("⚠️ Error:", err);
      setError(err.message)
    }
    // Mark all as touched
    setTouched({ username: true, password: true });
    console.log("set", touched, formData)

    if (!formData.username || !formData.password) {
      return;
    }
    // 🔐 Add authentication call here later
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        onBlur={handleBlur}
        className={touched.username && !formData.username ? 'error' : 'white'}
        required
      />



      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        onBlur={handleBlur}
        className={touched.password && !formData.password ? 'error' : 'white'}
        placeholder='Password'
      />


      <button type="submit" disabled={!formData.password || !formData.username} className={!formData.password || !formData.username ? 'grey-out' : ''}>Login</button>
    </form>
  );
}

export default LoginForm;
