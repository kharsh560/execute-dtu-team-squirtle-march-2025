import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './appStore/storeFeatures/authSlice';

function Layout() {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkSession = async () => {
      if (!isLoggedIn) {
        try {
          
          const response = await fetch(
            "http://localhost:5600/api/v1/user/checkSession",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Required for cookies in cross-origin requests
            }
          );
          console.log("Checking for session!");
          // const jsonResponse2 = await response.json();
          // console.log(jsonResponse2);
          if (response.ok) {
            const jsonResponse = await response.json();
            dispatch(login(jsonResponse.user)); // Populate Redux store
          }
        } catch (error) {
          console.log("Failed to rehydrate session:", error);
        }
      }
    };
    checkSession();
  }, [isLoggedIn, dispatch]);

  return (
    <div className={`flex flex-col ${darkMode ? 'bg-gray-900/80' : 'bg-white'}  min-h-screen transition-colors duration-300`}>
        <Header />
        <div className=' h-[72px]'>
          {/* width taking up some space */}
        </div>
        <div className={`flex-grow p-8  ${darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-black'}`} >
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