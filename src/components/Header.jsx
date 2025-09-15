// src/components/Header.jsx
import React from "react"; // Importa React para criar componentes

// Componente Header: cabeçalho da aplicação
// Recebe props: darkMode (boolean) e toggleDarkMode (função)
const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    // Elemento header HTML
    <header>
      {/* Título principal da aplicação */}
      <h1>💰 Minhas Finanças</h1>

      {/* Botão para alternar modo claro/escuro */}
      {/* onClick chama a função toggleDarkMode recebida via props */}
      <button
        id="toggle-theme"
        onClick={toggleDarkMode} // ssQuando clicado, alterna o modo
      >
        {/* Mostra ícone diferente dependendo do modo atual */}
        {darkMode ? "☀️" : "🌙"} {/* Sol se darkMode=true, lua se false */}
      </button>
    </header>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Header;
