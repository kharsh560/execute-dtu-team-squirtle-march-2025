import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  Plus, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar,
  Clock,
  Globe,
  Twitter,
  MessageCircle,
  Youtube,
  FileText,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Link,
  Upload,
  Image,
  FileVideo,
  X,
} from 'lucide-react';
import axios from 'axios';

const FactChecks = () => {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [factChecks, setFactChecks] = useState([]);
  const [showNewCheckModal, setShowNewCheckModal] = useState(false);
  const [checkType, setCheckType] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  
  // Backend API URL
  const API_URL = 'http://localhost:5000';
  
  // Load initial fact checks
  useEffect(() => {
    // In a real app, you would fetch from the backend
    // For now, we'll use the sample data
    setFactChecks(sampleFactChecks);
  }, []);
  
  // Sample data for fact checks
  const sampleFactChecks = [
    {
      id: 1,
      title: "Climate Change Report 2023",
      source: "Environmental News Network",
      sourceType: "news",
      date: "2 days ago",
      status: "verified",
      credibility: 92,
      tags: ["climate", "science", "report"]
    },
    {
      id: 2,
      title: "COVID-19 Vaccine Side Effects Claim",
      source: "Health Ministry Press Release",
      sourceType: "government",
      date: "1 week ago",
      status: "verified",
      credibility: 95,
      tags: ["health", "vaccine", "covid"]
    },
    {
      id: 3,
      title: "Political Statement on Economic Policy",
      source: "Twitter",
      sourceType: "social",
      date: "3 days ago",
      status: "misleading",
      credibility: 34,
      tags: ["politics", "economy"]
    },
    {
      id: 4,
      title: "New Technology Breakthrough Claim",
      source: "Tech News Daily",
      sourceType: "news",
      date: "5 days ago",
      status: "partially true",
      credibility: 68,
      tags: ["technology", "innovation"]
    },
    {
      id: 5,
      title: "Historical Event Misrepresentation",
      source: "YouTube Video",
      sourceType: "video",
      date: "1 day ago",
      status: "misleading",
      credibility: 22,
      tags: ["history", "education"]
    }
  ];
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Filter tabs
  const tabs = [
    { id: 'all', label: 'All Checks' },
    { id: 'verified', label: 'Verified' },
    { id: 'misleading', label: 'Misleading' },
    { id: 'partially', label: 'Partially True' },
    { id: 'pending', label: 'Pending' }
  ];
  
  // Get source icon based on source type
  const getSourceIcon = (sourceType) => {
    switch(sourceType) {
      case 'news':
        return <Globe size={16} />;
      case 'social':
        return <Twitter size={16} />;
      case 'video':
        return <Youtube size={16} />;
      case 'government':
        return <FileText size={16} />;
      default:
        return <Globe size={16} />;
    }
  };
  
  // Get status badge based on status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'verified':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center`}>
            <CheckCircle size={12} className="mr-1" /> Verified
          </span>
        );
      case 'misleading':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center`}>
            <XCircle size={12} className="mr-1" /> Misleading
          </span>
        );
      case 'partially true':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center`}>
            <AlertTriangle size={12} className="mr-1" /> Partially True
          </span>
        );
      case 'pending':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center`}>
            <Clock size={12} className="mr-1" /> Pending
          </span>
        );
      default:
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center`}>
            <AlertTriangle size={12} className="mr-1" /> Unknown
          </span>
        );
    }
  };
  
  // Filter fact checks based on active tab
  const filteredFactChecks = factChecks.filter(check => {
    if (activeTab === 'all') return true;
    return check.status === activeTab;
  });
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFilePreview(null);
    }
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Call the backend API to analyze the text
    axios.post(`${API_URL}/analyze`, { query: searchQuery })
      .then(response => {
        const result = response.data;
        
        // Create a new fact check entry
        const newFactCheck = {
          id: Date.now(),
          title: result.title || searchQuery,
          source: "Text Analysis",
          sourceType: "news",
          date: "Just now",
          status: result.bool ? "verified" : (result.t_score > 0.4 ? "partially true" : "misleading"),
          credibility: Math.round(result.t_score * 100),
          tags: ["search", "text"],
          result: result
        };
        
        // Add to fact checks
        setFactChecks([newFactCheck, ...factChecks]);
        setCurrentResult(newFactCheck);
        setShowResultModal(true);
        setSearchQuery('');
      })
      .catch(error => {
        console.error("Error analyzing text:", error);
        alert("Failed to analyze text. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  // Submit new fact check
  const handleSubmitFactCheck = () => {
    setIsLoading(true);
    
    if (checkType === 'text') {
      // Text/URL fact check
      axios.post(`${API_URL}/analyze`, { query: textInput })
        .then(response => {
          const result = response.data;
          
          // Create a new fact check entry
          const newFactCheck = {
            id: Date.now(),
            title: result.title || textInput,
            source: textInput.includes('http') ? new URL(textInput).hostname : "Text Analysis",
            sourceType: textInput.includes('http') ? "news" : "text",
            date: "Just now",
            status: result.bool ? "verified" : (result.t_score > 0.4 ? "partially true" : "misleading"),
            credibility: Math.round(result.t_score * 100),
            tags: textInput.includes('http') ? ["url", "web"] : ["text", "claim"],
            result: result
          };
          
          // Add to fact checks
          setFactChecks([newFactCheck, ...factChecks]);
          setCurrentResult(newFactCheck);
          setShowNewCheckModal(false);
          setShowResultModal(true);
        })
        .catch(error => {
          console.error("Error analyzing text:", error);
          alert("Failed to analyze text. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (checkType === 'image' && selectedFile) {
      // Image fact check
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      axios.post(`${API_URL}/analyze-image`, formData)
        .then(response => {
          const result = response.data;
          
          // Create a new fact check entry
          const newFactCheck = {
            id: Date.now(),
            title: result.title || "Image Analysis",
            source: "Image Upload",
            sourceType: "image",
            date: "Just now",
            status: result.bool ? "verified" : (result.t_score > 0.4 ? "partially true" : "misleading"),
            credibility: Math.round(result.t_score * 100),
            tags: ["image", "visual"],
            result: result,
            imagePreview: selectedFilePreview
          };
          
          // Add to fact checks
          setFactChecks([newFactCheck, ...factChecks]);
          setCurrentResult(newFactCheck);
          setShowNewCheckModal(false);
          setShowResultModal(true);
        })
        .catch(error => {
          console.error("Error analyzing image:", error);
          alert("Failed to analyze image. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (checkType === 'video' && selectedFile) {
      // Video fact check
      const formData = new FormData();
      formData.append('video', selectedFile);
      
      axios.post(`${API_URL}/analyze-video`, formData)
        .then(response => {
          const result = response.data;
          
          // Create a new fact check entry
          const newFactCheck = {
            id: Date.now(),
            title: result.title || "Video Analysis",
            source: "Video Upload",
            sourceType: "video",
            date: "Just now",
            status: result.bool ? "verified" : (result.t_score > 0.4 ? "partially true" : "misleading"),
            credibility: Math.round(result.t_score * 100),
            tags: ["video", "multimedia"],
            result: result
          };
          
          // Add to fact checks
          setFactChecks([newFactCheck, ...factChecks]);
          setCurrentResult(newFactCheck);
          setShowNewCheckModal(false);
          setShowResultModal(true);
        })
        .catch(error => {
          console.error("Error analyzing video:", error);
          alert("Failed to analyze video. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  
  // View fact check details
  const handleViewFactCheck = (check) => {
    setCurrentResult(check);
    setShowResultModal(true);
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fact Checks</h1>
          <button 
            onClick={() => setShowNewCheckModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
          >
            <Plus size={18} className="mr-2" /> New Check
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <form onSubmit={handleSearch}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              </div>
              <input 
                type="text" 
                placeholder="Search for a claim, news, or paste a URL to fact-check..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </form>
          </div>
          <div className="flex items-center">
            <button className={`p-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-300                 hover:bg-gray-600' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
            </button>
            <select 
              className={`ml-2 pl-3 pr-8 py-2 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <option>All Sources</option>
              <option>News Articles</option>
              <option>Social Media</option>
              <option>Videos</option>
              <option>Government</option>
            </select>
            <select 
              className={`ml-2 pl-3 pr-8 py-2 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}`
                    : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Fact Checks List */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
        className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            <p className={`ml-3 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analyzing content...</p>
          </div>
        ) : filteredFactChecks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="px-6 py-4 text-left font-medium text-sm uppercase tracking-wider">Content</th>
                  <th className="px-6 py-4 text-left font-medium text-sm uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-left font-medium text-sm uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left font-medium text-sm uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left font-medium text-sm uppercase tracking-wider">Credibility</th>
                  <th className="px-6 py-4 text-left font-medium text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFactChecks.map((check) => (
                  <tr 
                    key={check.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${
                          check.status === 'verified' 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : check.status === 'misleading'
                              ? 'bg-red-100 dark:bg-red-900/30'
                              : 'bg-yellow-100 dark:bg-yellow-900/30'
                        }`}>
                          {check.status === 'verified' 
                            ? <CheckCircle size={16} className="text-green-500" /> 
                            : check.status === 'misleading'
                              ? <XCircle size={16} className="text-red-500" />
                              : <AlertTriangle size={16} className="text-yellow-500" />
                          }
                        </div>
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{check.title}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {check.tags && check.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className={`px-2 py-0.5 text-xs rounded-full ${
                                  darkMode 
                                    ? 'bg-gray-700 text-gray-300' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-1 rounded-full mr-2 ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          {getSourceIcon(check.sourceType)}
                        </div>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {check.source}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {check.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(check.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              check.credibility >= 80 
                                ? 'bg-green-500' 
                                : check.credibility >= 50 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`} 
                            style={{ width: `${check.credibility}%` }}
                          ></div>
                        </div>
                        <span className={`font-medium ${
                          check.credibility >= 80 
                            ? 'text-green-500' 
                            : check.credibility >= 50 
                              ? 'text-yellow-500' 
                              : 'text-red-500'
                        }`}>
                          {check.credibility}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleViewFactCheck(check)}
                          className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}
                        >
                          View
                        </button>
                        <button className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                          <MoreVertical size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className={`w-16 h-16 mx-auto rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
              <Search size={24} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No fact checks found</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={() => setShowNewCheckModal(true)}
              className={`px-4 py-2 rounded-lg font-medium ${
                darkMode 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              Create New Fact Check
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredFactChecks.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Showing <span className={darkMode ? 'text-white' : 'text-gray-900'}>5</span> of <span className={darkMode ? 'text-white' : 'text-gray-900'}>{filteredFactChecks.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className={`p-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                className={`px-3 py-1 rounded-lg ${
                  darkMode 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-orange-500 text-white'
                }`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className={`px-3 py-1 rounded-lg ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                className={`p-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* New Fact Check Modal */}
      {showNewCheckModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>New Fact Check</h2>
              <button 
                onClick={() => setShowNewCheckModal(false)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Check Type Selection */}
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  What would you like to fact-check?
                </label>
                <div className="grid grid-cols-3 gap-3">
                <button
                    onClick={() => setCheckType('text')}
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      checkType === 'text'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                        : darkMode 
                          ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FileText size={24} className="mb-2" />
                    <span>Text or URL</span>
                  </button>
                  <button
                    onClick={() => setCheckType('image')}
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      checkType === 'image'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                        : darkMode 
                          ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Image size={24} className="mb-2" />
                    <span>Image</span>
                  </button>
                  <button
                    onClick={() => setCheckType('video')}
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      checkType === 'video'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                        : darkMode 
                          ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FileVideo size={24} className="mb-2" />
                    <span>Video</span>
                  </button>
                </div>
              </div>
              
              {/* Text/URL Input */}
              {checkType === 'text' && (
                <div className="mb-6">
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Enter text, claim, or URL to fact-check
                  </label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {textInput.includes('http') ? (
                          <Link size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        ) : (
                          <FileText size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        )}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Paste a URL or enter a claim to fact-check..." 
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className={`pl-10 pr-4 py-3 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    For best results, enter a specific claim or a URL from a news source.
                  </p>
                </div>
              )}
              
              {/* Image Upload */}
              {checkType === 'image' && (
                <div className="mb-6">
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Upload an image to fact-check
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    darkMode 
                      ? 'border-gray-600 hover:border-gray-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    {selectedFilePreview ? (
                      <div>
                        <img 
                          src={selectedFilePreview} 
                          alt="Preview" 
                          className="max-h-64 mx-auto rounded-lg mb-4" 
                        />
                        <button 
                          onClick={() => {
                            setSelectedFile(null);
                            setSelectedFilePreview(null);
                          }}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={36} className={`mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <p className={`mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Click to upload or drag and drop
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          PNG, JPG or JPEG (max. 10MB)
                        </p>
                        <input 
                          type="file" 
                          accept="image/png, image/jpeg, image/jpg" 
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Video Upload */}
              {checkType === 'video' && (
                <div className="mb-6">
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Upload a video to fact-check
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    darkMode 
                      ? 'border-gray-600 hover:border-gray-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    {selectedFile ? (
                      <div>
                        <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <FileVideo size={36} className={`mx-auto mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {selectedFile.name}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedFile(null);
                          }}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          Remove Video
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={36} className={`mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <p className={`mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Click to upload or drag and drop
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          MP4, AVI, MOV (max. 100MB)
                        </p>
                        <input 
                          type="file" 
                          accept="video/mp4, video/avi, video/mov" 
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowNewCheckModal(false)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitFactCheck}
                  disabled={
                    isLoading || 
                    (checkType === 'text' && !textInput.trim()) || 
                    ((checkType === 'image' || checkType === 'video') && !selectedFile)
                  }
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                    (isLoading || 
                    (checkType === 'text' && !textInput.trim()) || 
                    ((checkType === 'image' || checkType === 'video') && !selectedFile))
                      ? (darkMode 
                          ? 'bg-gray-700 text-gray-500' 
                          : 'bg-gray-200 text-gray-400') + ' cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>Fact Check</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
        {/* Result Modal */}
        {showResultModal && currentResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fact Check Result</h2>
              <button 
                onClick={() => setShowResultModal(false)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Result Header */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${
                    currentResult.status === 'verified' 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : currentResult.status === 'misleading'
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}>
                    {currentResult.status === 'verified' 
                      ? <CheckCircle size={24} className="text-green-500" /> 
                      : currentResult.status === 'misleading'
                        ? <XCircle size={24} className="text-red-500" />
                        : <AlertTriangle size={24} className="text-yellow-500" />
                    }
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentResult.title}
                    </h3>
                    <div className="flex items-center">
                      <div className={`p-1 rounded-full mr-2 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {getSourceIcon(currentResult.sourceType)}
                      </div>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {currentResult.source}
                      </span>
                      <span className={`mx-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {currentResult.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Status and Credibility */}
                <div className={`p-4 rounded-lg mb-6 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                      {getStatusBadge(currentResult.status)}
                    </div>
                    <div>
                      <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Credibility Score</p>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              currentResult.credibility >= 80 
                                ? 'bg-green-500' 
                                : currentResult.credibility >= 50 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`} 
                            style={{ width: `${currentResult.credibility}%` }}
                          ></div>
                        </div>
                        <span className={`font-medium ${
                          currentResult.credibility >= 80 
                            ? 'text-green-500' 
                            : currentResult.credibility >= 50 
                              ? 'text-yellow-500' 
                              : 'text-red-500'
                        }`}>
                          {currentResult.credibility}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Result Content */}
                <div className="mb-6">
                  <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analysis</h4>
                  {currentResult.result && typeof currentResult.result === 'object' ? (
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {/* Display t_score if it exists */}
                      {currentResult.result.t_score !== undefined && (
                        <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Trust Score: {(currentResult.result.t_score * 100).toFixed(1)}%
                        </p>
                      )}
                      
                      {/* Display url if it exists */}
                      {currentResult.result.url && (
                        <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Source URL: <a 
                            href={currentResult.result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:underline"
                          >
                            {currentResult.result.url}
                          </a>
                        </p>
                      )}
                      
                      {/* Display any other properties that might be in the result object */}
                      {Object.entries(currentResult.result)
                        .filter(([key]) => !['t_score', 'url'].includes(key))
                        .map(([key, value]) => (
                          <p key={key} className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}: {
                              typeof value === 'object' 
                                ? JSON.stringify(value) 
                                : String(value)
                            }
                          </p>
                        ))
                      }
                    </div>
                  ) : (
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {typeof currentResult.result === 'string' 
                        ? currentResult.result 
                        : 'No detailed analysis available.'}
                    </p>
                  )}
                </div>
                
                {/* Image Preview (if available) */}
                {currentResult.imagePreview && (
                  <div className="mb-6">
                    <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Image</h4>
                    <img 
                      src={currentResult.imagePreview} 
                      alt="Analyzed content" 
                      className="max-h-64 rounded-lg" 
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowResultModal(false)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FactChecks;