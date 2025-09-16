// src/hooks/useTheme.ts
// Hook customizado para usar o contexto de tema
import { useContext } from 'react';
import ThemeContext, { type ThemeContextType } from '../contexts/ThemeContext';

// Hook customizado para usar o contexto de tema
export const useTheme = (): ThemeContextType => {
  // Usa hook useContext para acessar o contexto de tema
  const context = useContext(ThemeContext);

  // Verifica se o hook está sendo usado dentro de um ThemeProvider
  if (context === undefined) {
    // Lança erro se não estiver dentro do Provider
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  // Retorna o contexto se estiver tudo certo
  return context;
};
