import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import PatientsPage from './components/PatientsPage';
import AboutPage from './components/AboutPage';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="container">
            <h1 className="logo">Jarurat Care</h1>
            <div className="menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className={isMenuOpen ? "nav-open" : ""}>
              <ul className="nav-links">
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/patients" onClick={closeMenu}>Patients</NavLink></li>
                <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <footer>
          <div className="container">
            <p>&copy; 2025 Jarurat Care. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;