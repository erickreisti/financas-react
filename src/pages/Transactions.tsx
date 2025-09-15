import FilterBar from '../components/FilterBar';
import TransactionList from '../components/TransactionList';

interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface TransactionsProps {
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
  filterType: string;
  filterCategory: string;
  handleFilterChange: (filterName: string, value: string) => void;
  isSorted: boolean;
  toggleSort: () => void;
  filteredTransactions: Transaction[];
}

const Transactions = ({
  transactions,
  deleteTransaction,
  filterType,
  filterCategory,
  handleFilterChange,
  isSorted,
  toggleSort,
  filteredTransactions,
}: TransactionsProps) => {
  return (
    <div>
      <h1>📋 Todas as Transações</h1>
      <p>Total de transações: {transactions.length}</p>

      <div className="card">
        <FilterBar
          filterType={filterType}
          filterCategory={filterCategory}
          onFilterChange={handleFilterChange}
          onSort={toggleSort}
          isSorted={isSorted}
        />

        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>{filteredTransactions.length}</strong> transações
            encontradas
          </p>
        </div>
      </div>

      <div className="card">
        <TransactionList
          transactions={filteredTransactions}
          onDeleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default Transactions;
