import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css';
//import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast';
import { authService } from '../components/AuthService.js';
import { api } from '../components/api';

const LoginPage = () => {
  // Unsure why we sent email & name to login EP, only needs user:pass -- Ian
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  

  const [_, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast.loading('Logging in...', { id: 'loginToast' });

      const response = await api.post('/login', formData);

      if (response.status === 200 && response.data.userID) {
        // Update logged in status in localStorage
        authService.setLoggedIn(true, response.data.userID, response.data.username);

        // Update toast to success
        toast.success('Login successful!', { id: 'loginToast' });

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "/frontpage";
        }, 1500);
      }
    } catch (err) {
      console.error('Login error:', err);

      // Display error message
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      toast.error(errorMessage, { id: 'loginToast' });

      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Toaster component for displaying notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            padding: '16px',
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
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