import React, { useState } from 'react';
import Modal from 'react-modal';
import './NewChangeBox.css';

Modal.setAppElement('#root'); // Make sure this matches your app root element

function NewChangeBox() {
  const [isOpen, setIsOpen] = useState(false);

  const boxStyles = {
    position: 'fixed',
    top: '40%',
    left: 0, // Positioned at the left edge
    transform: 'translateY(-50%)',
    padding: '10px',
    width: '50px', // Match the width of the right box
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1000, // Ensure it appears above other elements
  };

  const letterStyle = {
    display: 'inline-block',
    margin: '0',
    padding: '5px', // Adjust padding for spacing
    textAlign: 'center',
  };

  const newChanges = [
    "Pagination for Author Completed (Front-end And Backend), Reviewer halfway",
    "Add Pagination for Author on front-end (Backend when i insert enough dummy data)",
    "Add Pagination on User Account in Both Front-End and Backend",
    "Backlog implemented"
  ];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={openModal} style={boxStyles}>
        {/* Show "Change Log" */}
        <>
          <span style={letterStyle}>C</span>
          <span style={letterStyle}>h</span>
          <span style={letterStyle}>a</span>
          <span style={letterStyle}>n</span>
          <span style={letterStyle}>g</span>
          <span style={letterStyle}>e</span>
          <span style={letterStyle}>L</span>
          <span style={letterStyle}>o</span>
          <span style={letterStyle}>g</span>
        </>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Change Log Modal"
      >
        <div className="ModalContent">
          <h1 className="ModalTitle">Change Log</h1>
          <ul className="ChangeList">
            {newChanges.map((change, index) => (
              <li key={index}>{change}</li>
            ))}
          </ul>
          <div className="ButtonContainer">
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NewChangeBox;
