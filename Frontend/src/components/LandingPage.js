import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css'; 

const LandingPage = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/deliveries'); 
  };

  const handleRegisterNow = () => {
    navigate('/features'); 
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="text-content">
          <h1 className="typewriter">eMilk Deliveries by @wais.. </h1>
          <p>
            Our Milk Delivery App sounds very convenient and user-friendly! It efficiently handles the daily data records of household milk deliveries, making it easy for users to manage their milk orders and schedules.
          </p>
          <p>© 2024 Shehroz Ali. All rights reserved.</p>
          
          <div className="buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleRegisterNow}>
              All in one
            </button>
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="mobile-mockups">
          <img src={`${process.env.PUBLIC_URL}/sww.png`} alt="Mobile Mockup 1" className="mobile-image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
