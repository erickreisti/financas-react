// src/hooks/useTransactions.ts
// Hook customizado para usar o contexto de transações
import { useContext } from 'react';
import TransactionContext, {
  type TransactionContextType,
} from '../contexts/TransactionContext';

// Hook customizado para usar o contexto de transações
// Facilita o uso do contexto e adiciona verificação de erro
export const useTransactions = (): TransactionContextType => {
  // Usa hook useContext para acessar o contexto
  const context = useContext(TransactionContext);

  // Verifica se o hook está sendo usado dentro de um Provider
  if (context === undefined) {
    // Lança erro se não estiver dentro do Provider
    throw new Error(
      'useTransactions must be used within a TransactionProvider'
    );
  }

  // Retorna o contexto se estiver tudo certo
  return context;
};
