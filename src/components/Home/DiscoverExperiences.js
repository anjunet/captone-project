import React from "react";
import "./DiscoverExperiences.css";
import OnYourTrip from '../../assets/DiscoverExperiences/On-Your-Trip.jpeg'
import AtHome from '../../assets/DiscoverExperiences/At-Home.jpeg'

const DiscoverExperiences = () => {
  return (
    < div className="experiences-container">
      <h2>Discover Airbnb Experiences</h2>
      <div className="experiences-row">
        <div className="experiences-column">
          <img
            src={OnYourTrip}
            alt="Things to do on your trip"
          />
          <div className="experiences-info">
            <h3>Things to do on your trip</h3>
            <button className="experiences-btn">Experiences</button>
          </div>
        </div>
        <div className="experiences-column">
          <img
            src={AtHome}
            alt="Things to do from home"
          />
          <div className="experiences-info">
            <h3>Things to do from home</h3>
            <button className="online-experiences-btn">
              Online Experiences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverExperiences;
