import React, { useState, useEffect } from "react";
import "../styles/CreateProfile.css";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../components/api";
import { authService } from '../components/AuthService.js'; // added by neeta

const CreateProfilePage = () => {
  const [formData, setFormData] = useState({
    bio: '',
    profilePicture: null,
    age: '',
    location: '',
    interests: [], // Changed from 'interest' to 'interests' and made it an array
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

    //authService.resetInterestsEntryState()
    authService.resetInterestsEntryStateForSearch()

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

  // Add this function at the top of your component
  const compressImage = async (file) => {
    // Don't process if the file is already small (less than 500KB)
    if (file.size <= 500 * 1024) return file;

    // Create a canvas to resize the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve) => {
      img.onload = () => {
        // Set maximum width and height
        const maxWidth = 600;
        const maxHeight = 600;
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth) {
          height = Math.round(height * maxWidth / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round(width * maxHeight / height);
          height = maxHeight;
        }

        // Resize image
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => {
          // Create a new file from the blob
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          resolve(compressedFile);
        }, 'image/jpeg', 0.6); // 60% quality
      };

      // Load the image
      const reader = new FileReader();
      reader.onload = (e) => img.src = e.target.result;
      reader.readAsDataURL(file);
    });
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

    if (formData.profilePicture) {
      const compressed = await compressImage(formData.profilePicture);
      formData.profilePicture = compressed;
    }

    // Add all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        // Handle interests array specially
        if (key === 'interests' && Array.isArray(formData[key])) {
          // Convert interests array to a JSON string to preserve array structure
          profileData.append(key, JSON.stringify(formData[key]));
        } else {
          profileData.append(key, formData[key]);
        }
      }
    });

    const toastId = toast.loading("Creating your profile...");

    try {
      // Get the token directly from the cookie
      const token = authService.getToken();
      console.log("Token:", token);

      const response = await api.post(`/profile/${userId}`, profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });

      console.log("Profile Created:", response.data);
      toast.success("Profile created successfully!", { id: toastId });
      authService.removeFormData()
      authService.resetInterestsList()
      window.location.href = "/frontpage";

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

  // added by neeta
  (() => {
    if (authService.isInInterestsEntryState() == false) {
      authService.removeFormData()
    }
  })()

  // added by neeta
  useEffect(() => {
    // added by Neeta
    if (authService.isInInterestsEntryState()) {
      console.log("useEffect-isInInterestsEntryState")
      const initFormData = authService.retrieveFormData()
      if (initFormData.bio != '') {
        console.log("bio info - exists")
        setFormData(prevState => ({
          ...prevState, ["bio"]: initFormData.bio
        }))
        console.log(initFormData.bio)

      }
      if (initFormData.profilePic) {
        setFormData(prevState => ({
          ...prevState, ["profilePic"]: initFormData.profilePic
        }))
      }
      if (initFormData.age) {
        setFormData(prevState => ({
          ...prevState, ["age"]: initFormData.age
        }))
      }
      if (initFormData.location) {
        setFormData(prevState => ({
          ...prevState, ["location"]: initFormData.location
        }))
      }
      if (initFormData.course) {
        setFormData(prevState => ({
          ...prevState, ["courses"]: initFormData.courses
        }))
      }
      if (initFormData.school) {
        setFormData(prevState => ({
          ...prevState, ["school"]: initFormData.school
        }))
      }
      let retLst = authService.retrieveInterestsList();
      if (retLst) {
        console.log("retLst:", retLst)
        setFormData(prevState => ({
          ...prevState, ["interests"]: retLst.interestList // Changed from "interest" to "interests"
        }))
      }

      //authService.resetInterestsEntryState()
    }
  }, [])

  // Format interests for display as a string (comma-separated)
  const formatInterestsForDisplay = (interests) => {
    if (!interests) return '';
    if (Array.isArray(interests)) {
      return interests.join(', ');
    }
    return interests;
  };

  // added by neeta
  const handleSelectInterest = () => {
    authService.storeFormData(formData.bio, formData.profilePicture, formData.age, formData.location, formData.course, formData.school)

    console.log('handle select intersted pressed')
    console.log("bio:", formData.bio)
    console.log("age:", formData.age)
    console.log("location:", formData.location)
    console.log(authService.retrieveFormData())
    authService.setInterestsEntryState()
    authService.resetInterestsEntryStateForSearch()
    window.location.href = "/chooseinterests";
  }

  const backToProfile = () => {
    authService.removeFormData()
    authService.resetInterestsList()
    authService.resetInterestsEntryState()
    window.location.href = "/frontpage";
  }

  const handleClear = () => {
    authService.storeFormData("", "", "", "", "")
    authService.resetInterestsList()
    authService.resetInterestsEntryState()
    setFormData({
      bio: '',
      profilePicture: null,
      age: '',
      location: '',
      interests: [], // Changed from 'interest' to 'interests' and made it an array
      courses: '',
      school: '',
    })
  };

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
            placeholder={formData.bio !== '' ? formData.bio : "Tell us about yourself"}
            required
          />
        </div>

        {/* Interest input - moved down and changed - neeta */}
        <div className="createprofile-group">
          <label htmlFor="interests">Interests</label> {/* Changed from "interest" to "interests" */}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <input
              type="text"
              id="interests" // Changed from "interest" to "interests"
              name="interests" // Changed from "interest" to "interests"
              value={formatInterestsForDisplay(formData.interests)} // Changed from formData.interest and added formatting
              onChange={handleChange}
              placeholder={formatInterestsForDisplay(formData.interests) || "Press button to select your interests"} // Added formatting
              required
              readOnly
            />
            <input
              type="button"
              value="Select Interests"
              style={{ width: 115 }}
              onClick={handleSelectInterest}
            />
          </div>
        </div>

        <div className="createprofile-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
            accept="image/png, image/jpg, image/jpeg"
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
            placeholder={formData.age ? formData.age : "Enter your age"}
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
            placeholder={formData.location ? formData.location : "Enter your location"}
            required
          />
        </div>

        <div className="createprofile-row">
          <div className="createprofile-group">
            <label htmlFor="courses">Course</label>
            <input
              type="text"
              id="courses"
              name="courses"
              value={formData.courses}
              onChange={handleChange}
              placeholder={formData.courses ? formData.courses : "Enter your course"}
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
              placeholder={formData.school ? formData.school : "Enter your school"}
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
        <button type="button" className="createprofile-button" onClick={handleClear}>Clear Form</button>
        <button type="button" className="createprofile-button" onClick={backToProfile}>Back To Profile</button>

      </form>
    </div>
  );
};

export default CreateProfilePage;