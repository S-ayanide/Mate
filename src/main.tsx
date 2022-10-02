import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
);
