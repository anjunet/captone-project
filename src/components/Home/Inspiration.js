import React from "react";
import "./Inspiration.css";
import RadissonBlu from "../../assets/Inspiration/Radisson-Blu-Hotel.jpg";
import HoughtonHotel from "../../assets/Inspiration/Houghton-Hotel.jpg";
import KrugerGate from "../../assets/Inspiration/Kruger-Gate-Hotel.jpg";
import LostCity from "../../assets/Inspiration/Palace-Of-The-Lost-City.jpg";

const Inspiration = () => {
  return (
    <div className="inspiration-container">
      {/* Inspiration cards Section */}
      <div className="cards-section">
        <h2>Inspiration for your next trip</h2>
        <div className="cards-row">
          <div className="city-card radisson-blu-hotel">
            <img src={RadissonBlu} alt="Radisson Blu Hotel" />
            <div className="card-info">
              <h3>Radisson Blu Hotel</h3>
              <p>53 km away</p>
            </div>
          </div>
          <div className="city-card houghton-hotel">
            <img src={HoughtonHotel} alt="The Houghton Hotel" />
            <div className="card-info">
              <h3>The Houghton Hotel</h3>
              <p>168 km away</p>
            </div>
          </div>
          <div className="city-card kruger-gate-hotel">
            <img src={KrugerGate} alt="Kruger Gate Hotel" />
            <div className="card-info">
              <h3>The Kruger Gate Hotel</h3>
              <p>300 km away</p>
            </div>
          </div>
          <div className="city-card palace-of-the-lost-city">
            <img src={LostCity} alt="Palace of the Lost City" />
            <div className="card-info">
              <h3>Palace of the Lost City Hotel</h3>
              <p>34 km away</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
