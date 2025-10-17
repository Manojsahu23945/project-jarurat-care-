import React from 'react';

const AboutPage = () => {
  return (
    <main>
      <section className="about-header">
        <div className="container">
          <h2>About Jarurat Care</h2>
          <p>Learn more about our patient care management system</p>
        </div>
      </section>
      
      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h3>Our Mission</h3>
            <p>Jarurat Care is dedicated to providing healthcare professionals with an intuitive and efficient platform for managing patient records. Our system streamlines the process of storing, accessing, and updating patient information, allowing medical staff to focus more time on patient care.</p>
          </div>
          
          <div className="about-section">
            <h3>Key Features</h3>
            <ul>
              <li>Secure patient data storage</li>
              <li>Easy search and filtering capabilities</li>
              <li>Comprehensive patient history tracking</li>
              <li>User-friendly interface</li>
              <li>Multi-user access with role-based permissions</li>
              <li>Real-time data synchronization</li>
            </ul>
          </div>
          
          <div className="about-section">
            <h3>Contact Us</h3>
            <p>If you have any questions or need support, please reach out to our team:</p>
            <p>Email: support@jaruratcare.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;