// src/components/Header.tsx
// Componente de cabeçalho da aplicação

import { useTheme } from '../hooks/useTheme'; // Importa hook customizado para tema

// Componente Header: cabeçalho da aplicação
const Header = () => {
  // Usa hook customizado para acessar contexto de tema
  // Desestrutura darkMode e toggleDarkMode do contexto
  const { darkMode, toggleDarkMode } = useTheme();

  // Retorna JSX (HTML-like syntax) do componente
  return (
    // Elemento header HTML
    <header>
      {/* Título principal da aplicação com emoji de dinheiro */}
      <h1>💰 Minhas Finanças</h1>

      {/* Botão para alternar modo claro/escuro */}
      <button
        type="button" // Tipo de botão explícito (boa prática)
        id="toggle-theme" // ID para estilização
        onClick={toggleDarkMode} // Quando clicado, chama função do contexto
      >
        {/* Operador ternário: mostra ícone diferente baseado no modo atual */}
        {darkMode ? '☀️' : '🌙'} {/* Sol se darkMode=true, lua se false */}
      </button>
    </header>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Header;
