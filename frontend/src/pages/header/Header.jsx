import React from 'react';
import { ShieldCheck, Sun, Moon, Coins } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from '../../appStore/storeFeatures/themeSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../appStore/storeFeatures/authSlice';
import { useNotification } from '../../utils/NotificationProvider';

function Header() {
  const { showNotification } = useNotification();
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleTheme = () => {
    dispatch(switchTheme());
    console.log(darkMode);
  }
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

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
    <header className={`fixed w-full backdrop-blur-sm z-50 shadow-sm ${darkMode ? 'bg-gray-900/95 text-white' : 'bg-white/80 text-black'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">TruthGuard</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => toggleTheme()}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition-colors`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {/* <NavLink to='signin' className={({isActive}) => `px-4 text-white py-2 rounded-xl active:scale-90 cursor-pointer ${isActive ? "bg-blue-700" : "bg-blue-500"}`} > Login </NavLink> */}
          <button
              onClick={(e) => authButtonHandler(e.target.textContent)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </button>
            {isLoggedIn && (
              <div className=' flex items-center'>
                <img
                  src={userData?.avatarUrl}
                  className="w-10 rounded-full mx-3 my-2"
                  alt="User avatar"
                />
                <div className={`${
                    darkMode
                      ? "bg-gray-800/30 border-gray-700/40 text-white"
                      : "bg-gray-300 border-white/20 text-gray-900"
                  } backdrop-blur-lg border rounded-xl shadow-lg p-1 flex`}>
                  <Coins size={36} color='#fff700'  />
                  {/* className={`${darkMode ? "" : " bg-yellow-700 rounded-full p-1"}`} */}
                  <p className=' ml-1 text-2xl font-bold'>{userData?.credits}</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}

export default Header;