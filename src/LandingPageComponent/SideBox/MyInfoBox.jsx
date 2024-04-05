import React, { useState } from 'react';
import './MyInfoBox.css'

function MyInfoBox() {
  const [isHovered, setIsHovered] = useState(false);

  const infoBoxStyles = {
    position: 'fixed',
    top: '40%',
    right: 0, // Positioned at the right edge
    transform: isHovered ? 'translateY(-50%) scale(1.2)' : 'translateY(-50%)',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: isHovered ? 'pointer' : 'default',
    opacity: isHovered ? 1 : 1, // Put it Just in case i want to change it
  };

  const letterStyle = {
    display: 'inline-block',
    margin: '0',
    padding: '5px', // Adjust padding for spacing
    textAlign: 'center',
  };

  const links = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/edy-kelvianto-440156202/', imageUrl: '../logo/lin.png' },
    { name: 'GitHub', url: 'https://github.com/limlyang121', imageUrl: '../logo/github.png' },
    { name: 'React.JS Code', url: 'https://github.com/limlyang121/Front-end-Research', imageUrl: '../logo/reactjs.png' },
    { name: 'Spring Code', url: 'https://github.com/limlyang121/Back-end-Research', imageUrl: '../logo/spring.png' },
    // Add more links as needed
  ];

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={infoBoxStyles}>
      {/* Show "My Info" when not hovered, links when hovered */}
      {isHovered ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0' }}>
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.url} target="_blank" rel="noreferrer noopener">
                <img src={link.imageUrl} alt="" className="imageStyle" />
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <span style={letterStyle}>M</span>
          <span style={letterStyle}>y</span>
          <span style={letterStyle}>I</span>
          <span style={letterStyle}>n</span>
          <span style={letterStyle}>f</span>
          <span style={letterStyle}>o</span>
        </>
      )}
    </div>
  );
}

export default MyInfoBox;
