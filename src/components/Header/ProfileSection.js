import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import './ProfileSection.css';

const ProfileSection = () => {
  const { userInfo, logout } = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from UserContext
    setDropdownVisible(false);
    navigate('/'); // Redirect to home page after logging out
  };

  const handleBecomeHost = () => {
    navigate('/admin/login?redirect=/admin/view-listings'); // Redirect to login page with query parameter
    setDropdownVisible(false);
  };

  const handleLoginClick = () => {
    navigate('/admin/login?redirect=/locations'); // Redirect to login page with query parameter
    setDropdownVisible(false);
  };

  // const openModalHandle = () => {
  //   navigate('/admin/login');  // Redirect to login page
  //   setDropdownVisible(false);
  // };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header-container">
      <div className="header">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
            className="header_logo"
            alt="logo"
          />
        </Link>
        <div className="header_center">
          <p>Places to Stay</p>
          <p>Experiences</p>
          <p>Online Experiences</p>
        </div>
        <div className="header_right">
          <p onClick={handleBecomeHost}>Become a host</p> {/* Corrected onClick */}
          <LanguageIcon />
          <div className="header_dropdowns">
            <MenuIcon className="menu-icon" />
            <div className={`dropdown ${dropdownVisible ? 'dropdown-visible' : ''}`}>
              <Avatar className='dropbtn' onClick={toggleDropdown} />
              <div className="dropdown-content" ref={dropdownRef}>
                {userInfo ? (
                  <>
                    <span onClick={() => navigate('/reservations')}>View Reservations</span>
                    <span onClick={handleLogout}>Log out</span>
                  </>
                ) : (
                  <div className='login-dropdown'>
                    <span onClick={handleLoginClick}>Log in</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
