// added by neeta
import React, { useState, useEffect } from 'react';
import '../styles/SignupPage.css';
import axios from 'axios' ////
//import LoginPage from './LoginPage';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { authService } from '../components/AuthService.js'; // added by neeta



const ChooseInterestsPage = () => {

  const [interests, setInterests] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const interests = [
      "Science", "Technology", "Engineering", "Mathematics", "Humanities", "Arts",
      "Business", "Economics", "Languages", "Literature", "Environment", "Political",
      "International", "Psychology", "Debate", "Drama", "Gaming", "Robotics",
      "Coding", "Health", "Writing", "Reading", "Photography", "Painting",
      "Fitness", "Yoga", "Volunteer", "CommunityService", "Sports", "Music",
      "Dance", "Entrepreneurship", "Hanging Out", "Socializing", "Concerts","Festivals",
      "Performances", "Traveling", "Exploration", "CareerDevelopment", "PersonalFitness", "MentalHealth",
      "Cooking", "TVshows", "Movies", "Podcasts", "OnlineLearning", "Blogging", 
      "Vlogging", "Internships", "JobOpportunities", "CareerFairs", "Events", "Conferences",
      "ProfessionalOrganizations", "ResumeBuilding", "InterviewPreparation", "BudgetingAndMoneyManagement", "Scholarships", "FinancialAid",
      "Gym", "Running", "Meditation", "Nutrition", "HealthyEating", "StressManagement", "Videography", "Editing", "Poetry", 
      "AI", "MachineLearning", "Blockchain", "Cybersecurity", "WebDevelopment", "MobileDevelopment", "GameDevelopment", 
      "DataScience"
    ];  
    setInterests(interests)
    
  }, [])

  /*
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
*/

  const handleCheckboxChange = (e) => {
    const {value, checked} = e.target
    //console.log(value)
    setSelectedAnswers((prev) => checked?[...prev, value]:prev.filter((answer) => answer !== value))
    console.log("selected Answers:",selectedAnswers)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    authService.storeInterestsList(selectedAnswers.join(","))
    console.log('Selected Answers:', selectedAnswers.join(","))
    if(authService.isInInterestsEntryState())
      window.location.href = "/createprofile";
    else
      window.location.href = "/search";

    /*
    e.preventDefault();
    let data = '';
    data = axios.post('http://localhost:3001/api/signup',formData)
    .then(function (response){
      console.log("Form Data: ", response)
      alert('Form submitted! Consider Logging-In');
      window.location.href = "/login";
    })
    .catch(function (error){
      console.log(error)
    })
    // ;
    //alert(JSON.stringify(formData))
    //console.log('Form Data:', data);
    */
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Choose your interests</h1>
      <form onSubmit={handleSubmit} className="signup-form">
      {interests.map((interest, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
           <div style={{ marginRight: '10px' }}>
            <input type = "checkbox" htmlFor={`choice-${index}` } value={interest}
              onChange={handleCheckboxChange}
            ></input></div>
           <div>
            <label> {interest}:</label>
            </div>
        </div>
      ))}

        <button type="submit" className="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChooseInterestsPage;








/*

Science
Technology
Engineering
Mathematics
Humanities
Arts
Business
Economics
Languages
Literature
Environment
Political
International
Psychology
Debate
Drama
Gaming
Robotics
Coding
Health
Writing
Reading
Photography
Painting
Fitness
Yoga
Volunteer
CommunityService
Sports
Music
Dance
Entrepreneurship
HangingOut
Socializing
Concerts
Festivals
Performances
Traveling
Exploration
CareerDevelopment
PersonalFitness
MentalHealth
Cooking
TVshows
Movies
Podcasts
OnlineLearning
Blogging
Vlogging
Internships
JobOpportunities
CareerFairs
Events
Conferences
ProfessionalOrganizations
ResumeBuilding
InterviewPreparation
BudgetingAndMoneyManagement
Scholarships
FinancialAid
Gym
Running
Meditation
Nutrition
HealthyEating
StressManagement
Videography
Editing
Poetry


*/