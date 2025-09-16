// src/main.tsx
// Ponto de entrada da aplicação React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/App.css';

// Cria um root React para o elemento com id 'root' no HTML
// O operador ! afirma que o elemento existe (não é null)
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode ajuda a detectar problemas em desenvolvimento
  <React.StrictMode>
    {/* Renderiza o componente principal App */}
    <App />
  </React.StrictMode>
);
