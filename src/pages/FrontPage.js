import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import "../styles/FrontPage.css";
import welcomeImage from "../assets/WelcomeImage.jpg";
import axios from 'axios'
import { api } from '../components/api' // added by neeta
import { authService } from "../components/AuthService";


const HomePage = () => {

  // saves all possible interests of the users in local database
  authService.saveAllInterestTopics([
    "Science", "Technology", "Engineering", "Mathematics", "Humanities", "Arts",
    "Business", "Economics", "Languages", "Literature", "Environment", "Political",
    "International", "Psychology", "Debate", "Drama", "Gaming", "Robotics",
    "Coding", "Health", "Writing", "Reading", "Photography", "Painting",
    "Fitness", "Yoga", "Volunteer", "CommunityService", "Sports", "Music",
    "Dance", "Entrepreneurship", "HangingOut", "Socializing", "Concerts", "Festivals",
    "Performances", "Traveling", "Exploration", "CareerDevelopment", "PersonalFitness", "MentalHealth",
    "Cooking", "TVshows", "Movies", "Podcasts", "OnlineLearning", "Blogging",
    "Vlogging", "Internships", "JobOpportunities", "CareerFairs", "Events", "Conferences",
    "ProfessionalOrganizations", "ResumeBuilding", "InterviewPreparation", "BudgetingAndMoneyManagement", "Scholarships", "FinancialAid",
    "Gym", "Running", "Meditation", "Nutrition", "HealthyEating", "StressManagement", "Videography", "Editing", "Poetry",
    "AI", "MachineLearning", "Blockchain", "Cybersecurity", "WebDevelopment", "MobileDevelopment", "GameDevelopment", "DataScience"
  ])

  // profile data array hook
  const [profileData, setProfileData] = useState({
    bio: '',
    profilePicture: null,
    age: '',
    location: '',
    interest: [],
    courses: '',
    school: '',
  });
  // user data array hook
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: ''
  });


  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleSignOutClick = () => {
    api.post('/logout')
    window.location.href = "/";
  };

  const handleProfileCreateClick = () => {
    window.location.href = "/createprofile";
  };

  const handleSearchClick = () => {
    window.location.href = "/search";
  };

  useEffect(() => {
    let funct = async (userId) => {

      await api.get(`/profile/${userId}`)
        .then(response => {
          console.log("Data:", response.data.profile) // debugging
          console.log("id:", response.data.profile.id) // debugging
          console.log("uid:", response.data.profile.user_id)
          console.log("bio:", response.data.profile.bio)
          console.log("profile_pic:", response.data.profile.profile_pic)
          console.log("location:", response.data.profile.location)
          console.log("course:", response.data.profile.courses)
          console.log("interest:", response.data.profile.interests)

          setProfileWithData(response.data.profile); // sets profile data to hook
        })
        .catch(error => {
          console.error("Error:", error.message)

        });

      await api.get(`/user/${userId}`)
        .then(response => {
          console.log(response.data.user)
          setUserWithData(response.data.user) // set user data to hook

        })
        .catch(error => {
          console.error("Error:", error.message)
        })
    }

    if (authService.isLoggedIn()) {
      const userId = Number(authService.getUserId())
      console.log("userId:", userId)

      funct(userId)

    }
  }, [])

  // function to set profile array hook with profile data
  const setProfileWithData = (data) => {
    if (data.bio != '') {
      setProfileData(prevState => ({
        ...prevState, ["bio"]: data.bio
      }))
    }
    if (data.profile_pic) {
      setProfileData(prevState => ({
        ...prevState, ["profilePicture"]: data.profile_pic
      }))
    }
    if (data.age) {
      setProfileData(prevState => ({
        ...prevState, ["age"]: data.age
      }))
    }
    if (data.location) {
      setProfileData(prevState => ({
        ...prevState, ["location"]: data.location
      }))
    }
    if (data.courses) {
      setProfileData(prevState => ({
        ...prevState, ["courses"]: data.courses
      }))
    }
    if (data.school) {
      setProfileData(prevState => ({
        ...prevState, ["school"]: data.school
      }))
    }
    if (data.interests) {
      setProfileData(prevState => ({
        ...prevState, ["interest"]: data.interests
      }))
    }

  }
  // function to set user-hook with user data
  const setUserWithData = (data) => {
    if (data.username != '') {
      setUserData(prevState => ({
        ...prevState, ["username"]: data.username
      }))
    }

    if (data.email) {
      setUserData(prevState => ({
        ...prevState, ["email"]: data.email
      }))
    }
    if (data.phone) {
      setUserData(prevState => ({
        ...prevState, ["phone"]: data.phone
      }))
    }
    if (data.first_name) {
      setUserData(prevState => ({
        ...prevState, ["firstName"]: data.first_name
      }))
    }
    if (data.last_name) {
      setUserData(prevState => ({
        ...prevState, ["lastName"]: data.last_name
      }))
    }

  }

  // Format interests for display
  const formatInterests = (interests) => {
    if (!interests) return '';

    // If interests is an array, join with commas and spaces
    if (Array.isArray(interests)) {
      return interests.join(', ');
    }

    // If it's a string, return as is
    return interests;
  };

  // Create Profile, View Profile, Search Friends, Search Events,
  // Create Profile page, View Profile page, Search Friend list page, Events page  
  return (
    <div className="homepage-container">
      <main className="main-content">
        <div className="button-group">
          <button className="action-button" onClick={handleSearchClick}>Search</button>
          <button className="action-button" onClick={handleProfileCreateClick}>Create/Update Profile</button>
          <button className="action-button" onClick={handleSignOutClick}>Sign Out</button>
        </div>

        <h1>Profile</h1>
        <div className="profile-container">
          {profileData.profilePicture ? (
            <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
          ) : (
            <div className="default-profile-image">
              {userData.firstName && userData.firstName.charAt(0)}
              {userData.lastName && userData.lastName.charAt(0)}
            </div>
          )}
          <div className="profile-details">
            <h2><strong>{userData.firstName} {userData.lastName}</strong></h2>
            <p><strong>Username:</strong> {userData.username} </p>
            <p><strong>Email: </strong> {userData.email} </p>
            <p><strong>Phone: </strong> {userData.phone}</p>
            <p><strong>Bio:</strong></p>
            <p className="displayprofileBio">{profileData.bio}</p>
            <p><strong>Age:</strong> {profileData.age}</p>
            <p><strong>Location:</strong> {profileData.location}</p>
            <p><strong>Interests:</strong></p>
            <p className="displayprofileBio">{formatInterests(profileData.interest)}</p>
            <p><strong>Courses:</strong> {profileData.courses}</p>
            <p><strong>School:</strong> {profileData.school}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;