import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar'; 

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login'; 

  return (
    <div>
      {showNavbar && <Navbar />}
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
