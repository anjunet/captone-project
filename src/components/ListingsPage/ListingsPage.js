import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import "./ListingsPage.css";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const locationName = query.get("locationName");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/listings?locationName=${encodeURIComponent(
            locationName
          )}`
        );
        setListings(response.data);
        console.log("Im here", response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching listings");
        setLoading(false);
        return;
      }
    };

    if (locationName) {
      fetchListings();
    } else {
      setError("Location name is required");
      setLoading(false);
    }
  }, [locationName]);


//Handle Card Click to Redirect to the Details Page
  const handleCardClick = (id) => {
    console.log("Navigating to listing details for id", id);
    navigate(`/location-details/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="listings-page">
      <p className="listings-header">
        {listings.length} stays in {locationName}
      </p>
      <div className="listings-container">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="listing-card"
            onClick={() => handleCardClick(listing._id)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={listing.img0}
              alt={listing.title}
              className="listing-image"
            />
            <div className="listing-info">
              <h2 className="listing-title">{listing.title}</h2>
              <p className="listing-description">{listing.locationName}</p>
              <p className="listing-rooms">{listing.rooms}</p>
              <p className="listing-amenities">{listing.amenities}</p>
              <div className="rating-and-reviews">
                <div className="rating-and-star">
                  <p className="listing-rating">{listing.rating}</p>
                  <StarIcon className="gold-star" />
                  <p className="reviews">{listing.reviews}</p>
                </div>
                <p className="listing-price">
                <span className="price-value">R{parseFloat(listing.price).toFixed(2)}</span> /night
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
