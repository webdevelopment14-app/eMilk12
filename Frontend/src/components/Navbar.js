import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close the sidebar when navigating to a new route
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Conditionally render the navbar based on the current route
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="golo.png" alt="Logo" className="navbar-image" />
        <NavLink to="/landing-page" className="navbar-logo">
          Milk Delivery System
        </NavLink>
      </div>

      <div className={`hamburger-menu ${isSidebarOpen ? 'hidden' : ''}`} onClick={toggleSidebar}>
        <FaBars />
      </div>

      <ul className={`navbar-menu ${isSidebarOpen ? 'hidden' : ''}`}>
        <li><NavLink to="/deliveries" className="navbar-link">Deliveries</NavLink></li>
        <li><NavLink to="/add-delivery" className="navbar-link">Add New Delivery</NavLink></li>
        <li><NavLink to="/bill-summary" className="navbar-link">Bill Summary</NavLink></li>
      </ul>

      <div className={`search-container ${isSidebarOpen ? 'hidden' : ''}`}>
        <input 
          type="text" 
          placeholder="Search by date" 
          className="search-input" 
          value={searchTerm}
          onChange={handleSearchChange} 
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <NavLink to="/deliveries" className="sidebar-link">Deliveries</NavLink>
        <NavLink to="/add-delivery" className="sidebar-link">Add New Delivery</NavLink>
        <NavLink to="/bill-summary" className="sidebar-link">Bill Summary</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
