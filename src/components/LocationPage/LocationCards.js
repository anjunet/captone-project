import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import "./LocationCards.css";

const LocationCards = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/locations");
        setLocations(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching locations");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleCardClick = (locationName) => {
    navigate(`/listings?locationName=${encodeURIComponent(locationName)}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cards-container">
      <div className="cards-heading">
        <p>5 Stays in all locations</p>
      </div>
      {locations.map((location) => (
        <div
          key={location._id}
          className="location-cards"
          onClick={() => handleCardClick(location.city)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={location.imageUrl}
            alt={location.city}
            className="location-image"
          />
          <div className="location-info">
            <h2 className="location-title">{location.city}</h2>
            <p className="location-name">{location.type}</p>
            <p className="location-rooms">{location.description}</p>
            <p className="location-amenities">{location.amenities}</p>
            <div className="rating-and-price">
              <div className="rating-and-star">
                <p className="location-rating">{location.rating}</p>
                <StarIcon className="gold-star" />
                <p className="reviews">{location.reviews}</p>
              </div>
              <p className="location-price">
                <span className="price-value">
                  R{parseFloat(location.price).toFixed(2)}
                </span>
                /night
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationCards;
