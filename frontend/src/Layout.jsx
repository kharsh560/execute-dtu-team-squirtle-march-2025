import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';

function Layout({ darkMode, setDarkMode }) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
  {/* Background Image */}
  <div 
    className={`fixed inset-0 z-0 ${darkMode ? 'bg-gray-900' : ''}`}
        style={{
          // backgroundImage: "url('https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: darkMode ? '0.1' : '0.15',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
