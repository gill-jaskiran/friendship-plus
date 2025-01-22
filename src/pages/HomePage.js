import React from "react";
import "../styles/HomePage.css";
import welcomeImage from "../assets/WelcomeImage.jpg"; 
const HomePage = () => {
  const handleLoginClick = () => {
    window.location.href = "/signup"; 
  };

  const handleSignupClick = () => {
    window.location.href = "/signup"; 
  };

  return (
    <div className="homepage-container">
      <main className="main-content">
        <h1>Friendship Plus</h1>
        <div className="button-group">
          <button className="action-button" onClick={handleLoginClick}>Log In</button>
          <button className="action-button" onClick={handleSignupClick}>Sign up Now!</button>
        </div>
        <div>
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
