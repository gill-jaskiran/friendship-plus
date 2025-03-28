import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateProfile from './pages/CreateProfilePage'
import FrontPage from './pages/FrontPage';
import SearchPage2 from './pages/SearchPage2';
import ChooseInterestsPage from './pages/ChooseInterestsPage'; // added by neeta

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route path="/frontpage" element={<FrontPage />} />
        <Route path="/search" element={<SearchPage2 />} />
        <Route path="/chooseinterests" element={<ChooseInterestsPage />} /> 
      </Routes>
    </Router>
  );
};


export default App;
