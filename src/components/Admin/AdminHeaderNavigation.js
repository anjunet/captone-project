import React from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminHeaderNavigation.css'

const AdminHeaderNavigation = () => {
  const navigate = useNavigate();
  
  return (
    
      <div className='admin-listings-navigation'>
        <button onClick={() => navigate('/admin/view-reservations')}>View Reservations</button>
        <button onClick={() => navigate('/admin/view-listings')}>View Listings</button>
        <button onClick={() => navigate('/admin/create-listing')}>Create Listing</button>
      </div>
  
  )
}

export default AdminHeaderNavigation
