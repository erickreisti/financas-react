import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/App.css';

// Usar asserção não-nula com verificação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
