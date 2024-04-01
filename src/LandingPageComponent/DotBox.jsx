import React, { useState } from 'react';
import './DotBox.css'; // Import your CSS file

const DotBox = ({ boxContent, activeDotIndex }) => {
  // No need for dotContents anymore

  const handleDotClick = (index) => {
    // No need to update activeDotIndex here
  };

  return (
    <div className="dot-box-container">
      <div className="box">{boxContent}</div>
      {/* No need for dots-container or active-content */}
    </div>
  );
};

export default DotBox;
