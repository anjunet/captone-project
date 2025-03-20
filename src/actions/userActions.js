import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT, // Import the logout action type
} from '../types/userTypes';

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:3000/login', { email, password }, config);
    
    // Save user info to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  // Remove user information from localStorage
  localStorage.removeItem('userInfo');

  // Dispatch the logout action to update the state
  dispatch({ type: USER_LOGOUT });

  // Optionally, redirect the user to the login page after logging out
  document.location.href = '/login';
};
