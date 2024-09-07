import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeaturesPage.css';

const FeaturesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="features-page">
      <h2>Milk Delivery By @wais</h2>
      <h3>Web Panel Features</h3>

      <div className="feature-list">
        <div className="feature-item" onClick={() => navigate('/add-delivery')}>
          <span>→</span> Place Delivery 
        </div>
        <div className="feature-item" onClick={() => navigate('/bill-summary')}>
          <span>→</span> Bill Management
        </div>
        <div className="feature-item" onClick={() => navigate('/register')}>
          <span>→</span> Register Now
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
