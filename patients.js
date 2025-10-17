// Patient search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Fetch patient data
    fetchPatientData();
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // Search when button is clicked
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        filterPatients(searchTerm);
    });
    
    // Search when Enter key is pressed
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            filterPatients(searchTerm);
        }
    });
    
    // Add patient button functionality
    const addPatientBtn = document.getElementById('addPatientBtn');
    if (addPatientBtn) {
        addPatientBtn.addEventListener('click', function() {
            // Add animation effect
            this.classList.add('pulse-animation');
            setTimeout(() => {
                this.classList.remove('pulse-animation');
                alert('Add new patient functionality would open here.');
            }, 300);
            // In a real application, this would open a modal or redirect to a form
        });
    }
    
    // Modal functionality
    const modal = document.getElementById('patientModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking on X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Fetch patient data from JSON file
function fetchPatientData() {
    fetch('patients-data.json')
        .then(response => response.json())
        .then(data => {
            displayPatients(data.patients);
        })
        .catch(error => {
            console.error('Error fetching patient data:', error);
            // Fallback to sample data if fetch fails
            const samplePatients = [
                {
                    id: 1,
                    name: "John Smith",
                    age: 45,
                    contact: "+1 (555) 123-4567",
                    gender: "Male",
                    condition: "Hypertension",
                    lastVisit: "2025-10-10",
                    address: "123 Main St, New York, NY 10001",
                    email: "john.smith@example.com",
                    emergencyContact: "+1 (555) 987-6543"
                },
                {
                    id: 2,
                    name: "Sarah Johnson",
                    age: 32,
                    contact: "+1 (555) 234-5678",
                    gender: "Female",
                    condition: "Diabetes",
                    lastVisit: "2025-10-12",
                    address: "456 Oak Ave, Los Angeles, CA 90210",
                    email: "sarah.j@example.com",
                    emergencyContact: "+1 (555) 876-5432"
                }
            ];
            displayPatients(samplePatients);
        });
}

// Display patients in card layout
function displayPatients(patients) {
    const container = document.getElementById('patients-container');
    container.innerHTML = '';
    
    patients.forEach((patient, index) => {
        const card = document.createElement('div');
        card.className = 'patient-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="patient-card-header">
                <h3>${patient.name}</h3>
                <p>ID: ${patient.id}</p>
            </div>
            <div class="patient-card-body">
                <div class="patient-info">
                    <p><span>Age:</span> <span>${patient.age}</span></p>
                    <p><span>Contact:</span> <span>${patient.contact}</span></p>
                    <p><span>Condition:</span> <span>${patient.condition}</span></p>
                </div>
                <button class="view-details-btn" data-patient-id="${patient.id}">View Details</button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const patientId = parseInt(this.getAttribute('data-patient-id'));
            showPatientDetails(patientId, patients);
        });
    });
}

// Filter patients by name
function filterPatients(searchTerm) {
    fetch('patients-data.json')
        .then(response => response.json())
        .then(data => {
            const filteredPatients = data.patients.filter(patient => 
                patient.name.toLowerCase().includes(searchTerm)
            );
            displayPatients(filteredPatients);
        })
        .catch(error => {
            console.error('Error filtering patient data:', error);
        });
}

// Show patient details in modal
function showPatientDetails(patientId, patients) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    const modal = document.getElementById('patientModal');
    const detailsContainer = document.getElementById('patient-details');
    
    detailsContainer.innerHTML = `
        <div class="patient-detail-header">
            <h2>${patient.name}</h2>
            <p>Patient ID: ${patient.id}</p>
        </div>
        <div class="patient-detail-info">
            <div class="detail-item">
                <h4>Age</h4>
                <p>${patient.age}</p>
            </div>
            <div class="detail-item">
                <h4>Gender</h4>
                <p>${patient.gender}</p>
            </div>
            <div class="detail-item">
                <h4>Contact</h4>
                <p>${patient.contact}</p>
            </div>
            <div class="detail-item">
                <h4>Email</h4>
                <p>${patient.email}</p>
            </div>
            <div class="detail-item">
                <h4>Condition</h4>
                <p>${patient.condition}</p>
            </div>
            <div class="detail-item">
                <h4>Last Visit</h4>
                <p>${patient.lastVisit}</p>
            </div>
            <div class="detail-item">
                <h4>Address</h4>
                <p>${patient.address}</p>
            </div>
            <div class="detail-item">
                <h4>Emergency Contact</h4>
                <p>${patient.emergencyContact}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}