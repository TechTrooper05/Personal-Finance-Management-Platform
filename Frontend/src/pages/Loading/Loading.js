import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="skeleton-dashboard">
      {/* Top Wide Summary Boxes */}
      <div className="skeleton-summary-row">
        <div className="skeleton skeleton-summary-box"></div>
        <div className="skeleton skeleton-summary-box"></div>
        <div className="skeleton skeleton-summary-box"></div>
      </div>

      {/* Main Content Area / Info Table Skeleton */}
      <div className="skeleton-info-container">
        <div className="skeleton skeleton-info-header"></div>
        
        {/* Repeating List/Row Items */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="skeleton-info-row">
            <div className="skeleton skeleton-circle"></div>
            <div className="skeleton skeleton-text-long"></div>
            <div className="skeleton skeleton-text-short"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;