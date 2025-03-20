import React from "react";
import "./ShopAirBnb.css";
import GiftCards from '../../assets/ShopAirBnb/Gift-Cards.jpeg'

const ShopAirBnb = () => {
  return (
    <div className="shop-airbnb-container">
      <div className="left-content">
        <p>Shop Airbnb gift cards</p>
        <button>Learn more</button>
      </div>
      <img
        src={GiftCards}
        alt="Airbnb gift cards"
        className="gift-cards-image"
      />
    </div>
  );
};

export default ShopAirBnb;
