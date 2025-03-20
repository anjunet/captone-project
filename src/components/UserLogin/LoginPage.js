import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { Avatar } from '@mui/material';
import "./LoginPage.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(UserContext);

  // Function to get the redirect path from query params
  const getRedirectPath = () => {
    const params = new URLSearchParams(location.search);
    return params.get('redirect') || '/admin/create-listing'; 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Get all users from the db.json file
      const response = await axios.get('http://localhost:4000/users'); // Assuming JSON Server running at this endpoint

      const users = response.data;
      const user = users.find((u) => u.email === email); // Check if email matches

      if (user && user.password === password) {
        // Authentication successful
        login(user); // assuming `login` is the function to set user data in context

        alert('Great! Your login was successful!');
        navigate(getRedirectPath());
      } else {
        alert("Login failed. Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
            className="login_logo"
            alt="logo"
          />
        </Link>

        <div className="login-right-icons">
          <MenuIcon className="menu-icon" />
          <Avatar className='dropbtn'/>
        </div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p>Forgot Password?</p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
