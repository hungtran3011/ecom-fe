import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppProvider';
import { AppRoutes } from './routes.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);
