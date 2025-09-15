import Saldo from '../components/Saldo';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface DashboardProps {
  transactions: Transaction[];
  calculateTotal: () => number;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
}

const Dashboard = ({
  transactions,
  calculateTotal,
  addTransaction,
  deleteTransaction,
}: DashboardProps) => {
  const recentTransactions = transactions.slice(-5);

  return (
    <div>
      <h1>📊 Dashboard</h1>

      <Saldo total={calculateTotal()} />

      <div className="card">
        <h2>Últimas Transações</h2>
        <TransactionList
          transactions={recentTransactions}
          onDeleteTransaction={deleteTransaction}
        />
      </div>

      <div className="card">
        <h2>Adicionar Nova Transação</h2>
        <TransactionForm onAddTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default Dashboard;
