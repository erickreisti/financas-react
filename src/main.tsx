// src/main.tsx
// Importa React para criar a aplicação
import React from 'react';

// Importa ReactDOM para renderizar no navegador
import ReactDOM from 'react-dom/client';

// Importa o componente principal da aplicação
import App from './App.tsx';

// Importa os estilos CSS globais
import './styles/App.css';

// Cria um root (raiz) React para o elemento com id 'root' no HTML
// O operador ! afirma que o elemento existe (não é null)
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode ajuda a detectar problemas em desenvolvimento
  <React.StrictMode>
    {/* Renderiza o componente principal App */}
    <App />
  </React.StrictMode>
);
