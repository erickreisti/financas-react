// src/contexts/ThemeContext.tsx
// Contexto para gerenciamento global do tema (claro/escuro)
import React, { createContext, useState, useEffect } from 'react';

// Interface para definir o que o contexto de tema vai fornecer
export interface ThemeContextType {
  darkMode: boolean; // Estado atual do modo escuro
  toggleDarkMode: () => void; // Função para alternar modo escuro
}

// Cria o contexto com valor inicial undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Componente Provider: fornece os dados do tema para toda a árvore de componentes
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado local para controlar modo escuro (true = dark, false = light)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // useEffect: executa quando componente monta (carrega preferência do usuário)
  useEffect(() => {
    // Tenta carregar preferência de modo escuro salva no navegador
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      // Se estava salvo como true, ativa modo escuro
      setDarkMode(true);
    }
  }, []); // Array vazio = executa só uma vez na montagem

  // useEffect: aplica tema ao body e salva preferência quando darkMode muda
  useEffect(() => {
    if (darkMode) {
      // Adiciona classe 'dark' ao body quando modo escuro está ativo
      document.body.classList.add('dark');
    } else {
      // Remove classe 'dark' do body quando modo claro está ativo
      document.body.classList.remove('dark');
    }
    // Salva preferência de modo escuro no localStorage
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]); // Executa sempre que darkMode mudar

  // Função para alternar entre modo claro e escuro
  const toggleDarkMode = (): void => {
    // Inverte o valor atual do estado darkMode
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  // Objeto com todos os valores que o contexto de tema vai fornecer
  const contextValue: ThemeContextType = {
    darkMode, // Estado atual do modo escuro
    toggleDarkMode, // Função para alternar modo escuro
  };

  // Retorna o Provider do contexto com o valor definido
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Exportar o contexto também
export default ThemeContext;
