import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/Body/App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);