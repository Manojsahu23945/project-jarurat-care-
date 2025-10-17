import React, { useEffect, useCallback } from 'react';

const PatientModal = ({ patient, onClose }) => {
  if (!patient) return null;

  // Handle escape key press
  const handleEsc = useCallback((event) => {
    if (event.keyCode === 27) onClose();
  }, [onClose]);

  const handleTab = useCallback((event) => {
    const modal = document.querySelector('.modal');
    if (!modal) return;
    
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleTab);
    
    // Focus the close button when modal opens
    const closeButton = document.querySelector('.close');
    if (closeButton) closeButton.focus();
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleTab);
      document.body.style.overflow = 'unset';
    };
  }, [handleEsc, handleTab]);

  return (
    <div className="modal show" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose} aria-label="Close modal" role="button" tabIndex="0">&times;</span>
        <div id="patient-details">
          <div className="patient-detail-header">
            <h2 id="modal-title">{patient.name}</h2>
            <p>Patient ID: {patient.id}</p>
          </div>
          <div className="patient-detail-info">
            <div className="detail-item">
              <h4>Age</h4>
              <p>{patient.age}</p>
            </div>
            <div className="detail-item">
              <h4>Gender</h4>
              <p>{patient.gender}</p>
            </div>
            <div className="detail-item">
              <h4>Contact</h4>
              <p>{patient.contact}</p>
            </div>
            <div className="detail-item">
              <h4>Email</h4>
              <p>{patient.email}</p>
            </div>
            <div className="detail-item">
              <h4>Condition</h4>
              <p>{patient.condition}</p>
            </div>
            <div className="detail-item">
              <h4>Last Visit</h4>
              <p>{patient.lastVisit}</p>
            </div>
            <div className="detail-item">
              <h4>Address</h4>
              <p>{patient.address}</p>
            </div>
            <div className="detail-item">
              <h4>Emergency Contact</h4>
              <p>{patient.emergencyContact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;