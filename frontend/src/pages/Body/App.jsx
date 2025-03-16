import React, { useState } from 'react';
import { AlertCircle, Check, X, Loader2, LogIn, Shield, Moon, Sun } from 'lucide-react';
import Header from '../header/Header';

import Modal from './Modal';
import FactCard from './FactCard';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'twitter', name: 'X (Twitter)' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'video', name: 'Video' },
    { id: 'email', name: 'Email' },
    { id: 'image', name: 'Image' }
  ];

  const pastFacts = [
    { id: 1, title: 'Climate Change Report', platform: 'linkedin', result: true },
    { id: 2, title: 'COVID-19 Statistics', platform: 'twitter', result: false },
    { id: 3, title: 'Election Results', platform: 'whatsapp', result: true },
    { id: 4, title: 'Space Discovery', platform: 'youtube', result: true },
    { id: 5, title: 'Health Study', platform: 'email', result: false },
    { id: 6, title: 'Economic Forecast', platform: 'instagram', result: true }
  ];

  const handleVerify = async () => {
    if (!selectedPlatform) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsVerifying(false);
    setVerificationResult({
      isTrue: Math.random() > 0.5,
      message: Math.random() > 0.5 
        ? "This post appears to be accurate based on our verification." 
        : "This post contains misleading or false information."
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Fact Checker Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fact Checker</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL or paste content"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 flex items-center"
            >
              <Check className="h-5 w-5 mr-2" />
              Check
            </button>
          </div>
        </div>

        {/* Past Facts Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Past Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastFacts.map((fact) => (
              <FactCard
                key={fact.id}
                fact={fact}
                onClick={() => setIsModalOpen(true)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Verification Modal */}
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setVerificationResult(null);
        setSelectedPlatform(null);
      }} isDarkMode={isDarkMode}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Verify Content</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Content to verify:</p>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg dark:text-gray-200">
              {url || "Selected content will appear here"}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Select platform:</p>
            <div className="grid grid-cols-4 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`p-3 text-sm rounded-lg border transition-all text-white ${
                    selectedPlatform?.id === platform.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {!verificationResult ? (
            <button
              onClick={handleVerify}
              disabled={!selectedPlatform || isVerifying}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center text-white font-medium ${
                !selectedPlatform || isVerifying
                  ? 'bg-gray-400 dark:bg-gray-600'
                  : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
              }`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Verify Truth
                </>
              )}
            </button>
          ) : (
            <div className={`p-4 rounded-lg ${
              verificationResult.isTrue 
                ? 'bg-green-50 dark:bg-green-900/50' 
                : 'bg-red-50 dark:bg-red-900/50'
            }`}>
              <div className="flex items-center">
                {verificationResult.isTrue ? (
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                ) : (
                  <X className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                )}
                <p className={`text-sm font-medium ${
                  verificationResult.isTrue 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {verificationResult.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;