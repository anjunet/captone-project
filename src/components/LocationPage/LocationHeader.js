import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../actions/userActions';
import { Avatar } from '@mui/material';
import './LocationHeader.css';

const LocationDetailsHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Initialize userLogin and destructure userInfo
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Toggle dropdown visibility
  const toggleDropdown = (e) => {
    e.stopPropagation();
    console.log("Dropdown toggled:", !dropdownVisible);
    setDropdownVisible(prev => !prev);
  };

  // Handle click outside of dropdown to close it
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

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleViewReservations = () => {
    navigate('/reservations');
    setDropdownVisible(false);
  };

  return (
    <div className="location-details-header-container">
      <div className="location-details-header">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
            className="location-details-header-logo"
            alt="logo"
          />
        </Link>
        <div className="location-details-header-center">
          <p>Places to Stay</p>
          <p>Experiences</p>
          <p>Online Experiences</p>
        </div>
        <div className="location-details-header-right">
          <p>{userInfo && userInfo.name ? `Welcome ${userInfo.name}` : "Become a host"}</p>
          <LanguageIcon />
          <div className="location-details-header-dropdowns">
            <MenuIcon className="location-details-menu-icon" />
            <div
              className={`location-details-dropdown ${
                dropdownVisible ? 'location-details-dropdown-visible' : ''
              }`}
            >
              <Avatar className="location-details-avatar-button" onClick={toggleDropdown} />
              <div className="location-details-dropdown-content" ref={dropdownRef}>
                {userInfo ? (
                  <>
                    {userInfo.hasReservations && (
                      <span onClick={handleViewReservations}>View Reservations</span>
                    )}
                    <span onClick={handleLogout}>Log out</span>
                  </>
                ) : (
                  <span onClick={() => navigate('/admin/login')}>Log in</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsHeader;