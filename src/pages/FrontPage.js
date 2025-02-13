import React from "react";
import "../styles/HomePage.css";
import welcomeImage from "../assets/WelcomeImage.jpg"; 
import axios from 'axios'


const HomePage = () => {
  const handleLoginClick = () => {
    window.location.href = "/login"; 
  };

  const handleSignOutClick = () => {
    axios.post('http://localhost:3000/logout')
    window.location.href = "/"; 
  };

  const handleProfileCreateClick = () => {
    window.location.href = "/createprofile"; 
  };

  const handleSearchClick = () => {
    window.location.href = "/search"; 
  };

  // Create Profile, View Profile, Search Friends, Search Events,
  // Create Profile page, View Profile page, Search Friend list page, Events page  
  return (
    <div className="homepage-container">
      <main className="main-content">
        <h1>Friendship Plus</h1>
        <div className="button-group">
          <button className="action-button" onClick={handleSearchClick}>Search</button>
          <button className="action-button" onClick={handleProfileCreateClick}>Create Profile</button>
          <button className="action-button" onClick={handleSignOutClick}>Sign Out</button>
        </div>
        <div>
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
