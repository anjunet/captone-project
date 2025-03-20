import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Filter.css';
import { useLocation, useNavigate } from 'react-router-dom'; 
import SearchIcon from "@mui/icons-material/Search";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const filterBackground = location.pathname === '/locations' ? 'white' : 'black';
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const guestDropdownRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  // Fetch location names for our dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations', error);
      }
    };

    fetchLocations();
  }, []);

  // Update selectedLocation based on URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationName = searchParams.get('locationName') || "";
    setSelectedLocation(locationName);
  }, [location]);

  const handleLocationChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "local") {
      navigate('/locations');
    } else if (selectedValue) {
      navigate(`/listings?locationName=${encodeURIComponent(selectedValue)}`);
    }
  };

  const handleSearch = () => {
    navigate(`/listings?locationName=${encodeURIComponent(selectedLocation)}&checkInDate=${encodeURIComponent(checkInDate?.toISOString())}&checkOutDate=${encodeURIComponent(checkOutDate?.toISOString())}&adults=${adults}&children=${children}`);
  };

  const toggleGuestOptions = () => {
    setShowGuestOptions(!showGuestOptions);
  };

  const handleGuestsChange = (type, operation) => {
    if (type === 'adults') {
      setAdults(prev => (operation === 'increment' ? prev + 1 : (prev > 0 ? prev - 1 : prev)));
    } else if (type === 'children') {
      setChildren(prev => (operation === 'increment' ? prev + 1 : (prev > 0 ? prev - 1 : prev)));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        guestDropdownRef.current && !guestDropdownRef.current.contains(event.target) &&
        checkInRef.current && !checkInRef.current.contains(event.target) &&
        checkOutRef.current && !checkOutRef.current.contains(event.target)
      ) {
        setShowGuestOptions(false);
        setCheckInDate(null); // Reset check-in date
        setCheckOutDate(null); // Reset check-out date
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalGuests = adults + children;

  return (
    <div className="filter-container" style={{ backgroundColor: filterBackground }}>
      <div className="search-bar">
        <div className="search-section">
          <label htmlFor="location">Locations</label>
          <select
            id="location"
            name="location"
            className="select-style"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">Select a Location</option>
            <option value="local">All Locations</option>
            {locations.map((location) => (
              <option key={location._id} value={location.locationName}>
                {location.locationName}
              </option>
            ))}
          </select>
        </div>
        <div className="search-section" ref={checkInRef}>
          <label htmlFor="checkInDate">Check in</label>
          <DatePicker
            id="checkInDate"
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date"
          />
        </div>
        <div className="search-section" ref={checkOutRef}>
          <label htmlFor="checkOutDate">Check out</label>
          <DatePicker
            id="checkOutDate"
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date"
          />
        </div>
        <div className="search-section" ref={guestDropdownRef}>
          <label>Guests</label>
          <span onClick={toggleGuestOptions} className="total-guests">{totalGuests} Guests</span>
          {showGuestOptions && (
            <div className="guests-dropdown">
              <div className="guests-counter">
                <div className="counter-section">
                  <label>Adults</label>
                  <div className="counter">
                    <button onClick={() => handleGuestsChange('adults', 'decrement')}>-</button>
                    <span>{adults}</span>
                    <button onClick={() => handleGuestsChange('adults', 'increment')}>+</button>
                  </div>
                </div>
                <div className="counter-section">
                  <label>Children</label>
                  <div className="counter">
                    <button onClick={() => handleGuestsChange('children', 'decrement')}>-</button>
                    <span>{children}</span>
                    <button onClick={() => handleGuestsChange('children', 'increment')}>+</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='search_button' onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Filter;
