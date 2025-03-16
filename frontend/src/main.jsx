import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/Body/LandingPage';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout darkMode={darkMode} setDarkMode={setDarkMode} />,
      children: [
        {
          index: true,
          element: <LandingPage darkMode={darkMode} />,
        },
        // More routes can be added here
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
