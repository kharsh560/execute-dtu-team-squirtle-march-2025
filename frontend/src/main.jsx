import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/Body/LandingPage';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './appStore/store/store.js'
import User from './pages/authPages/SignIn.jsx';
import SignIn from './pages/authPages/SignIn.jsx';
import SignUp from './pages/authPages/SignUp.jsx';
import NotificationProvider from './utils/NotificationProvider.jsx';
import SabpaisaPaymentGateway from './pages/sabPaisa/SabPaisa.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sabpaisa" element={<SabpaisaPaymentGateway />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotificationProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </NotificationProvider>
  </Provider>
)
