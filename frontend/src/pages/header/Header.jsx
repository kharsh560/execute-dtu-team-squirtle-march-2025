import React from 'react';
import { ShieldCheck, Sun, Moon } from 'lucide-react';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className={`fixed w-full backdrop-blur-sm z-50 shadow-sm ${darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">TruthGuard</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition-colors`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className={`px-4 py-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
            Login
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;