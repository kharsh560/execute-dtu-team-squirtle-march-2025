import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Zap, 
  Gift, 
  CreditCard, 
  Clock, 
  ChevronRight, 
  Award, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';

const XPWallet = () => {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const [activeTab, setActiveTab] = useState('overview');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  
  // Sample data for XP transactions
  const transactions = [
    { id: 1, type: 'earned', amount: 50, source: 'Fact Check Completion', date: 'Today, 2:30 PM' },
    { id: 2, type: 'earned', amount: 100, source: 'Daily Login Streak (7 days)', date: 'Today, 9:15 AM' },
    { id: 3, type: 'spent', amount: 200, source: 'Amazon Gift Card', date: 'Yesterday, 4:45 PM' },
    { id: 4, type: 'earned', amount: 75, source: 'Community Contribution', date: 'Yesterday, 11:20 AM' },
    { id: 5, type: 'earned', amount: 25, source: 'Shared Fact Check', date: '2 days ago' },
    { id: 6, type: 'spent', amount: 150, source: 'Premium Feature Unlock', date: '3 days ago' },
  ];
  
  // Sample data for rewards
  const availableRewards = [
    { id: 1, name: 'Amazon Gift Card', xpCost: 500, image: 'https://placehold.co/100x60?text=Amazon' },
    { id: 2, name: 'Netflix Subscription', xpCost: 800, image: 'https://placehold.co/100x60?text=Netflix' },
    { id: 3, name: 'Spotify Premium', xpCost: 600, image: 'https://placehold.co/100x60?text=Spotify' },
    { id: 4, name: 'TruthGuard Pro Upgrade', xpCost: 1000, image: 'https://placehold.co/100x60?text=TruthGuard' },
  ];
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>XP Wallet</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Manage your experience points and redeem rewards
        </p>
      </div>
      
      {/* XP Overview Card */}
      <div className={`rounded-2xl overflow-hidden shadow-lg mb-8 ${
        darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-white to-gray-50'
      }`}>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current Balance</p>
              <div className="flex items-center">
                <Zap size={28} className="text-orange-500 mr-2" />
                <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}> {userData?.credits} XP</h2>
              </div>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You're in the top 15% of fact checkers!
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
              <button className={`px-5 py-3 rounded-lg font-medium flex items-center justify-center ${
                darkMode 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}>
                <Gift size={18} className="mr-2" />
                Redeem Rewards
              </button>
              <button className={`px-5 py-3 rounded-lg font-medium flex items-center justify-center ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}>
                <TrendingUp size={18} className="mr-2" />
                Earn More XP
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Earned This Month</p>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                  <ArrowUpRight size={16} className="text-green-500" />
                </div>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>+450 XP</p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Spent This Month</p>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
                  <ArrowDownRight size={16} className="text-red-500" />
                </div>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>-350 XP</p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current Level</p>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <Award size={16} className="text-blue-500" />
                </div>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Level 12</p>
            </div>
          </div>
        </div>
        
        {/* Progress to next level */}
        <div className={`px-8 py-4 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Progress to Level 13
            </p>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              750/1000 XP
            </p>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'overview' 
              ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'transactions' 
              ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          Transactions
        </button>
        <button 
          onClick={() => setActiveTab('rewards')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'rewards' 
              ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          Rewards
        </button>
        <button 
          onClick={() => setActiveTab('earn')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'earn' 
              ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          Ways to Earn
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`col-span-2 rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Transactions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {transactions.slice(0, 4).map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-4 ${
                        transaction.type === 'earned' 
                          ? darkMode ? 'bg-green-900/30' : 'bg-green-100' 
                          : darkMode ? 'bg-red-900/30' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'earned' 
                          ? <ArrowUpRight size={16} className="text-green-500" /> 
                          : <ArrowDownRight size={16} className="text-red-500" />
                        }
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{transaction.source}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-medium ${
                      transaction.type === 'earned' 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} XP
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}
                >
                  View All Transactions
                </button>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Rewards</h3>
            </div>
            <div className="p-6">
            <div className="space-y-4">
                {availableRewards.slice(0, 3).map(reward => (
                  <div key={reward.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center">
                      <img src={reward.image} alt={reward.name} className="w-12 h-8 object-contain rounded mr-3" />
                      <div className="flex-1">
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{reward.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{reward.xpCost} XP</p>
                      </div>
                      <button className={`px-3 py-1 text-sm rounded-lg font-medium ${
                        darkMode 
                          ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}>
                        Redeem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setActiveTab('rewards')}
                  className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}
                >
                  View All Rewards
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'transactions' && (
        <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Transaction History</h3>
            <div className="flex items-center">
              <button className={`p-2 rounded-lg mr-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Filter size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              </button>
              <select className={`p-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 border-gray-600' 
                  : 'bg-white text-gray-700 border-gray-200'
              } border`}>
                <option>All Time</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map(transaction => (
                  <tr key={transaction.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${
                          transaction.type === 'earned' 
                            ? darkMode ? 'bg-green-900/30' : 'bg-green-100' 
                            : darkMode ? 'bg-red-900/30' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'earned' 
                            ? <ArrowUpRight size={16} className="text-green-500" /> 
                            : <ArrowDownRight size={16} className="text-red-500" />
                          }
                        </div>
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{transaction.source}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {transaction.type === 'earned' ? 'Earned' : 'Spent'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {transaction.date}
                      </div>
                    </td>
                    <td className={`px-6 py-4 font-medium ${
                      transaction.type === 'earned' 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} XP
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                      }`}>
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Showing <span className={darkMode ? 'text-white' : 'text-gray-900'}>6</span> of <span className={darkMode ? 'text-white' : 'text-gray-900'}>24</span> transactions
            </p>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-300' 
                  : 'bg-white border-gray-200 text-gray-600'
              }`}>
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className={`px-3 py-1 rounded-lg ${
                darkMode 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-orange-500 text-white'
              }`}>
                1
              </button>
              <button className={`px-3 py-1 rounded-lg ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                2
              </button>
              <button className={`p-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-300' 
                  : 'bg-white border-gray-200 text-gray-600'
              }`}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'rewards' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableRewards.map(reward => (
              <div key={reward.id} className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`h-40 flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <img src={reward.image} alt={reward.name} className="max-h-24 max-w-full" />
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{reward.name}</h3>
                  <div className="flex items-center mb-4">
                    <Zap size={16} className="text-orange-500 mr-1" />
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reward.xpCost} XP</span>
                  </div>
                  <button className={`w-full py-2 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}>
                    Redeem Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment Methods</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg mr-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <CreditCard size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>SabPaisa Payment Gateway</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Secure payments for Indian users</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                }`}>
                  Connected
                </span>
              </div>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We use SabPaisa as our payment gateway for secure transactions. Your payment information is never stored on our servers.
              </p>
              <button className={`px-4 py-2 rounded-lg font-medium ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                Manage Payment Methods
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'earn' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daily Activities</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <Shield size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Complete a Fact Check</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Verify information and earn XP</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Zap size={16} className="text-orange-500 mr-1" />
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>50 XP</span>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <Users size={16} className="text-green-500" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Invite a Friend</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Each successful referral</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Zap size={16} className="text-orange-500 mr-1" />
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>100 XP</span>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                        <Chrome size={16} className="text-purple-500" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Use GuardTruth Extension</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Verify 5 websites with our extension</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Zap size={16} className="text-orange-500 mr-1" />
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>75 XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Weekly Challenges</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                        <Award size={16} className="text-yellow-500" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fact Check Streak</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Complete 10 fact checks this week</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-1">
                        <Zap size={16} className="text-orange-500 mr-1" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>250 XP</span>
                      </div>
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>6/10 completed</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <Brain size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Analysis Master</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Use AI analysis tool 5 times</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-1">
                        <Zap size={16} className="text-orange-500 mr-1" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>150 XP</span>
                      </div>
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2/5 completed</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <Globe size={16} className="text-green-500" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>News Verification Pro</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Verify 3 news articles</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-1">
                        <Zap size={16} className="text-orange-500 mr-1" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>100 XP</span>
                      </div>
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>3/3 completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default XPWallet;