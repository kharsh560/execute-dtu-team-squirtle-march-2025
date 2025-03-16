import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Users, Check, X, Github, Twitter, Mail, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Header from '../header/Header';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const Counter = ({ end, duration = 2 }) => {
    const [ref, inView] = useInView({ triggerOnce: true });
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      if (inView) {
        let startTime;
        const animateCount = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = (timestamp - startTime) / (duration * 1000);
          
          if (progress < 1) {
            setCount(Math.floor(end * progress));
            requestAnimationFrame(animateCount);
          } else {
            setCount(end);
          }
        };
        requestAnimationFrame(animateCount);
      }
    }, [inView, end, duration]);
  
    return <span ref={ref}>{count.toLocaleString()}</span>;
  };
  
  const recentNews = [
    {
      title: "Study Shows Benefits of Mediterranean Diet",
      credibility: 95,
      timestamp: "2 hours ago",
      verified: true
    },
    {
      title: "New Technology Claims to Solve Climate Change",
      credibility: 45,
      timestamp: "4 hours ago",
      verified: false
    },
    {
      title: "Space Agency Announces Major Discovery",
      credibility: 88,
      timestamp: "6 hours ago",
      verified: true
    }
  ];
  
  function LandingPage({ darkMode }) {
    return (
      <>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Detect Misinformation with AI-Powered Precision
              </h1>
              <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your trusted companion in the fight against fake news and misinformation.
                Get real-time fact-checking powered by advanced AI technology.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started Free
              </motion.button>
            </motion.div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                className={`p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              >
                <Shield className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Real-time Protection</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Instant analysis of news articles and social media posts as you browse.
                </p>
              </motion.div>
  
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                className={`p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              >
                <Brain className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI-Powered Analysis</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Advanced machine learning algorithms to detect patterns and inconsistencies.
                </p>
              </motion.div>
  
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                className={`p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              >
                <Users className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Community Driven</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Collaborative verification system with expert fact-checkers and users.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
  
        {/* Statistics Section */}
        <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-12">Trust in Numbers</h2>
            <div className="text-5xl font-bold mb-4">
              <Counter end={1234567} />
            </div>
            <p className="text-xl opacity-90">Articles Analyzed for Truth</p>
          </div>
        </section>
  
        {/* Recently Checked News */}
        <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recently Checked News</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {recentNews.map((news, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{news.title}</h3>
                    <div className="flex items-center space-x-2">
                      {news.verified ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span className={`font-medium ${
                        news.credibility >= 70 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {news.credibility}%
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{news.timestamp}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
  
export default LandingPage;