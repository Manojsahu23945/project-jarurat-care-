import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PatientCard from './PatientCard';
import PatientModal from './PatientModal';
import patientsData from '../data/patients-data.json';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    gender: '',
    condition: '',
    lastVisit: '',
    address: '',
    email: '',
    emergencyContact: ''
  });

  // Load patient data on component mount
  useEffect(() => {
    setPatients(patientsData.patients);
    setFilteredPatients(patientsData.patients);
  }, []);

  // Filter patients based on search query - optimized with useMemo
  const filterPatients = useCallback(() => {
    if (searchQuery === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchQuery, patients]);

  useEffect(() => {
    filterPatients();
  }, [filterPatients]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = useCallback((patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  }, []);

  const handleAddPatientClick = useCallback(() => {
    console.log('Add Patient button clicked');
    setIsAddFormOpen(true);
    // Reset form data when opening
    setFormData({
      name: '',
      age: '',
      contact: '',
      gender: '',
      condition: '',
      lastVisit: '',
      address: '',
      email: '',
      emergencyContact: ''
    });
    setError(null);
  }, []);

  const handleCloseAddForm = useCallback(() => {
    setIsAddFormOpen(false);
    setError(null);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      return 'Name is required';
    }
    if (!formData.age || formData.age <= 0) {
      return 'Valid age is required';
    }
    if (!formData.contact.trim()) {
      return 'Contact is required';
    }
    if (!formData.gender) {
      return 'Gender is required';
    }
    if (!formData.condition.trim()) {
      return 'Condition is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Email is invalid';
    }
    return null;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new patient object
      const newPatient = {
        id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
        ...formData,
        age: parseInt(formData.age)
      };
      
      // Update state
      const updatedPatients = [newPatient, ...patients];
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
      
      // Close form
      setIsAddFormOpen(false);
    } catch (err) {
      setError('Failed to add patient. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [formData, patients, validateForm]);

  // Memoize the patient cards to prevent unnecessary re-renders
  const patientCards = useMemo(() => {
    return filteredPatients.map((patient, index) => (
      <PatientCard
        key={patient.id}
        patient={patient}
        onViewDetails={handleViewDetails}
        style={{ animationDelay: `${index * 0.1}s` }}
      />
    ));
  }, [filteredPatients, handleViewDetails]);

  return (
    <main>
      <section className="patients-header">
        <div className="container">
          <h2>Patient Records</h2>
          <p>Manage and view patient information</p>
        </div>
      </section>
      
      <section className="patients-content">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              id="searchInput"
              placeholder="Search patients by name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button id="searchBtn" className="search-button">Search</button>
          </div>
          
          <div id="patients-container" className="patients-grid">
            {patientCards}
          </div>
          
          <div className="add-patient">
            <button 
              id="addPatientBtn" 
              className="primary-btn add-patient-btn"
              onClick={handleAddPatientClick}
            >
              <span className="plus-icon">+</span> Add New Patient
            </button>
          </div>
        </div>
      </section>
      
      {/* Add Patient Form Modal */}
      {isAddFormOpen && (
        <div className="modal add-patient-modal show" onClick={handleCloseAddForm} role="dialog" aria-modal="true" aria-labelledby="add-patient-title">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseAddForm} aria-label="Close modal" role="button" tabIndex="0">&times;</span>
            <div id="add-patient-form">
              <div className="patient-detail-header">
                <h2 id="add-patient-title">Add New Patient</h2>
              </div>
              <form onSubmit={handleSubmit} className="add-patient-form">
                {error && <div className="error-message">{error}</div>}
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="1"
                      max="120"
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contact">Contact Number *</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="condition">Medical Condition *</label>
                    <input
                      type="text"
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastVisit">Last Visit Date</label>
                    <input
                      type="date"
                      id="lastVisit"
                      name="lastVisit"
                      value={formData.lastVisit}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="emergencyContact">Emergency Contact</label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="form-textarea"
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="secondary-btn"
                    onClick={handleCloseAddForm}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="primary-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="button-loading">
                        <span className="loading-spinner"></span> Adding...
                      </span>
                    ) : 'Add Patient'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {isModalOpen && (
        <PatientModal
          patient={selectedPatient}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default PatientsPage;