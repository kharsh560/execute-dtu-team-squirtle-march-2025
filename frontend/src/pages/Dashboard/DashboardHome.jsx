import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  BookOpen,
  Award,
  Globe,
  Twitter,
  MessageCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FileText,
  Shield
} from 'lucide-react';

const DashboardHome = () => {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const userData = useSelector((state) => state.auth.userData);
  
  // Sample data for stats
  const stats = [
    {
      title: "Learning Hours",
      value: "2,847",
      icon: <Clock size={20} className="text-blue-500" />,
      change: "+5.2%",
      positive: true
    },
    {
      title: "Assessments Taken",
      value: "1,238",
      icon: <FileText size={20} className="text-purple-500" />,
      change: "+8.2%",
      positive: true
    },
    {
      title: "Modules Completed",
      value: "456",
      icon: <CheckCircle size={20} className="text-green-500" />,
      change: "+5.7%",
      positive: true
    },
    {
      title: "Certifications Earned",
      value: "324",
      icon: <Shield size={20} className="text-orange-500" />,
      change: "+13%",
      positive: true
    }
  ];

  // Sample data for recent activity
  const recentActivity = [
    {
      title: "Completed AI Ethics Module",
      time: "2 hours ago",
      type: "learning"
    },
    {
      title: "Verified Climate Change Report",
      time: "4 hours ago",
      type: "verification"
    },
    {
      title: "Submitted Analysis on COVID-19 Article",
      time: "Yesterday",
      type: "analysis"
    },
    {
      title: "Earned Fact-Checking Certificate",
      time: "2 days ago",
      type: "achievement"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {userData?.name}!</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Here's what's happening with your fact-checking activities.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
              New Fact Check
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-l-4 ${
              index === 0 ? 'border-blue-500' : 
              index === 1 ? 'border-purple-500' : 
              index === 2 ? 'border-green-500' : 
              'border-orange-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${
                index === 0 ? 'bg-blue-100 dark:bg-blue-900/30' : 
                index === 1 ? 'bg-purple-100 dark:bg-purple-900/30' : 
                index === 2 ? 'bg-green-100 dark:bg-green-900/30' : 
                'bg-orange-100 dark:bg-orange-900/30'
              }`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.positive ? (
                <ArrowUpRight size={16} className="text-green-500 mr-1" />
              ) : (
                <ArrowDownRight size={16} className="text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>since last week</span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Recent Activity */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
          className={`lg:col-span-1 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <button className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}>
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${
                    activity.type === 'learning' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                    activity.type === 'verification' ? 'bg-green-100 dark:bg-green-900/30' : 
                    activity.type === 'analysis' ? 'bg-purple-100 dark:bg-purple-900/30' : 
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    {activity.type === 'learning' ? <BookOpen size={18} className="text-blue-500" /> : 
                     activity.type === 'verification' ? <CheckCircle size={18} className="text-green-500" /> : 
                     activity.type === 'analysis' ? <FileText size={18} className="text-purple-500" /> : 
                     <Award size={18} className="text-orange-500" />}
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.title}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button className={`w-full py-2 rounded-lg border ${
              darkMode 
                ? 'border-gray-700 hover:bg-gray-700 text-gray-300' 
                : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              } transition-colors text-sm font-medium`}
            >
              Load More
            </button>
          </div>
        </motion.div>
        
        {/* Middle and Right Columns */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 grid grid-cols-1 gap-6"
        >
          {/* Progress Chart */}
          <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Fact-Checking Progress</h2>
              <div className="flex space-x-2">
                <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  darkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-orange-100 text-orange-600'
                }`}>
                  Weekly
                </button>
                <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-400' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  Monthly
                </button>
                <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-400' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  Yearly
                </button>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className={`w-full h-64 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
              <div className="text-center">
                <BarChart3 size={48} className={`mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Chart visualization would appear here
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Verified</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-500'}`}>78%</p>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Misleading</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-red-400' : 'text-red-500'}`}>15%</p>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Inconclusive</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>7%</p>
              </div>
            </div>
          </div>
          
          {/* Recent Fact Checks */}
          <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Fact Checks</h2>
              <button className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}>
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`pb-3 text-left font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Content</th>
                    <th className={`pb-3 text-left font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Source</th>
                    <th className={`pb-3 text-left font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                    <th className={`pb-3 text-left font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</th>
                    <th className={`pb-3 text-left font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-4 pr-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                          <Globe size={16} className="text-blue-500" />
                        </div>
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Climate Change Report</span>
                      </div>
                    </td>
                    <td className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>News Article</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`}>
                        Verified
                      </span>
                    </td>
                    <td className={`py-4 font-medium text-green-500`}>92%</td>
                    <td className="py-4">
                      <button className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}>
                        View
                      </button>
                    </td>
                  </tr>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-4 pr-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                          <Twitter size={16} className="text-purple-500" />
                        </div>
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Political Statement</span>
                      </div>
                    </td>
                    <td className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Social Media</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`}>
                        Misleading
                      </span>
                    </td>
                    <td className={`py-4 font-medium text-red-500`}>34%</td>
                    <td className="py-4">
                      <button className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}>
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                          <MessageCircle size={16} className="text-yellow-500" />
                        </div>
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Health Claim</span>
                      </div>
                    </td>
                    <td className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>WhatsApp</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`}>
                        Partially True
                      </span>
                    </td>
                    <td className={`py-4 font-medium text-yellow-500`}>68%</td>
                    <td className="py-4">
                      <button className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}>
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Webinars */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.5 }}
          className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upcoming Webinars</h2>
            <button className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}>
              View All
            </button>
          </div>
          
          <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} mb-4`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Advanced Fact-Checking Techniques</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Learn how to verify complex claims and detect sophisticated misinformation</p>
                <div className="flex items-center">
                  <Calendar size={14} className={`mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tomorrow, 2:00 PM</span>
                </div>
              </div>
              <button className={`px-3 py-1 text-xs font-medium rounded-lg ${
                darkMode 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}>
                Register
              </button>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} mb-4`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Detecting AI-Generated Content</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Tools and techniques to identify content created by AI</p>
                <div className="flex items-center">
                  <Calendar size={14} className={`mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Friday, 11:00 AM</span>
                </div>
              </div>
              <button className={`px-3 py-1 text-xs font-medium rounded-lg ${
                darkMode 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}>
                Register
              </button>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Social Media Verification Workshop</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Hands-on workshop for verifying viral social media content</p>
                <div className="flex items-center">
                  <Calendar size={14} className={`mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Next Monday, 3:30 PM</span>
                </div>
              </div>
              <button className={`px-3 py-1 text-xs font-medium rounded-lg ${
                darkMode 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}>
                Register
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Learning Progress */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.6 }}
          className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Learning Progress</h2>
            <button className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}>
              View All Courses
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fact-Checking Fundamentals</h3>
                <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-500'}`}>85% Complete</span>
              </div>
              <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Digital Media Literacy</h3>
                <span className={`text-sm font-medium ${darkMode ? 'text-orange-400' : 'text-orange-500'}`}>62% Complete</span>
              </div>
              <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400" style={{ width: '62%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Advanced AI Ethics</h3>
                <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>35% Complete</span>
              </div>
              <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Next Recommended Course</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Visual Content Verification</p>
                </div>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  darkMode 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}>
                  Start Course
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;