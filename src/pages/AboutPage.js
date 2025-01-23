import React from "react";
import "../styles/AboutPage.css";
import infoIcon from "../assets/InfoIcon.png"; 

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <img src={infoIcon} alt="Info Icon" className="about-icon" />
        <h1 className="about-title">About</h1>
      </div>

      <div className="content-section">
        <div className="content-left">WHAT WE BELIEVE</div>
        <div className="content-right">
          <p>
            We believe in helping students create long-lasting friendships in an educational setting.
          </p>
          <p>
            Friendship Plus is intended for post-secondary students who find it
            difficult to form lasting friendships when entering a new environment.
            Friendship Plus is a student-based social media networking platform that
            allows students to connect with like-minded individuals, discover clubs
            of interest, form groups within classes, and network.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


