import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>,
);
