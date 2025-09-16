// src/contexts/TransactionContext.tsx
// Contexto para gerenciamento global de transações financeiras
import React, { createContext, useState, useEffect } from 'react';

// Interface para definir a estrutura de uma transação financeira
export interface Transaction {
  id: number; // ID único da transação
  type: 'receita' | 'despesa'; // Tipo: só pode ser 'receita' ou 'despesa'
  description: string; // Descrição da transação
  category: string; // Categoria (ex: alimentação, transporte)
  amount: number; // Valor numérico da transação
  date: string; // Data no formato ISO string
}

// Interface para definir o que o contexto vai fornecer para os componentes
export interface TransactionContextType {
  transactions: Transaction[]; // Array de todas transações
  addTransaction: (transaction: Transaction) => void; // Função para adicionar
  deleteTransaction: (id: number) => void; // Função para deletar
  calculateTotal: () => number; // Função para calcular saldo
}

// Cria o contexto com valor inicial undefined
// O tipo indica que pode ser TransactionContextType ou undefined
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

// Componente Provider: fornece os dados do contexto para toda a árvore de componentes
// Recebe children (todos os componentes filhos que vão usar o contexto)
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado local para armazenar todas as transações
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // useEffect: executa quando componente monta (carrega dados do localStorage)
  useEffect(() => {
    // Tenta carregar transações salvas no navegador
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      try {
        // Converte string JSON de volta para array de objetos
        const parsedTransactions = JSON.parse(savedTransactions);
        setTransactions(parsedTransactions);
      } catch (error) {
        // Se houver erro ao parsear, remove dados corrompidos
        console.error('Erro ao carregar transações do localStorage:', error);
        localStorage.removeItem('transactions');
      }
    }
  }, []); // Array vazio = executa só uma vez na montagem

  // useEffect: salva transações no localStorage quando elas mudam
  useEffect(() => {
    // Converte array para string JSON e salva no navegador
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]); // Executa sempre que transactions mudar

  // Função para adicionar nova transação ao estado
  const addTransaction = (transaction: Transaction): void => {
    // Usa função de atualização do estado para garantir valor mais recente
    setTransactions(prevTransactions => [...prevTransactions, transaction]);
  };

  // Função para deletar transação pelo ID
  const deleteTransaction = (id: number): void => {
    // Filtra array removendo a transação com ID especificado
    setTransactions(prevTransactions =>
      prevTransactions.filter(transaction => transaction.id !== id)
    );
  };

  // Função para calcular saldo total (receitas - despesas)
  const calculateTotal = (): number => {
    // Usa reduce para somar/subtrair todas as transações
    return transactions.reduce((total, transaction) => {
      // Se for receita, soma o valor; se for despesa, subtrai
      return transaction.type === 'receita'
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0); // Começa com total = 0
  };

  // Objeto com todos os valores que o contexto vai fornecer
  const contextValue: TransactionContextType = {
    transactions, // Array de transações
    addTransaction, // Função para adicionar
    deleteTransaction, // Função para deletar
    calculateTotal, // Função para calcular total
  };

  // Retorna o Provider do contexto com o valor definido
  // Todos componentes filhos terão acesso aos dados do contexto
  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

// Exportar o contexto também
export default TransactionContext;
