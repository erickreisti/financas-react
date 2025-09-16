// src/pages/Dashboard.tsx
// Página principal com visão geral das finanças

import Saldo from '../components/Saldo';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactions'; // Importa hook do contexto

// Componente Dashboard: página principal com visão geral
const Dashboard = () => {
  // Usa hook customizado para acessar contexto de transações
  // Desestrutura todas as funções e dados necessários
  const { transactions, addTransaction, deleteTransaction, calculateTotal } =
    useTransactions();

  // Filtra apenas as últimas 5 transações (slice(-5) pega os últimos 5 itens)
  const recentTransactions = transactions.slice(-5);

  // Retorna JSX (interface do componente)
  return (
    // Div principal do dashboard
    <div>
      {/* Título da página */}
      <h1>📊 Dashboard</h1>

      {/* Componente Saldo recebendo função para calcular total */}
      <Saldo total={calculateTotal()} />

      {/* Seção de últimas transações */}
      <div className="card">
        {/* Subtítulo */}
        <h2>Últimas Transações</h2>
        {/* Lista de transações recentes */}
        {/* Passa transações filtradas e função de delete do contexto */}
        <TransactionList
          transactions={recentTransactions}
          onDeleteTransaction={deleteTransaction}
        />
      </div>

      {/* Seção para adicionar nova transação */}
      <div className="card">
        {/* Subtítulo */}
        <h2>Adicionar Nova Transação</h2>
        {/* Formulário para adicionar transação */}
        {/* Passa função para adicionar nova transação do contexto */}
        <TransactionForm onAddTransaction={addTransaction} />
      </div>
    </div>
  );
};

// Exporta componente para ser usado em outras partes do app
export default Dashboard;
