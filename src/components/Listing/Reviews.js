import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./Reviews.css";
import ProfilePicture from '../../assets/locationDetails/Person.png';
import HostImage from '../../assets/locationDetails/Host.png'

const reviews = [
  {
    name: "Jose",
    date: "December 2021",
    comment: "Host was very attentive.",
    imageUrl: ProfilePicture,
  },
  {
    name: "Shayna",
    date: "December 2021",
    comment: "Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive. Cool murphy bed...",
    imageUrl: ProfilePicture,
  },
  {
    name: "Vladko",
    date: "November 2020",
    comment: "This is amazing place. It has everything one needs for a monthly business stay. Very clean and organized place. Amazing hospitality affordable price.",
    imageUrl: ProfilePicture,
  },
  {
    name: "Luke",
    date: "December 2021",
    comment: "Nice place to stay!",
    imageUrl: ProfilePicture,
  },
  {
    name: "Josh",
    date: "November 2021",
    comment: "Well designed and fun space, neighborhood has lots of energy and amenities.",
    imageUrl: ProfilePicture,
  },
  {
    name: "Jennifer",
    date: "January 2022",
    comment: "A centric place, near of a sub station and a supermarket with everything you need. ...",
    imageUrl: ProfilePicture,
  }
];

const Review = () => {
  return (
    <div className="review-container">
      <div className="review-heading">
        <h1>
          <StarRateIcon /> 5.0 · 7 reviews
        </h1>
      </div>
      <div className="review-scores">
        <div className="score-item">
          <span>Cleanliness</span>
          <div className="score-bar">
            <div className="score-value" style={{ width: "100%" }}></div>
          </div>
          <span>5.0</span>
        </div>
        <div className="score-item">
          <span>Communication</span>
          <div className="score-bar">
            <div className="score-value" style={{ width: "100%" }}></div>
          </div>
          <span>5.0</span>
        </div>
        <div className="score-item">
          <span>Check-in</span>
          <div className="score-bar">
            <div className="score-value" style={{ width: "100%" }}></div>
          </div>
          <span>5.0</span>
        </div>
        <div className="score-item">
          <span>Accuracy</span>
          <div className="score-bar">
            <div className="score-value" style={{ width: "100%" }}></div>
          </div>
          <span>5.0</span>
        </div>
        <div className="score-item">
          <span>Location</span>
          <div className="score-bar">
            <div className="score-value" style={{ width: "98%" }}></div>
          </div>
          <span>4.9</span>
        </div>
        <div className="score-item">
          <span>Value</span>
          <div className="score-bar">
            <div className="score-value" style={{ width: "94%" }}></div>
          </div>
          <span>4.7</span>
        </div>
      </div>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
          <div className="review-header">
            <img src={review.imageUrl} alt={review.name} className="review-image" />
            <div className="review-details">
              <h3>{review.name}</h3>
              <p>{review.date}</p>
            </div>
          </div>
          <div className="review-comment">
            <p>{review.comment}</p>
            {review.comment.length > 100 && <a href="#">Show more</a>}
          </div>
        </div>
        
        ))}
      </div>
      <div className="button-container">
      <button className="show-all-reviews-button">Show all 12 reviews</button>
      </div>
      
    </div>
  );
};

export default Review;