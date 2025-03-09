import React, { useState } from "react";
import "../styles/CreateProfile.css";
import axios from "axios";

const CreateProfilePage = () => {
  const [formData, setFormData] = useState({
    userId: '',
    bio: '',
    profilePicture: null,
    age: '',
    location: '',
    interest: '',
    courses: '',
    school: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/create-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Profile Created: ", response.data);
      alert("Profile Created Successfully! Redirecting to home...");
      window.location.href = "/home";
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Error submitting profile. Check console for details.");
    }
  };

  return (
    <div className="createprofile-container">
      <h1 className="createprofile-title">Complete Your Profile</h1>
      <p className="createprofile-subtitle">Fill in your details to complete your profile:</p>
      
      <form onSubmit={handleSubmit} className="createprofile-form">
        
        <div className="createprofile-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter your user ID"
            required
          />
        </div>

        <div className="createprofile-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="createprofile-bio"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            required
          />
        </div>

        <div className="createprofile-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
            accept="image/png, image/jpg, image/jpeg"
            required
          />
        </div>

        <div className="createprofile-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
        </div>

        <div className="createprofile-group">
          <label htmlFor="location">Location</label>
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

        <div className="createprofile-row">
          <div className="createprofile-group">
            <label htmlFor="interest">Interest</label>
            <input
              type="text"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="Enter your interests"
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
              placeholder="Enter your course"
              required
            />
          </div>

          <div className="createprofile-group">
            <label htmlFor="school">School</label>
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
          Complete Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfilePage;
