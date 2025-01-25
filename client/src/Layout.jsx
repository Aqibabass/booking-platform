import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';  
import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
  const location = useLocation();  

  
  const isIndexPage = location.pathname === '/index'; 

  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">

      {!isIndexPage && <Header />}
      
      <Outlet />
      
    </div>
  );
}

export default Layout;
