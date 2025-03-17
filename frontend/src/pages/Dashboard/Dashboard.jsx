import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  ChevronRight,
  Shield,
  Brain,
  MessageCircle,
  Globe,
  BookOpen,
  Zap,
  Gift,
  CreditCard,
  Chrome,
  Bot,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard"
    },
    {
      title: "Fact Checks",
      icon: <Shield size={20} />,
      path: "/dashboard/fact-checks"
    },
    {
      title: "AI Fact Engine",
      // Add this to your menuItems array in the Dashboard component
      
        icon: <Brain size={20} />,
        label: 'AI Fact Engine',
        path: '/dashboard/ai-fact-engine',
        description: 'Verify claims with AI-powered fact checking'
      },
    
    {
      title: "AI Fact Hub",
      icon: <Bot size={20} />,
      path: "/dashboard/ai-fact-hub"
    },
    {
      title: "GuardTruth Extension",
      icon: <Chrome size={20} />,
      path: "/dashboard/guard-truth-extension"
    },
    {
      title: "XP Wallet",
      icon: <Zap size={20} />,
      path: "/dashboard/xp-wallet"
    },
    {
      title: "Rewards Shop",
      icon: <Gift size={20} />,
      path: "/dashboard/rewards-shop"
    },
  ];

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <motion.div 
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} h-full shadow-lg flex flex-col z-20`}
        initial={{ width: collapsed ? 80 : 260 }}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo */}
        <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {!collapsed && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold mr-2">
                TG
              </div>
              <span className="text-xl font-bold">TruthGuard</span>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
              TG
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} ${collapsed ? 'hidden' : 'block'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center p-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? `bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20` 
                        : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span className="ml-3 font-medium">{item.title}</span>}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Profile */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`flex ${collapsed ? 'justify-center' : 'items-center'}`}>
            {!collapsed && (
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="font-medium">Ashish K Choudhary</p>
                  <div className="ml-2 flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-0.5 rounded-full">
                    <Zap size={12} className="mr-1" />
                    <span>1,250 XP</span>
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pro Member</p>
              </div>
            )}
            <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <LogOut size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;