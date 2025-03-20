import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/location-details/${id}`
        );
        setListing(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching listing details');
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="listing-details">
      <img src={listing.img} alt={listing.title} className="listing-image" />
      <div className="listing-info">
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>{listing.rooms}</p>
        <p>{listing.amenities}</p>
        <p>Rating: {listing.rating}</p>
        <p>Price: {listing.price}</p>
      </div>
    </div>
  );
};

export default ListingDetail;

