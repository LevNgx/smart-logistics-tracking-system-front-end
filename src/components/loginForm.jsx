import React, { useState } from 'react';

function LoginForm() {
  const LOGIN_URL = import.meta.env.VITE_API_BASE_URL + '/auth/login'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
    try{
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

            // 🔐 Store JWT later
        } else {
            console.error("❌ Login failed:", response.status);
        }
    }
    catch (err) {
        console.error("⚠️ Error:", err);
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
     

      <button type="submit" disabled={!formData.password || !formData.username} className={!formData.password || !formData.username? 'grey-out' : ''}>Login</button>
    </form>
  );
}

export default LoginForm;
