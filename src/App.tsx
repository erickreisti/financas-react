import { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Saldo from './components/Saldo';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

// Interface para transação
interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>('todas');
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const calculateTotal = (): number => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'receita'
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  };

  const addTransaction = (transaction: Transaction): void => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id: number): void => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filterType === 'todas' || transaction.type === filterType;
    const categoryMatch =
      filterCategory === 'todas' || transaction.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  const sortedTransactions = isSorted
    ? [...filteredTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : filteredTransactions;

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  const toggleSort = (): void => {
    setIsSorted(!isSorted);
  };

  const handleFilterChange = (filterName: string, value: string): void => {
    if (filterName === 'type') {
      setFilterType(value);
    } else if (filterName === 'category') {
      setFilterCategory(value);
    }
  };

  return (
    <div className="App">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <Saldo total={calculateTotal()} />

        <FilterBar
          filterType={filterType}
          filterCategory={filterCategory}
          onFilterChange={handleFilterChange}
          onSort={toggleSort}
          isSorted={isSorted}
        />

        <TransactionList
          transactions={sortedTransactions}
          onDeleteTransaction={deleteTransaction}
        />

        <TransactionForm onAddTransaction={addTransaction} />
      </main>
    </div>
  );
}

export default App;
