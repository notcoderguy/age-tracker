import React from 'react';

const Modal = ({ isOpen, onRequestClose, children }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000, // Ensure modal is on top
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.1)', // Semi-transparent black
    backdropFilter: 'blur(8px)', // Apply blur to the background
    zIndex: 999, // Ensure backdrop is below modal
  };

  return (
    <>
      {isOpen && (
        <>
          <div style={backdropStyle} onClick={onRequestClose}></div>
          <div style={modalStyle}>
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
