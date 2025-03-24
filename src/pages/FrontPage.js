import React from "react";
import "../styles/HomePage.css";
import friendImage1 from "../assets/Friend1.jpg"; 
import axios from 'axios'


const HomePage = () => {
  // const handleLoginClick = () => {
  //   window.location.href = "/login"; 
  // };

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
 
  return (
    <div className="homepage-container">
      <main className="main-content">
        <h1>Welcome!</h1>
        <div className="button-group">
          <button className="action-button" onClick={handleSearchClick}>Search</button>
          <button className="action-button" onClick={handleProfileCreateClick}>Create Profile</button>
          <button className="action-button" onClick={handleSignOutClick}>Sign Out</button>
        </div>
        <div>
          <img src={friendImage1} alt="Friend1" className="friend1-image" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
