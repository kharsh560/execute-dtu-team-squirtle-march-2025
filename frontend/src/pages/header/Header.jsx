import React from 'react';
import { ShieldCheck, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from '../../appStore/storeFeatures/themeSlice';
import { NavLink } from 'react-router-dom';

function Header() {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const dispatch = useDispatch();
  const toggleTheme = () => {
    dispatch(switchTheme());
    console.log(darkMode);
  }
  
  return (
    <header className={`fixed w-full backdrop-blur-sm z-50 shadow-sm ${darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80'}`}>
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
          <NavLink to='/user' className={({isActive}) => `px-4 text-white py-2 rounded-xl active:scale-90 cursor-pointer ${isActive ? "bg-blue-700" : "bg-blue-500"}`} > Login </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;