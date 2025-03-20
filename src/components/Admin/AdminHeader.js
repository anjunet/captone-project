import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../Context/UserContext'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import './AdminHeader.css';

const AdminHeader = () => {
  const { userInfo, logout, loading } = useContext(UserContext); // Include loading from UserContext
  const userName = userInfo?.name || 'Guest';

  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openModalHandle = () => {
    navigate('/admin/login');  // Redirect to login page
    setDropdownVisible(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout(); // Call logout from UserContext
    setDropdownVisible(false);
    navigate('/'); // Redirect to home page after logging out
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  if (loading) {
    return <div className="loading-container"><p>Loading...</p></div>;// Return loading message if data is still loading
  }

  return (
    <div className="admin-header-container">
      <div className="admin-header">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
            className="admin-header-logo"
            alt="logo"
          />
        </Link>
        <div className="admin-header-right">
          <p>{userInfo && userInfo.name ? `Welcome ${userInfo.name}` : "Become a host"}</p>
          <LanguageIcon />
          <div className="admin-header-dropdowns">
            <MenuIcon className="admin-menu-icon" />
            <div
              className={`admin-dropdown ${
                dropdownVisible ? 'admin-dropdown-visible' : ''
              }`}
            >
              <Avatar className="admin-dropbtn" onClick={toggleDropdown} />
              <div className="admin-dropdown-content" ref={dropdownRef}>
                {userInfo ? (
                  <>
                    <span onClick={() => navigate('/view-reservations')}>View Reservations</span>
                    <span onClick={handleLogout}>Log out</span>
                  </>
                ) : (
                  <>
                    <div className='header-option' onClick={openModalHandle}>
                      <span>Log in</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
