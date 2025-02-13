import React, { useState } from 'react';
import '../styles/CreateProfile.css';
import axios from 'axios'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = '';
    data = axios.post('http://localhost:3000/api/signup',formData)
    .then(function (response){
      console.log("Form Data: ", response)
    })
    .catch(function (error){
      console.log(error)
    })
    // ;
    alert(JSON.stringify(formData))
    //console.log('Form Data:', data);
    
    //alert('Form submitted!');
  };

  return (
    <div className="createprofile-container">
      <h1 className="createprofile-title">Create Profile</h1>
      <p className="createprofile-subtitle">Fill in your info:</p>
      <form onSubmit={handleSubmit} className="createprofile-form">
        <div className="createprofile-group">
          <label htmlFor="userId">User id</label>
          <input
            type="id"
            id="id"
            name="id"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter your id"
            required
          />
        </div>

        <div className="createprofile-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="createprofile-bio"
            type="text"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Enter your bio"
            required
          />
        </div>
        <div className="createprofile-group">
          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            accept="image/png, image/jpg"
            required
          />
        </div>

        <div className="createprofile-group">
          <label htmlFor="age">Age</label>
          <input
            type="age"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
        </div>
        <div className="createprofile-group">
          <label htmlFor="Location">Location</label>
          <input
            type="location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your Address"
            required
          />
        </div>
        <div className="createprofile-row">
          <div className="createprofile-group">
            <label htmlFor="interest">Interest</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              required
            />
          </div>
          <div className="createprofile-group">
            <label htmlFor="courses">Course</label>
            <input
              type="text"
              id="courses"
              name="courses"
              value={formData.courses}
              onChange={handleChange}
              placeholder="Enter your course here"
              required
            />
          </div>
          <div className="createprofile-group">
            <label htmlFor="school">Last Name</label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="Enter your school"
              required
            />
          </div>
        </div>
        <button type="submit" className="createprofile-button">
          Create Profile
        </button>
      </form>
      
    </div>
  );
};

export default SignupPage;