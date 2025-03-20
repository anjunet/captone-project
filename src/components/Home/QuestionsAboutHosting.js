import React from "react";
import "./QuestionsAboutHosting.css";
import Hosting from '../../assets/Hosting/Hosting.jpeg'

const QuestionsAboutHosting = () => {
  return (
    <div className="hosting-container">
      <img
        src={Hosting}
        alt="Questions about hosting?"
        className="background-image"
      />
      <div className="hosting-content">
        <h1>Questions about hosting?</h1>
        <button>Ask a Superhost</button>
      </div>
    </div>
  );
};

export default QuestionsAboutHosting;
