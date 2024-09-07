import React from 'react';
import '../styles/SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="delivery-list">
      <div className="skeleton-row">
        <div className="skeleton-column" style={{ width: '30%' }}></div>
        <div className="skeleton-column" style={{ width: '50%' }}></div>
        <div className="skeleton-column" style={{ width: '20%' }}></div>
      </div>
      <div className="skeleton-row">
        <div className="skeleton-column" style={{ width: '30%' }}></div>
        <div className="skeleton-column" style={{ width: '50%' }}></div>
        <div className="skeleton-column" style={{ width: '20%' }}></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
