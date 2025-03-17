import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../../appStore/storeFeatures/themeSlice';
import { Sun, Moon, Menu, X, Shield, ChevronDown, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../appStore/storeFeatures/authSlice';
import { useNotification } from '../../utilities/NotificationProvider';

function Header() {
  const { showNotification } = useNotification();
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData?.name;
  const navigate = useNavigate();
  const userCredits = useSelector(state => state.auth.userCredits);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleServicesDropdown = (e) => {
    e.preventDefault();
    setIsServicesOpen(!isServicesOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '#', dropdown: true },
    { name: 'How It Works', path: '#' },
    // /#how-it-works
    { name: 'Pricing', path: '#' },
    // /#pricing
    { name: 'About Us', path: '#' },
    // /about
  ];

  const serviceLinks = [
    { name: 'Twitter Check', path: '#' },
    // /twitter-check
    { name: 'Message Check', path: '#' },
    // /message-check
    { name: 'Video Fact Check', path: '#' },
    // /video-fact-check
    { name: 'News Check', path: '#' },
    // /news-check
  ];

  const signOut = async () => {
     try {
       const response = await fetch(
         "http://localhost:5600/api/v1/user/signout",
         {
           method: "POST", // Assuming the sign-out is a POST request
           headers: {
             "Content-Type": "application/json",
           },
           credentials: "include", // Required for cookies in cross-origin requests
           body: JSON.stringify({}), // Empty body if no additional data is needed
         }
       );
 
       if (!response.ok) {
         throw new Error("Signout failed");
       }
 
       const result = await response.json();
       console.log("Signout successful", result);
       dispatch(logout());
       showNotification("success", "User logged Out successfully!");
       // setIsLoggedIn(isLoggedInFromStore);
       // setUserData(userDataFromStore);
     } catch (error) {
       console.error("Error during signout:", error);
       showNotification("error", jsonResponse.error);
     }
   };

  const authButtonHandler = async (buttonContent) => {
     // console.log(buttonContent);
     if (buttonContent === "Sign In") {
       console.log("User wants to sign in");
       navigate("/signin");
     } else if (buttonContent === "Sign Out") {
       console.log("User wants to sign out");
       await signOut();
       navigate("/");
       // console.log("isLoggedIn: ", isLoggedIn);
       // console.log("userData after dispatch(logout()): ", userData);
       // The console.log("isLoggedIn: ", isLoggedIn) and console.log("userData after dispatch(logout()): ", userData) inside the
       // authButtonHandler may still log the stale values of isLoggedIn and userData because
       // React state updates (Redux in this case) are asynchronous.
     }
   };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `${darkMode ? 'bg-gray-900/95 shadow-lg shadow-black/10' : 'bg-white/95 shadow-lg shadow-black/5'} backdrop-blur-sm` 
          : `${darkMode ? 'bg-transparent' : 'bg-transparent'}`
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-orange-500 mr-2" />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              TruthGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.dropdown ? (
                  <>
                    <button 
                      onClick={toggleServicesDropdown}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        location.pathname === link.path 
                          ? 'text-orange-500 font-medium' 
                          : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute left-0 mt-2 w-48 rounded-lg shadow-lg py-2 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
                        >
                          {serviceLinks.map((service, idx) => (
                            <Link
                              key={idx}
                              to={service.path}
                              onClick={closeMenu}
                              className={`block px-4 py-2 ${darkMode ? 'hover:bg-gray-700 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`px-4 py-2 rounded-lg ${
                      location.pathname === link.path 
                        ? 'text-orange-500 font-medium' 
                        : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(switchTheme())}
              className={`p-2 rounded-full mr-2 ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-orange-50 text-orange-500'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <div className=' flex items-center'>
                  <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}
                >
                  Dashboard
                </Link>
                 <img
                   src={userData?.avatarUrl}
                   className="w-10 rounded-full mx-3 my-2"
                   alt="User avatar"
                 />
                 <button onClick={() => navigate("/dashboard/xp-wallet")} className={`${
                     darkMode
                       ? "bg-gray-800/30 border-gray-700/40 text-white"
                       : "bg-gray-300 border-white/20 text-gray-900"
                   } cursor-pointer hover:scale-105 backdrop-blur-lg border rounded-xl shadow-lg p-1 flex`}>
                   <Coins size={32} color='#fff700'  />
                   {/* className={`${darkMode ? "" : " bg-yellow-700 rounded-full p-1"}`} */}
                   <p className=' ml-1 text-xl font-bold'>{userCredits}</p>
                 </button>
               </div>
              ) : (
                <>
                  {/* <Link
                    to="/signin"
                    className={`px-4 py-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}
                  >
                    Sign In
                  </Link> */}
                  {/* <Link
                    to="/signin"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                  >
                    Sign In
                  </Link> */}
                </>
              )}
              <button
               onClick={(e) => authButtonHandler(e.target.textContent)}
               className="bg-gradient-to-r from-orange-500 cursor-pointer to-orange-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
             >
               {isLoggedIn ? "Sign Out" : "Sign In"}
             </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-100'}`}
          >
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    {link.dropdown ? (
                      <>
                        <button 
                          onClick={toggleServicesDropdown}
                          className={`px-4 py-2 rounded-lg flex items-center justify-between w-full ${
                            location.pathname === link.path 
                              ? 'text-orange-500 font-medium' 
                              : `${darkMode ? 'text-gray-300' : 'text-gray-700'}`
                          }`}
                        >
                          {link.name}
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 mt-2 space-y-2"
                            >
                              {serviceLinks.map((service, idx) => (
                                <Link
                                  key={idx}
                                  to={service.path}
                                  onClick={closeMenu}
                                  className={`block px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={closeMenu}
                        className={`px-4 py-2 rounded-lg block ${
                          location.pathname === link.path 
                            ? 'text-orange-500 font-medium' 
                            : `${darkMode ? 'text-gray-300' : 'text-gray-700'}`
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-6 flex flex-col space-y-3">
                {userName ? (
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium text-center"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      onClick={closeMenu}
                      className={`px-4 py-3 rounded-lg font-medium text-center border ${
                        darkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
                      }`}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;