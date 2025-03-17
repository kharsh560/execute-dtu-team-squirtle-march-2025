import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Shield, Twitter, Facebook, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';

function Footer() {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  
  const footerLinks = {
    product: [
      { name: 'Features', path: '/features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'API', path: '/api' },
      { name: 'Integrations', path: '/integrations' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    resources: [
      { name: 'Documentation', path: '/docs' },
      { name: 'Help Center', path: '/help' },
      { name: 'Community', path: '/community' },
      { name: 'Contact Us', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'GDPR', path: '/gdpr' },
    ],
  };

  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-orange-500 mr-2" />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                TruthGuard
              </span>
            </Link>
            <p className="mb-6">
              Fighting misinformation with AI-powered fact-checking technology. 
              Our mission is to create a more informed world where truth prevails.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Stay Updated
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`px-4 py-2 w-full rounded-l-lg focus:outline-none ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border`}
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-lg flex items-center">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-orange-500 hover:text-orange-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-600">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={index}>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="hover:text-orange-500 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} TruthGuard. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">
              Made with ❤️ for a more informed world
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;