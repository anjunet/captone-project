import React from "react";
import "./HostSection.css";
import HostImage  from '../../assets/locationDetails/Host.png'

const HostSection = () => {
  return (
    <div className="about-host-container">
      <div className="host-details">
        <img  className='host-image' src={HostImage} />
        <div className="host-info">
          <h2>Hosted by Ghazal</h2>
          <p>Joined May 2021</p>
          <p>
            <span>⭐</span> 12 Reviews <span>✔️</span> Identity verified <span>🌟</span> Superhost
          </p>
          <p>Ghazal is a Superhost</p>
          <p>
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </p>
          <p>Response rate: 100%</p>
          <p>Response time: within an hour</p>
          <button className="contact-host-button">Contact Host</button>
          <p className="disclaimer">
            To protect your payment, never transfer money or communicate outside of
            the Airbnb website or app.
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default HostSection;