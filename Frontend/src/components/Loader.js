import React, { useState, useEffect } from 'react';
import '../styles/Loader.css';

const Loader = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const duration = 3000; 
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps; 

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) {
          return Math.min(prev + increment, 100); 
        } else {
          clearInterval(interval); 
          return prev;
        }
      });
    }, intervalTime); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="loader-container">
      <div
        className="circular-loader"
        style={{
          background: `conic-gradient(#25b09b ${percentage * 3.6}deg, rgba(0, 0, 0, 0.2) 0deg)`
        }}
      >
        <span className="loader-text">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default Loader;
