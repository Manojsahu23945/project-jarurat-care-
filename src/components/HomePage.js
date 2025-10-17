import React from 'react';

const HomePage = () => {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h2>Welcome to Jarurat Care</h2>
          <p>Your comprehensive patient records management system</p>
        </div>
      </section>
      
      <section className="dashboard-overview">
        <div className="container">
          <h3>Dashboard Overview</h3>
          <div className="stats">
            <div className="stat-card">
              <h4>Total Patients</h4>
              <p className="stat-number">124</p>
            </div>
            <div className="stat-card">
              <h4>New Today</h4>
              <p className="stat-number">5</p>
            </div>
            <div className="stat-card">
              <h4>Active Cases</h4>
              <p className="stat-number">28</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;