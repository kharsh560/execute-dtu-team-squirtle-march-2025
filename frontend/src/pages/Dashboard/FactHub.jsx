import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ChevronDown,
  MoreHorizontal,
  ExternalLink,
  Share2,
  Bookmark,
  Flag,
  ThumbsUp,
  MessageSquare,
  Youtube,
  Newspaper,
  TrendingUp,
  Clock,
  RefreshCw,
  Loader
} from 'lucide-react';

const FactHub = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const [activeSection, setActiveSection] = useState('news');
  const [activeNewsTab, setActiveNewsTab] = useState('trending');
  const [activeVideoTab, setActiveVideoTab] = useState('shorts');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newsPage, setNewsPage] = useState(1);
  const [videoPage, setVideoPage] = useState(null);
  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showFactCheck, setShowFactCheck] = useState(null);
  const [factCheckResult, setFactCheckResult] = useState(null);
  const [isFactChecking, setIsFactChecking] = useState(false);
  const newsObserver = useRef(null);
  const videoObserver = useRef(null);
  const newsEndRef = useRef(null);
  const videoEndRef = useRef(null);

  const YOUTUBE_API_KEY = 'AIzaSyBE0SIN-Vm73ntz-_i36EvAo0AmDVTNno8';
  const NEWS_API_KEY = 'ef76b84c1def468caada6b2da3c0e10b';

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'politics', label: 'Politics' },
    { id: 'technology', label: 'Technology' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' },
    { id: 'business', label: 'Business' },
    { id: 'entertainment', label: 'Entertainment' },
  ];

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'Hindi' },
    { id: 'es', label: 'Spanish' },
    { id: 'fr', label: 'French' },
  ];

  useEffect(() => {
    if (activeSection === 'news') {
      fetchNews();
    } else {
      fetchVideos();
    }
  }, [activeSection, activeNewsTab, activeVideoTab, selectedCategory, selectedLanguage]);

  useEffect(() => {
    // Set up intersection observer for infinite scrolling
    const newsOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    newsObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingNews) {
        loadMoreNews();
      }
    }, newsOptions);

    const videoOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    videoObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingVideos && videoPage) {
        loadMoreVideos();
      }
    }, videoOptions);

    if (newsEndRef.current) {
      newsObserver.current.observe(newsEndRef.current);
    }

    if (videoEndRef.current) {
      videoObserver.current.observe(videoEndRef.current);
    }

    return () => {
      if (newsObserver.current) {
        newsObserver.current.disconnect();
      }
      if (videoObserver.current) {
        videoObserver.current.disconnect();
      }
    };
  }, [newsEndRef.current, videoEndRef.current, loadingNews, loadingVideos, videoPage]);

  const fetchNews = async (reset = true) => {
    try {
      setLoadingNews(true);
      
      // Determine query based on category and tab
      let baseQuery = selectedCategory !== 'all' 
        ? `${selectedCategory}` 
        : '';
        
      if (searchQuery) {
        baseQuery = searchQuery;
      } else if (activeNewsTab === 'trending') {
        baseQuery = baseQuery || 'trending';
      } else if (activeNewsTab === 'fact-check') {
        baseQuery = (baseQuery ? `${baseQuery} fact check` : 'fact check');
      }
      
      const searchQueryParam = encodeURIComponent(baseQuery);
      
      // Use top-headlines for trending, everything for other searches
      const endpoint = activeNewsTab === 'trending' && !searchQuery
        ? 'top-headlines'
        : 'everything';
        
      const params = new URLSearchParams();
      
      if (endpoint === 'top-headlines') {
        params.append('country', 'us');
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
      } else {
        params.append('q', searchQueryParam);
        params.append('sortBy', 'publishedAt');
      }
      
      params.append('pageSize', '50');
      params.append('page', reset ? '1' : newsPage.toString());
      params.append('language', selectedLanguage);
      params.append('apiKey', NEWS_API_KEY);
      
      const apiUrl = `https://newsapi.org/v2/${endpoint}?${params.toString()}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`API Error: ${data.message || 'Failed to fetch news'}`);
      }
      
      if (reset) {
        setNewsArticles(data.articles || []);
        setNewsPage(2); // Next page will be 2
      } else {
        setNewsArticles(prev => [...prev, ...(data.articles || [])]);
        setNewsPage(newsPage + 1);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchVideos = async (reset = true) => {
    try {
      setLoadingVideos(true);
      
      // Determine query based on category and tab
      let baseQuery = selectedCategory !== 'all' 
        ? `${selectedCategory}` 
        : '';
        
      if (searchQuery) {
        baseQuery = searchQuery;
      } else if (activeVideoTab === 'shorts') {
        baseQuery = (baseQuery ? `${baseQuery} shorts` : 'shorts');
      } else if (activeVideoTab === 'fact-check') {
        baseQuery = (baseQuery ? `${baseQuery} fact check` : 'fact check');
      }
      
      const searchQueryParam = encodeURIComponent(baseQuery);
      
      const params = new URLSearchParams();
      params.append('part', 'snippet');
      params.append('maxResults', '50');
      params.append('q', searchQueryParam);
      params.append('type', 'video');
      params.append('key', YOUTUBE_API_KEY);
      
      if (selectedLanguage !== 'all') {
        params.append('relevanceLanguage', selectedLanguage);
      }
      
      if (!reset && videoPage) {
        params.append('pageToken', videoPage);
      }
      
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?${params.toString()}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (!response.ok || !data.items) {
        throw new Error('Failed to fetch videos');
      }
      
      const transformedVideos = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        description: item.snippet.description,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
      
      if (reset) {
        setVideos(transformedVideos);
      } else {
        setVideos(prev => [...prev, ...transformedVideos]);
      }
      
      setVideoPage(data.nextPageToken || null);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  const loadMoreNews = () => {
    if (!loadingNews) {
      fetchNews(false);
    }
  };

  const loadMoreVideos = () => {
    if (!loadingVideos && videoPage) {
      fetchVideos(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeSection === 'news') {
      fetchNews();
    } else {
      fetchVideos();
    }
  };

  const factCheckContent = async (content, title, type) => {
    setIsFactChecking(true);
    setShowFactCheck({ content, title, type });
    
    try {
      // Simulate API call to fact checking service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random fact check result for demo
      const randomScore = Math.floor(Math.random() * 100);
      let result;
      
      if (randomScore > 80) {
        result = {
          verdict: 'true',
          confidence: randomScore,
          analysis: `<p>Our analysis indicates that this ${type} contains factually accurate information.</p>
                    <p>The claims made are supported by multiple reliable sources and align with expert consensus.</p>`,
          sources: [
            { name: 'Reuters Fact Check', url: 'https://www.reuters.com/fact-check' },
            { name: 'Associated Press', url: 'https://apnews.com/' },
            { name: 'Fact Check.org', url: 'https://www.factcheck.org/' }
          ]
        };
      } else if (randomScore > 50) {
        result = {
          verdict: 'misleading',
          confidence: randomScore,
          analysis: `<p>Our analysis indicates that this ${type} contains some accurate information but is presented in a misleading way.</p>
                    <p>While some claims are factual, the overall context or certain details are misrepresented.</p>`,
          sources: [
            { name: 'Reuters Fact Check', url: 'https://www.reuters.com/fact-check' },
            { name: 'Snopes', url: 'https://www.snopes.com/' }
          ]
        };
      } else {
        result = {
          verdict: 'false',
          confidence: randomScore,
          analysis: `<p>Our analysis indicates that this ${type} contains false information.</p>
                    <p>The claims made contradict verified facts from reliable sources and expert consensus.</p>`,
          sources: [
            { name: 'Reuters Fact Check', url: 'https://www.reuters.com/fact-check' },
            { name: 'PolitiFact', url: 'https://www.politifact.com/' }
          ]
        };
      }
      
      setFactCheckResult(result);
    } catch (error) {
      console.error('Error fact checking content:', error);
    } finally {
      setIsFactChecking(false);
    }
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'true': return 'text-green-500';
      case 'false': return 'text-red-500';
      case 'misleading': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case 'true': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'false': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'misleading': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return null;
    }
  };

  const renderNewsCard = (article, index) => (
    <div 
      key={`${article.url}-${index}`}
      className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <img 
          src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
       
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center">
            <div className="p-1 rounded-full bg-red-600">
              <Youtube className="w-3 h-3 text-white" />
            </div>
            <span className="ml-1 text-xs text-white font-medium">YouTube</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {article.title}
        </h3>
        <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {article.description || "No description available"}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {article.source?.name || "Unknown source"}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <button 
            onClick={() => factCheckContent(article.content || article.description, article.title, 'article')}
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
            }`}
          >
            Fact Check
          </button>
        </div>
      </div>
    </div>
  );

  const renderVideoCard = (video, index) => (
    <div 
      key={`${video.id}-${index}`}
      className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <img 
          src={video.thumbnail || 'https://via.placeholder.com/400x200?text=No+Image'} 
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className={`dropdown dropdown-end`}>
            <button 
              className="p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
  
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center">
            <div className="p-1 rounded-full bg-red-600">
              <Youtube className="w-3 h-3 text-white" />
            </div>
            <span className="ml-1 text-xs text-white font-medium">YouTube</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {video.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {video.channelTitle || "Unknown channel"}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {video.publishedAt}
            </span>
          </div>
          <button 
            onClick={() => factCheckContent(video.description || video.title, video.title, 'video')}
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
            }`}
          >
            Fact Check
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Fact Check Modal */}
      {showFactCheck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
              <h3 className="text-lg font-semibold">Fact Check Results</h3>
              <button 
                onClick={() => {
                  setShowFactCheck(null);
                  setFactCheckResult(null);
                }}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <h4 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {showFactCheck.title}
              </h4>
              
              {isFactChecking ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="w-12 h-12 animate-spin text-orange-500 mb-4" />
                  <p className="text-lg font-medium">Analyzing content...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    We're fact-checking this {showFactCheck.type} against reliable sources
                  </p>
                </div>
              ) : factCheckResult ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      factCheckResult.verdict === 'true'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : factCheckResult.verdict === 'false'
                          ? 'bg-red-100 dark:bg-red-900/30'
                          : 'bg-yellow-100 dark:bg-yellow-900/30'
                    }`}>
                      {getVerdictIcon(factCheckResult.verdict)}
                    </div>
                    <div>
                      <h5 className={`text-lg font-bold ${getVerdictColor(factCheckResult.verdict)}`}>
                        {factCheckResult.verdict === 'true'
                          ? 'True'
                          : factCheckResult.verdict === 'false'
                            ? 'False'
                            : 'Misleading'}
                      </h5>
                      <div className="flex items-center mt-1">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              factCheckResult.verdict === 'true'
                                ? 'bg-green-500'
                                : factCheckResult.verdict === 'false'
                                  ? 'bg-red-500'
                                  : 'bg-yellow-500'
                            }`}
                            style={{ width: `${factCheckResult.confidence}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {factCheckResult.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-semibold mb-2">Analysis</h5>
                    <div 
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      dangerouslySetInnerHTML={{ __html: factCheckResult.analysis }}
                    ></div>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-semibold mb-2">Sources</h5>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <ul className="space-y-2">
                        {factCheckResult.sources.map((source, index) => (
                          <li key={index} className="flex items-center">
                            <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {source.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg">No fact check results available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full md:w-64 lg:w-72 space-y-6">
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold">Categories</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id
                            ? darkMode 
                              ? 'bg-gray-700 text-orange-400' 
                              : 'bg-orange-100 text-orange-600'
                            : darkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold">Language</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {languages.map(language => (
                    <li key={language.id}>
                      <button
                        onClick={() => setSelectedLanguage(language.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedLanguage === language.id
                            ? darkMode 
                              ? 'bg-gray-700 text-orange-400' 
                              : 'bg-orange-100 text-orange-600'
                            : darkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {language.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for news, videos, or topics to fact-check..."
                      className={`w-full p-2 pl-10 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200'
                      } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Search className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className={`p-2 rounded-lg ${
                      darkMode 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button 
                    type="button"
                    className={`p-2 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </form>
              </div>
              
              {/* Section Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveSection('news')}
                  className={`flex-1 py-3 text-center font-medium ${
                    activeSection === 'news'
                      ? darkMode 
                        ? 'text-orange-400 border-b-2 border-orange-400' 
                        : 'text-orange-600 border-b-2 border-orange-500'
                      : darkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Newspaper className="w-5 h-5 mr-2" />
                    News
                  </div>
                </button>
                <button
                  onClick={() => setActiveSection('videos')}
                  className={`flex-1 py-3 text-center font-medium ${
                    activeSection === 'videos'
                      ? darkMode 
                        ? 'text-orange-400 border-b-2 border-orange-400' 
                        : 'text-orange-600 border-b-2 border-orange-500'
                      : darkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Youtube className="w-5 h-5 mr-2" />
                    Videos
                  </div>
                </button>
              </div>
              
              {/* News Tabs */}
              {activeSection === 'news' && (
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveNewsTab('trending')}
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeNewsTab === 'trending'
                        ? darkMode 
                          ? 'text-orange-400 border-b-2 border-orange-400' 
                          : 'text-orange-600 border-b-2 border-orange-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveNewsTab('recent')}
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeNewsTab === 'recent'
                        ? darkMode 
                          ? 'text-orange-400 border-b-2 border-orange-400' 
                          : 'text-orange-600 border-b-2 border-orange-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Recent
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveNewsTab('fact-check')}
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeNewsTab === 'fact-check'
                        ? darkMode 
                          ? 'text-orange-400 border-b-2 border-orange-400' 
                          : 'text-orange-600 border-b-2 border-orange-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Fact Checks
                    </div>
                  </button>
                </div>
              )}
              
              {/* Video Tabs */}
              {activeSection === 'videos' && (
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveVideoTab('trending')}
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeVideoTab === 'trending'
                        ? darkMode 
                          ? 'text-orange-400 border-b-2 border-orange-400' 
                          : 'text-orange-600 border-b-2 border-orange-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveVideoTab('shorts')}
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeVideoTab === 'shorts'
                        ? darkMode 
                          ? 'text-orange-400 border-b-2 border-orange-400' 
                          : 'text-orange-600 border-b-2 border-orange-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <Youtube className="w-4 h-4 mr-1" />
                      Shorts
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveVideoTab('fact-check')}
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeVideoTab === 'fact-check'
                        ? darkMode 
                          ? 'text-orange-400 border-b-2 border-orange-400' 
                          : 'text-orange-600 border-b-2 border-orange-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Fact Checks
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            {/* Content Area */}
            <div>
              {/* News Content */}
              {activeSection === 'news' && (
                <>
                  {loadingNews && newsArticles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader className="w-12 h-12 animate-spin text-orange-500 mb-4" />
                      <p className="text-lg font-medium">Loading news articles...</p>
                    </div>
                  ) : newsArticles.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsArticles.map((article, index) => renderNewsCard(article, index))}
                      </div>
                      
                      {/* Loading indicator for pagination */}
                      <div ref={newsEndRef} className="py-8 flex justify-center">
                        {loadingNews && (
                          <div className="flex items-center">
                            <Loader className="w-5 h-5 animate-spin mr-2 text-orange-500" />
                            <span className="text-sm font-medium">Loading more articles...</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-lg font-medium mb-2">No news articles found</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Try adjusting your search or category filters
                      </p>
                      <button 
                        onClick={() => fetchNews()}
                        className="flex items-center px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </button>
                    </div>
                  )}
                </>
              )}
              
              {/* Videos Content */}
              {activeSection === 'videos' && (
                <>
                  {loadingVideos && videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader className="w-12 h-12 animate-spin text-orange-500 mb-4" />
                      <p className="text-lg font-medium">Loading videos...</p>
                    </div>
                  ) : videos.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, index) => renderVideoCard(video, index))}
                      </div>
                      
                      {/* Loading indicator for pagination */}
                      <div ref={videoEndRef} className="py-8 flex justify-center">
                        {loadingVideos && (
                          <div className="flex items-center">
                            <Loader className="w-5 h-5 animate-spin mr-2 text-orange-500" />
                            <span className="text-sm font-medium">Loading more videos...</span>
                          </div>
                        )}
                        
                        {!loadingVideos && !videoPage && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No more videos to load
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-lg font-medium mb-2">No videos found</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Try adjusting your search or category filters
                      </p>
                      <button 
                        onClick={() => fetchVideos()}
                        className="flex items-center px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactHub;