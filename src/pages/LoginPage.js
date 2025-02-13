import React, { useState } from 'react';
import '../styles/LoginPage.css';
import axios from 'axios'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = '';
    data = axios.post('http://localhost:3000/api/login',formData)
    .then((response) =>{
      console.log(response)
      if(response.status === 200){
        alert('Login successful')
        window.location.href = "/frontpage";
      }
    }, (err) => {
      console.log(err)
    })
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login Page</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div class="container link-style">
          Don't have an account? <a href="/signup">Sign Up</a>
      </div>

    </div>
  );
};

export default LoginPage;