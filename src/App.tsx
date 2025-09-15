// src/App.tsx
// Importa React e hooks useState e useEffect
import { useState, useEffect } from 'react';

// Importa componentes do React Router para navegação
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa estilos CSS
import './styles/App.css';

// Importa componentes criados
import Header from './components/Header';
import Navigation from './components/Navigation';

// Importa páginas criadas
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';

// Interface para definir estrutura de transação
interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

// Componente principal da aplicação
function App() {
  // Estados da aplicação usando useState hook com tipagem TypeScript
  const [darkMode, setDarkMode] = useState<boolean>(false); // Controle de tema
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Array de transações
  const [filterType, setFilterType] = useState<string>('todas'); // Filtro por tipo
  const [filterCategory, setFilterCategory] = useState<string>('todas'); // Filtro por categoria
  const [isSorted, setIsSorted] = useState<boolean>(false); // Controle de ordenação

  // useEffect que executa quando componente monta (carrega dados salvos)
  useEffect(() => {
    // Tenta carregar transações salvas no localStorage
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      // Converte string JSON de volta para array de objetos
      setTransactions(JSON.parse(savedTransactions));
    }

    // Tenta carregar preferência de modo escuro
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true); // Se estava salvo como true, ativa modo escuro
    }
  }, []); // Array vazio = executa apenas uma vez na montagem

  // useEffect que aplica modo escuro ao body e salva preferência
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

  // useEffect que salva transações no localStorage quando elas mudam
  useEffect(() => {
    // Converte array de transações para string JSON e salva
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]); // Executa sempre que transactions mudar

  // Função para calcular saldo total das transações
  const calculateTotal = (): number => {
    // Usa reduce para somar/subtrair todas as transações
    return transactions.reduce((total, transaction) => {
      // Se for receita, soma o valor; se for despesa, subtrai
      return transaction.type === 'receita'
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0); // Começa com total = 0
  };

  // Função para adicionar nova transação ao array
  const addTransaction = (transaction: Transaction): void => {
    // Cria novo array com todas transações atuais + nova transação
    setTransactions([...transactions, transaction]);
  };

  // Função para deletar transação pelo ID
  const deleteTransaction = (id: number): void => {
    // Filtra array removendo a transação com ID especificado
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Filtra transações baseado nos filtros selecionados
  const filteredTransactions = transactions.filter(transaction => {
    // Verifica se tipo corresponde ao filtro selecionado
    const typeMatch = filterType === 'todas' || transaction.type === filterType;
    // Verifica se categoria corresponde ao filtro selecionado
    const categoryMatch =
      filterCategory === 'todas' || transaction.category === filterCategory;
    // Retorna true apenas se ambos filtros corresponderem
    return typeMatch && categoryMatch;
  });

  // Ordena transações se isSorted for true
  const sortedTransactions = isSorted
    ? // Cria cópia do array filtrado e ordena por data (mais recente primeiro)
      [...filteredTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : // Se não estiver ordenado, usa array filtrado como está
      filteredTransactions;

  // Função para alternar entre modo claro e escuro
  const toggleDarkMode = (): void => {
    // Inverte o valor atual do estado darkMode
    setDarkMode(!darkMode);
  };

  // Função para alternar ordenação das transações
  const toggleSort = (): void => {
    // Inverte o valor atual do estado isSorted
    setIsSorted(!isSorted);
  };

  // Função para alterar filtros (tipo ou categoria)
  const handleFilterChange = (filterName: string, value: string): void => {
    // Verifica qual filtro está sendo alterado e atualiza o estado correspondente
    if (filterName === 'type') {
      setFilterType(value); // Atualiza filtro de tipo
    } else if (filterName === 'category') {
      setFilterCategory(value); // Atualiza filtro de categoria
    }
  };

  // Renderização do componente (retorna JSX)
  return (
    // Componente Router do React Router para habilitar navegação
    <Router>
      {/* Div principal da aplicação com classe CSS 'App' */}
      <div className="App">
        {/* Componente Header recebendo props para modo escuro */}
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Elemento main que contém o conteúdo principal */}
        <main
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}
        >
          {/* Componente de navegação */}
          <Navigation />

          {/* Componente Routes do React Router para definir rotas */}
          <Routes>
            {/* Rota raiz (/) - Dashboard */}
            <Route
              path="/"
              element={
                <Dashboard
                  transactions={transactions} // Passa todas transações
                  calculateTotal={calculateTotal} // Passa função calcular total
                  addTransaction={addTransaction} // Passa função adicionar
                  deleteTransaction={deleteTransaction} // Passa função deletar
                />
              }
            />

            {/* Rota /transactions - Página de transações */}
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions} // Passa todas transações
                  deleteTransaction={deleteTransaction} // Passa função deletar
                  filterType={filterType} // Passa filtro de tipo
                  filterCategory={filterCategory} // Passa filtro de categoria
                  handleFilterChange={handleFilterChange} // Passa função alterar filtros
                  isSorted={isSorted} // Passa estado de ordenação
                  toggleSort={toggleSort} // Passa função ordenar
                  filteredTransactions={sortedTransactions} // Passa transações filtradas
                />
              }
            />

            {/* Rota /reports - Página de relatórios */}
            <Route
              path="/reports"
              element={
                <Reports transactions={transactions} /> // Passa todas transações
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default App;
