import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminHeaderNavigation from './AdminHeaderNavigation'
import './AdminViewListings.css';

const AdminViewListings = () => {
  const [listings, setListings] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/adminlistings');
        setListings(response.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <AdminHeader />
      <AdminHeaderNavigation />
    
    <div className='admin-listings-page'>
      
      <h1>My Listings</h1>

      <div className="admin-listings-container">
        {listings.map((listing) => (
          <div key={listing._id} className="admin-listings-card">

            <img src={listing.img} alt={listing.title} className="admin-listing-image" />
            <div className="admin-listings-info">
              <h3 className="admin-listing-title">{listing.title}</h3>
              <p className="admin-listing-description">{listing.description}</p>
              <p className="admin-listing-rooms">Rooms: {listing.rooms}</p>
              <p className="admin-listing-price">Price: R{listing.price}</p>
              <p className="admin-listing-rating">Rating: {listing.rating}</p>
              <p className="admin-listing-amenities">Amenities: {listing.amenities}</p>
              <p>Location: {listing.locationName}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminViewListings;
