import React, { useState, useEffect } from "react";
import "../styles/CreateProfile.css";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../components/api";

const CreateProfilePage = () => {
  const [formData, setFormData] = useState({
    bio: '',
    profilePicture: null,
    age: '',
    location: '',
    interest: '',
    courses: '',
    school: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Get userID from localStorage when component mounts
  useEffect(() => {
    const userID = localStorage.getItem("userID");

    if (userID) {
      setUserId(userID);
    } else {
      toast.error("User ID not found. You may need to login again.");
    }
  }, []);

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

    if (!userId) {
      toast.error("User ID not available. Please login again.");
      return;
    }

    setIsLoading(true);

    // Create FormData object for multipart/form-data (file upload)
    const profileData = new FormData();

    // Add all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        profileData.append(key, formData[key]);
      }
    });

    const toastId = toast.loading("Creating your profile...");

    try {
      const response = await api.post(`/profile/${userId}`, profileData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Profile Created:", response.data);
      toast.success("Profile created successfully!", { id: toastId });

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/frontpage";
      }, 1500);
    } catch (error) {
      console.error("Error submitting profile:", error);

      // Extract error message
      const errorMsg = error.response?.data?.error || "Error creating profile";
      toast.error(errorMsg, { id: toastId });
      setIsLoading(false);
    }
  };

  // Preview for profile picture
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Create a preview URL for the selected image
    if (formData.profilePicture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(formData.profilePicture);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.profilePicture]);

  return (
    <div className="createprofile-container">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            padding: '16px',
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      />

      <h1 className="createprofile-title">Complete Your Profile</h1>
      <p className="createprofile-subtitle">Fill in your details to complete your profile:</p>

      <form onSubmit={handleSubmit} className="createprofile-form">
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
          {previewUrl && (
            <div className="image-preview">
              <img
                src={previewUrl}
                alt="Profile preview"
                style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px', borderRadius: '50%' }}
              />
            </div>
          )}
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
            min="13"
            max="120"
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

        <button
          type="submit"
          className="createprofile-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Profile...' : 'Complete Profile'}
        </button>
      </form>
    </div>
  );
};

export default CreateProfilePage;