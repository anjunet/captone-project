import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/admin/login', { username, password });
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);
      setUserInfo(user);
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserInfo(null);
  };

  const verifyCredentials = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(response.data.user);
    } catch (error) {
      console.error("Credentials verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyCredentials();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, login, logout, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
