import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
// Replace the Home import with LandingPage
import LandingPage from './pages/Body/LandingPage.jsx'
// Removed the User import since the file doesn't exist

import { Provider } from 'react-redux'
import { store } from './appStore/store/store.js'

// Import Dashboard components
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import DashboardHome from './pages/Dashboard/DashboardHome.jsx'
import FactChecks from './pages/Dashboard/FactChecks.jsx'
import XPWallet from './pages/Dashboard/XPWallet.jsx'
import AIFactEngine from './pages/Dashboard/AIFactEngine.jsx'
import FactHub from './pages/Dashboard/FactHub.jsx'
import NotificationProvider from './utilities/NotificationProvider.jsx'
import SignIn from './pages/authPages/SignIn.jsx'
import SignUp from './pages/authPages/SignUp.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<LandingPage />} />
      {/* Removed the User route since the component doesn't exist */}
      
      {/* Dashboard Routes */}
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="fact-checks" element={<FactChecks />} />
        <Route path="xp-wallet" element={<XPWallet />} />
        <Route path="ai-fact-engine" element={<AIFactEngine />} />
        <Route path="ai-fact-hub" element={<FactHub />} />
      </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotificationProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </NotificationProvider>
  </Provider>
)
