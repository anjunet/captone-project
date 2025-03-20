import React from "react";
import "./HeroBanner.css";
import airbnbBanner from '../../assets/airbnb-banner.jpeg'

const HeroBanner = () => {
  return (
    <div className="banner-container">
      <div className="banner">
        <img
          className="banner-image"
          src={airbnbBanner}
          alt="AirBnB Banner"
        />
        <div className="banner-text-container">
          <h1 className="banner-text">Not sure where to go? Perfect.</h1>
          <button className="banner-text-button">I'm flexible</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;