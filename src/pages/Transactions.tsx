// src/pages/Transactions.tsx
// Página com todas as transações

import FilterBar from '../components/FilterBar';
import TransactionList from '../components/TransactionList';
import { useTransactions } from '../hooks/useTransactions'; // Importa hook do contexto

// Interface para definir props recebidas pelo componente
interface TransactionsProps {
  filterType: string;
  filterCategory: string;
  handleFilterChange: (filterName: string, value: string) => void;
  isSorted: boolean;
  toggleSort: () => void;
}

// Componente Transactions: página com todas transações
const Transactions = ({
  filterType,
  filterCategory,
  handleFilterChange,
  isSorted,
  toggleSort,
}: TransactionsProps) => {
  // Usa hook customizado para acessar contexto de transações
  const { transactions, deleteTransaction } = useTransactions();

  // Filtra transações baseado nos filtros selecionados
  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filterType === 'todas' || transaction.type === filterType;
    const categoryMatch =
      filterCategory === 'todas' || transaction.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  // Ordena transações se isSorted for true
  const sortedTransactions = isSorted
    ? [...filteredTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : filteredTransactions;

  // Retorna JSX (interface do componente)
  return (
    // Div principal da página
    <div>
      {/* Título da página */}
      <h1>📋 Todas as Transações</h1>

      {/* Seção de filtros */}
      <div className="card">
        <FilterBar
          filterType={filterType}
          filterCategory={filterCategory}
          onFilterChange={handleFilterChange}
          onSort={toggleSort}
          isSorted={isSorted}
        />

        {/* Contador de transações encontradas */}
        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>{sortedTransactions.length}</strong> transações encontradas
          </p>
        </div>
      </div>

      {/* Seção de lista de transações */}
      <div className="card">
        <TransactionList
          transactions={sortedTransactions}
          onDeleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};

// Exporta componente para ser usado em outras partes do app
export default Transactions;
