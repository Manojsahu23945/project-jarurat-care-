import React, { memo } from 'react';

const PatientCard = memo(({ patient, onViewDetails, style }) => {
  return (
    <div className="patient-card" style={style}>
      <div className="patient-card-header">
        <h3>{patient.name}</h3>
        <p>ID: {patient.id}</p>
      </div>
      <div className="patient-card-body">
        <div className="patient-info">
          <p><span>Age:</span> <span>{patient.age}</span></p>
          <p><span>Contact:</span> <span>{patient.contact}</span></p>
          <p><span>Condition:</span> <span>{patient.condition}</span></p>
        </div>
        <button 
          className="view-details-btn" 
          onClick={() => onViewDetails(patient)}
          aria-label={`View details for patient ${patient.name}`}
        >
          <span className="button-text">View Details</span>
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
});

export default PatientCard;