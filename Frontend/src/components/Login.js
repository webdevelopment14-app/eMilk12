import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Please enter both username and password', { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.post('/api/login', { email: username, password });

      if (response.data && response.data.email) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('authenticated', 'true');
        setIsAuthenticated(true);

        const from = location.state?.from?.pathname || '/landing-page';
        navigate(from, { replace: true });

        toast.success('Login successful!', { autoClose: 2000 });
      } else {
        toast.error('Login failed. Invalid response from server.', { autoClose: 2000 });
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.', { autoClose: 2000 });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
     
        <div className="login-section">
          <h2>
            <span>L</span>
            <span>o</span>
            <span>g</span>
            <span>i</span>
            <span>n</span>
          </h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                }}
                style={{ paddingRight: '40px' }}
              />
              <span
                className={`password-toggle ${isTyping ? 'move-left' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </span>
            </div>
            <button
              type="submit"
              className={username && password ? 'filled' : ''}
            >
              <span>Sign me In</span>
            </button>
          </form>
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={() => navigate('/register')}>
              Signup here
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
