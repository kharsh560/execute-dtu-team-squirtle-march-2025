import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';
import { useSelector } from 'react-redux';

function Layout() {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <Header />
        <div className={`pt-22 flex-grow  ${darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-black'}`} >
          <Outlet />
        </div>
        <Footer />
    </div>
  );
}

export default Layout;

// className={`fixed inset-0 z-0 ${darkMode ? 'bg-gray-900' : ''}`}
//     style={{
//       // backgroundImage: "url('https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       opacity: darkMode ? '0.1' : '0.15',
//     }}
//   />