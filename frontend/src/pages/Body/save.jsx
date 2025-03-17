import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Brain, Users, Check, X, 
  Twitter, MessageCircle, Youtube, Globe, 
  TrendingUp, Award, Lock, CreditCard, 
  CheckCircle, AlertTriangle
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
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
    verified: true,
    source: "Medical Journal"
  },
  {
    title: "New Technology Claims to Solve Climate Change",
    credibility: 45,
    timestamp: "4 hours ago",
    verified: false,
    source: "Tech Blog"
  },
  {
    title: "Space Agency Announces Major Discovery",
    credibility: 88,
    timestamp: "6 hours ago",
    verified: true,
    source: "Science News"
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Basic fact-checking (5 per day)",
      "Text analysis",
      "Community support",
      "Basic source verification"
    ],
    recommended: false,
    buttonText: "Get Started"
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "monthly",
    features: [
      "Unlimited fact-checking",
      "Image & video analysis",
      "Priority processing",
      "Advanced source verification",
      "API access"
    ],
    recommended: true,
    buttonText: "Try Pro"
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom integrations",
      "Team management",
      "Advanced analytics"
    ],
    recommended: false,
    buttonText: "Contact Us"
  }
];

function LandingPage() {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  
  return (
    <>
      {/* Hero Section with Gradient Background */}
      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200 dark:bg-orange-800 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-300 dark:bg-orange-700 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400`}>
              Verify Before You Share
            </h1>
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your trusted companion in the fight against fake news and misinformation.
              Get real-time fact-checking powered by advanced AI technology.
            </p>
            // Find the hero section button and update it to navigate to the dashboard
            // Around line 125-135 in the hero section
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                Start Fact Checking
              </Link>
              <button className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'} shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5`}>
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Verification Methods Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Verify Content From Any Source
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Our AI-powered platform can analyze and fact-check content from multiple platforms to help you identify misinformation.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Twitter */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} border border-orange-100 dark:border-gray-600`}
            >
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Twitter className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Twitter Posts</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Verify tweets and threads by pasting the URL or content for instant analysis.
              </p>
              <Link to="/twitter-check" className="mt-4 inline-block text-orange-500 font-medium hover:underline">
                Check Tweets →
              </Link>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} border border-orange-100 dark:border-gray-600`}
            >
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MessageCircle className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>WhatsApp Messages</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Copy and paste forwarded messages to verify claims before sharing further.
              </p>
              <Link to="/message-check" className="mt-4 inline-block text-orange-500 font-medium hover:underline">
                Check Messages →
              </Link>
            </motion.div>

            {/* YouTube */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} border border-orange-100 dark:border-gray-600`}
            >
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Youtube className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>YouTube Videos</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Analyze YouTube videos for factual accuracy by providing the video URL.
              </p>
              <Link to="/video-fact-check" className="mt-4 inline-block text-orange-500 font-medium hover:underline">
                Check Videos →
              </Link>
            </motion.div>

            {/* News */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} border border-orange-100 dark:border-gray-600`}
            >
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>News Articles</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Verify news articles and headlines by entering the URL or content.
              </p>
              <Link to="/news-check" className="mt-4 inline-block text-orange-500 font-medium hover:underline">
                Check News →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Why Choose TruthGuard?
            </motion.h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideIn}
              viewport={{ once: true }}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-orange-50'} border border-orange-100 dark:border-gray-700`}
            >
              <Shield className="h-12 w-12 text-orange-500 mb-6" />
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Real-time Protection</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Instant analysis of news articles and social media posts as you browse, with browser extensions for Chrome and Firefox.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideIn}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-orange-50'} border border-orange-100 dark:border-gray-700`}
            >
              <Brain className="h-12 w-12 text-orange-500 mb-6" />
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI-Powered Analysis</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Advanced machine learning algorithms to detect patterns and inconsistencies across multiple sources for comprehensive verification.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideIn}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-orange-50'} border border-orange-100 dark:border-gray-700`}
            >
              <Users className="h-12 w-12 text-orange-500 mb-6" />
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Community Verification</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Leverage the wisdom of our expert community to provide additional context and verification for complex topics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className={`text-4xl font-bold mb-2 text-orange-500`}>
                <Counter end={5000} duration={2.5} />+
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Fact Checks Daily
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6"
            >
              <div className={`text-4xl font-bold mb-2 text-orange-500`}>
                <Counter end={98} />%
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Accuracy Rate
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6"
            >
              <div className={`text-4xl font-bold mb-2 text-orange-500`}>
                <Counter end={250} />K+
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Active Users
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="p-6"
            >
              <div className={`text-4xl font-bold mb-2 text-orange-500`}>
                <Counter end={15} />M+
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Misinformation Prevented
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Fact Checks */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Recent Fact Checks
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Stay updated with the latest verified information and trending topics
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {recentNews.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-orange-100 dark:border-gray-700`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.source} • {item.timestamp}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.verified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                    {item.verified ? 'Verified' : 'Misleading'}
                  </span>
                </div>
                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-16 h-2 rounded-full ${
                      item.credibility > 80 ? 'bg-green-500' : 
                      item.credibility > 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.credibility}% credible
                    </span>
                  </div>
                  <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    Read Analysis →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium border-2 border-orange-500 ${darkMode ? 'text-white' : 'text-orange-600'} hover:bg-orange-500 hover:text-white transition-colors`}
            >
              View All Fact Checks
            </motion.button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              How TruthGuard Works
            </motion.h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 text-orange-500 text-2xl font-bold border-4 ${darkMode ? 'border-gray-700' : 'border-white'}`}>
                  1
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 -ml-4 bg-orange-200 dark:bg-orange-800/50"></div>
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Submit Content</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Paste a URL, upload media, or enter text from any source you want to verify
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 text-orange-500 text-2xl font-bold border-4 ${darkMode ? 'border-gray-700' : 'border-white'}`}>
                  2
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 -ml-4 bg-orange-200 dark:bg-orange-800/50"></div>
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Analysis</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our AI scans the content and cross-references with trusted sources
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 text-orange-500 text-2xl font-bold border-4 ${darkMode ? 'border-gray-700' : 'border-white'}`}>
                  3
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 -ml-4 bg-orange-200 dark:bg-orange-800/50"></div>
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Verification</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Claims are verified against reliable databases and fact-checking organizations
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 text-orange-500 text-2xl font-bold border-4 ${darkMode ? 'border-gray-700' : 'border-white'}`}>
                  4
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Results</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get a detailed report with trust score, sources, and explanation of the analysis
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Select the plan that fits your needs, from individual users to enterprise solutions
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`p-8 rounded-xl shadow-lg relative ${
                  plan.recommended 
                    ? 'border-2 border-orange-500 transform md:-translate-y-4' 
                    : 'border border-orange-100 dark:border-gray-700'
                } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/{plan.period}</span>}
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.recommended 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : `border-2 border-orange-500 ${darkMode ? 'text-white' : 'text-orange-600'} hover:bg-orange-500 hover:text-white`
                  }`}
                >
                  {plan.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Our Business Model
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              How we create value while fighting misinformation
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideIn}
              viewport={{ once: true }}
            >
              <div className={`p-1 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl`}>
                <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
                  <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Revenue Streams
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Subscription Model
                        </h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          Premium subscriptions for individuals and organizations with advanced features and higher usage limits.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          API Access
                        </h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          Enterprise API solutions for media companies, educational institutions, and technology platforms.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Award className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Partnerships
                        </h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          Strategic partnerships with news organizations, social media platforms, and educational institutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideIn}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className={`p-1 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl`}>
                <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
                  <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Our Commitment
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Check className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Free Basic Access
                        </h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          We maintain a free tier to ensure everyone has access to basic fact-checking tools in the fight against misinformation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Privacy First
                        </h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          We never sell user data. Our business model is based on providing value through our services, not exploiting user information.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Transparency
                        </h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          We're transparent about our methodology, sources, and limitations to build trust with our users.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200 dark:bg-orange-800 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-300 dark:bg-orange-700 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Join the Fight Against Misinformation
            </h2>
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Start fact-checking today and help create a more informed world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-lg font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
              >
                Get Started - It's Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-lg text-lg font-semibold border-2 border-orange-500 shadow-lg transition-all ${darkMode ? 'text-white' : 'text-orange-600'} hover:bg-orange-500 hover:text-white`}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;