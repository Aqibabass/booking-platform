import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';  
import Header from './components/Header';

function Layout() {
  const location = useLocation();  

  
  const isIndexPage = location.pathname === '/'; 

  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">

      {!isIndexPage && <Header />}
      
      <Outlet />
    </div>
  );
}

export default Layout;
