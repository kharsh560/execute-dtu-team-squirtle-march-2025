import React from 'react';
import { Github, Twitter, Mail, ShieldCheck } from 'lucide-react';
import { useSelector } from 'react-redux';

function Footer() {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  return (
    <footer className={` py-12  ${darkMode ? 'bg-gray-900/95 text-white' : 'bg-white/80 border-t-2 border-b-black text-black'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <ShieldCheck className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">TruthGuard</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>© 2025 TruthGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;