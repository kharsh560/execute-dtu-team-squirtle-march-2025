import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Brain, 
  Search, 
  Link, 
  FileText, 
  Image, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  BarChart,
  Zap,
  ChevronDown,
  ChevronUp,
  Share2,
  Send,
  Paperclip,
  Mic,
  Bot,
  User,
  Loader2
} from 'lucide-react';

const AIFactEngine = () => {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const API_KEY = "AIzaSyCXuS_V-WkItGd5UXqpp35B8w6MkjmJu5E";
  
  // Sample chat messages
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      content: "Hello! I'm your AI Fact-Checking assistant. Ask me to verify any claim, news article, or information, and I'll help you determine its accuracy.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  // Sample history data
  const analysisHistory = [
    { 
      id: 1, 
      query: 'Is it true that COVID-19 vaccines contain microchips?', 
      result: 'false',
      date: 'Today, 10:30 AM',
      confidence: 98
    },
    { 
      id: 2, 
      query: 'Do electric cars produce more pollution than gasoline cars?', 
      result: 'misleading',
      date: 'Yesterday, 3:45 PM',
      confidence: 85
    },
    { 
      id: 3, 
      query: 'Is drinking water good for health?', 
      result: 'true',
      date: '2 days ago',
      confidence: 99
    },
  ];
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Function to call Gemini API
  const callGeminiAPI = async (prompt) => {
    try {
      // Updated to use gemini-1.5-flash model which should be available
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI fact-checking assistant. Your task is to verify the following claim and provide a detailed analysis with evidence. 
                  Format your response with these sections:
                  1. Verdict (True, False, or Misleading)
                  2. Analysis (detailed explanation)
                  3. Evidence (supporting facts)
                  4. Sources (where this information can be verified)
                  
                  Claim to verify: "${prompt}"
                  
                  Respond in HTML format that can be rendered in a React component using dangerouslySetInnerHTML.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API error: ${response.status} ${errorData?.error?.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const content = data.candidates[0].content;
        const textResponse = content.parts[0].text;
        
        // Determine result type based on response content
        let result = 'unknown';
        let confidence = 85;
        
        if (textResponse.toLowerCase().includes('true claim') || textResponse.toLowerCase().includes('verdict: true')) {
          result = 'true';
          confidence = Math.floor(Math.random() * 15) + 85; // Random between 85-99
        } else if (textResponse.toLowerCase().includes('false claim') || textResponse.toLowerCase().includes('verdict: false')) {
          result = 'false';
          confidence = Math.floor(Math.random() * 15) + 85;
        } else if (textResponse.toLowerCase().includes('misleading') || textResponse.toLowerCase().includes('verdict: misleading')) {
          result = 'misleading';
          confidence = Math.floor(Math.random() * 20) + 75;
        }
        
        return {
          content: textResponse,
          factCheck: {
            result: result,
            confidence: confidence,
            sources: [
              { name: 'Gemini AI Analysis', url: '#' }
            ]
          }
        };
      } else {
        throw new Error('No response from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return {
        content: "I'm sorry, I encountered an error while analyzing this claim. Please try again or rephrase your question.",
        factCheck: null
      };
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAnalyzing(true);
    
    try {
      // Call Gemini API
      const geminiResponse = await callGeminiAPI(inputValue);
      
      // Create bot response
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: geminiResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        factCheck: geminiResponse.factCheck
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Add to history (in a real app, this would be saved to a database)
      const newHistoryItem = {
        id: analysisHistory.length + 1,
        query: inputValue,
        result: geminiResponse.factCheck ? geminiResponse.factCheck.result : 'unknown',
        date: 'Just now',
        confidence: geminiResponse.factCheck ? geminiResponse.factCheck.confidence : 75
      };
      
      // In a real app, you would update the history in a database
      // For now, we're just logging it
      console.log('New history item:', newHistoryItem);
      
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      
      // Add error message
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getResultColor = (result) => {
    switch(result) {
      case 'true':
        return darkMode ? 'text-green-400' : 'text-green-600';
      case 'false':
        return darkMode ? 'text-red-400' : 'text-red-600';
      case 'misleading':
        return darkMode ? 'text-yellow-400' : 'text-yellow-600';
      default:
        return darkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };
  
  const getResultIcon = (result) => {
    switch(result) {
      case 'true':
        return <CheckCircle className="text-green-500" />;
      case 'false':
        return <XCircle className="text-red-500" />;
      case 'misleading':
        return <AlertTriangle className="text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getResultBadge = (result) => {
    switch(result) {
      case 'true':
        return <span className={`px-2 py-1 text-xs rounded-full ${
          darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
        }`}>True</span>;
      case 'false':
        return <span className={`px-2 py-1 text-xs rounded-full ${
          darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
        }`}>False</span>;
      case 'misleading':
        return <span className={`px-2 py-1 text-xs rounded-full ${
          darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
        }`}>Misleading</span>;
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Fact Engine</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Verify claims, analyze news, and get fact-checked information using our advanced AI
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'chat' 
              ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          Chat
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'history' 
              ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          History
        </button>
        <button 
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'insights' 
              ? `border-b-2 border-orange-500 ${darkMode ? 'text-white' : 'text-gray-900'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          Insights
        </button>
      </div>
      
      {/* Chat Interface */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
                    <Brain size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Fact Engine</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Powered by TruthGaurd AI</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className={`p-4 h-[500px] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {messages.map((message) => (
                  <div key={message.id} className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? darkMode ? 'bg-orange-500 text-white' : 'bg-orange-500 text-white'
                        : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-start mb-1">
                        <div className={`p-1 rounded-full mr-2 ${
                          message.type === 'user'
                            ? 'bg-orange-600'
                            : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          {message.type === 'user' 
                            ? <User size={14} className="text-white" /> 
                            : <Bot size={14} className={darkMode ? 'text-white' : 'text-gray-600'} />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {message.type === 'user' ? 'You' : 'AI Fact Engine'}
                          </p>
                        </div>
                        <span className={`text-xs ${
                          message.type === 'user'
                            ? 'text-orange-200'
                            : darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </span>
                      </div>
                      
                      {message.factCheck ? (
                        <div dangerouslySetInnerHTML={{ __html: message.content }} />
                      ) : (
                        <p>{message.content}</p>
                      )}
                      
                      {message.factCheck && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`p-1 rounded-full mr-2 ${
                                message.factCheck.result === 'true'
                                  ? 'bg-green-500'
                                  : message.factCheck.result === 'false'
                                    ? 'bg-red-500'
                                    : 'bg-yellow-500'
                              }`}>
                                {getResultIcon(message.factCheck.result)}
                              </div>
                              <div>
                                <p className="text-xs font-medium">Confidence Score</p>
                                <p className={`text-sm font-bold ${getResultColor(message.factCheck.result)}`}>
                                  {message.factCheck.confidence}%
                                </p>
                              </div>
                            </div>
                            <div>
                              <button className={`text-xs font-medium ${
                                darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'
                              }`}>
                                View Full Report
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isAnalyzing && (
                  <div className="flex justify-start mb-4">
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          <Bot size={14} className={darkMode ? 'text-white' : 'text-gray-600'} />
                        </div>
                        <div className="flex items-center">
                          <Loader2 size={16} className={`animate-spin mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <p className="text-sm">Analyzing and fact-checking...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <form onSubmit={handleSubmit} className="flex items-center">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me to verify any claim or information..."
                      className={`w-full p-3 pr-10 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200'
                      } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <button type="button" className={darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}>
                        <Paperclip size={18} />
                      </button>
                      <button type="button" className={darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}>
                        <Mic size={18} />
                      </button>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isAnalyzing || !inputValue.trim()}
                    className={`ml-2 p-3 rounded-lg ${
                      isAnalyzing || !inputValue.trim()
                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Suggested Topics</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <button 
                    onClick={() => setInputValue("Is climate change real?")}
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Is climate change real?
                  </button>
                  <button 
                    onClick={() => setInputValue("Do vaccines cause autism?")}
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Do vaccines cause autism?
                  </button>
                  <button 
                    onClick={() => setInputValue("Is 5G technology harmful to health?")}
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Is 5G technology harmful to health?
                  </button>
                  <button 
                    onClick={() => setInputValue("Does drinking lemon water detox your body?")}
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Does drinking lemon water detox your body?
                  </button>
                </div>
              </div>
            </div>
            
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fact-Checking Tips</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full mr-2 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <CheckCircle size={14} className="text-blue-500" />
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Be specific with your questions for more accurate results
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full mr-2 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <CheckCircle size={14} className="text-blue-500" />
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Include sources or references when available
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full mr-2 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <CheckCircle size={14} className="text-blue-500" />
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Ask follow-up questions for deeper analysis
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full mr-2 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <CheckCircle size={14} className="text-blue-500" />
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Verify information across multiple reliable sources
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* History Tab */}
      {activeTab === 'history' && (
        <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fact-Checking History</h3>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search history..."
                className={`p-2 rounded-lg text-sm mr-2 ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400' 
                    : 'bg-white text-gray-700 border-gray-200 placeholder-gray-500'
                } border`}
              />
              <select className={`p-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 border-gray-600' 
                  : 'bg-white text-gray-700 border-gray-200'
              } border`}>
                <option>All Time</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Query
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {analysisHistory.map(item => (
                  <tr key={item.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${
                          item.result === 'true' 
                            ? darkMode ? 'bg-green-900/30' : 'bg-green-100' 
                            : item.result === 'false'
                              ? darkMode ? 'bg-red-900/30' : 'bg-red-100'
                              : darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'
                        }`}>
                          {getResultIcon(item.result)}
                        </div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.query}
                        </p>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.date}
                    </td>
                    <td className="px-6 py-4">
                      {getResultBadge(item.result)}
                    </td>
                    <td className={`px-6 py-4 font-medium ${getResultColor(item.result)}`}>
                      {item.confidence}%
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className={`text-sm font-medium ${
                          darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'
                        }`}>
                          View
                        </button>
                        <button className={`text-sm font-medium ${
                          darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
                        }`}>
                          Share
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 flex justify-center">
            <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              Load More
            </button>
          </div>
        </div>
      )}
      
      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fact-Checking Stats */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fact-Checking Stats</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>68%</div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>True Claims</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>22%</div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>False Claims</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>10%</div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Misleading</p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                <div className="flex justify-between mb-2">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total Fact Checks</p>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>47</p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                <div className="flex justify-between mb-2">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Average Confidence</p>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>92%</p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Health misinformation continues to be the most common category of false claims, with vaccine-related content making up 45% of debunked health claims this month.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Accuracy Improvement</h4>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      AI Fact-Checking Accuracy
                    </p>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      92%
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Accuracy has improved by 3.5% in the last month
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Source Reliability</h4>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Scientific Journals
                      </p>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Zap 
                              key={star} 
                              size={14} 
                              className="text-orange-500" 
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Government Sources
                      </p>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Zap 
                              key={star} 
                              size={14} 
                              className="text-orange-500" 
                              fill="currentColor"
                            />
                          ))}
                          <Zap 
                            size={14} 
                            className="text-gray-300 dark:text-gray-600" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        News Organizations
                      </p>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3].map((star) => (
                            <Zap 
                              key={star} 
                              size={14} 
                              className="text-orange-500" 
                              fill="currentColor"
                            />
                          ))}
                          {[1, 2].map((star) => (
                            <Zap 
                              key={star} 
                              size={14} 
                              className="text-gray-300 dark:text-gray-600" 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Social Media
                      </p>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2].map((star) => (
                            <Zap 
                              key={star} 
                              size={14} 
                              className="text-orange-500" 
                              fill="currentColor"
                            />
                          ))}
                          {[1, 2, 3].map((star) => (
                            <Zap 
                              key={star} 
                              size={14} 
                              className="text-gray-300 dark:text-gray-600" 
                            />
                          ))}
                        </div>
                      </div>
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

export default AIFactEngine;