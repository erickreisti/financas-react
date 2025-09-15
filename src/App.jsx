import { useState, useEffect } from "react";
import "./styles/App.css"; // Importa estilos CSS
import Header from "./components/Header"; // Importa componente Header
import Saldo from "./components/Saldo"; // Importa componente Saldo
import FilterBar from "./components/FilterBar"; // Importa componente FilterBar
import TransactionList from "./components/TransactionList"; // Importa lista de transações
import TransactionForm from "./components/TransactionForm"; // Importa formulário

// Componente principal da aplicação
function App() {
  // Estados da aplicação usando useState
  const [darkMode, setDarkMode] = useState(false); // Controla modo claro/escuro
  const [transactions, setTransactions] = useState([]); // Armazena todas as transações
  const [filterType, setFilterType] = useState("todas"); // Filtro por tipo
  const [filterCategory, setFilterCategory] = useState("todas"); // Filtro por categoria
  const [isSorted, setIsSorted] = useState(false); // Controla ordenação

  // useEffect: executa quando componente monta (carrega dados salvos)
  useEffect(() => {
    // Carrega transações salvas no localStorage
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions)); // Converte string para array
    }

    // Carrega preferência de modo escuro
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []); // Array vazio = executa só uma vez

  // useEffect: aplica modo escuro ao body e salva preferência
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark"); // Adiciona classe dark ao body
    } else {
      document.body.classList.remove("dark"); // Remove classe dark
    }
    localStorage.setItem("darkMode", darkMode); // Salva preferência
  }, [darkMode]); // Executa quando darkMode muda

  // useEffect: salva transações no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]); // Executa quando transactions muda

  // Função para calcular saldo total
  const calculateTotal = () => {
    // Reduz array de transações para um único valor
    return transactions.reduce((total, transaction) => {
      // Soma se for receita, subtrai se for despesa
      return transaction.type === "receita"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0); // Começa com total = 0
  };

  // Função para adicionar nova transação
  const addTransaction = (transaction) => {
    // Cria novo array com transação adicionada
    setTransactions([...transactions, transaction]);
  };

  // Função para deletar transação pelo ID
  const deleteTransaction = (id) => {
    // Filtra transações removendo a com ID especificado
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Filtra transações baseado nos filtros selecionados
  const filteredTransactions = transactions.filter((transaction) => {
    // Verifica se tipo corresponde ao filtro
    const typeMatch = filterType === "todas" || transaction.type === filterType;
    // Verifica se categoria corresponde ao filtro
    const categoryMatch =
      filterCategory === "todas" || transaction.category === filterCategory;
    // Retorna true se ambos corresponderem
    return typeMatch && categoryMatch;
  });

  // Ordena transações se isSorted for true
  const sortedTransactions = isSorted
    ? [...filteredTransactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    : filteredTransactions;

  // Função para alternar modo escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Inverte valor do estado
  };

  // Função para alternar ordenação
  const toggleSort = () => {
    setIsSorted(!isSorted); // Inverte valor do estado
  };

  // Função para alterar filtros
  const handleFilterChange = (filterName, value) => {
    // Atualiza filtro específico baseado no nome
    if (filterName === "type") {
      setFilterType(value);
    } else if (filterName === "category") {
      setFilterCategory(value);
    }
  };

  // Renderização do componente
  return (
    <div className="App">
      {/* Componente Header com props */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        {/* Componente Saldo com saldo total calculado */}
        <Saldo total={calculateTotal()} />

        {/* Componente FilterBar com filtros e ordenação */}
        <FilterBar
          filterType={filterType}
          filterCategory={filterCategory}
          onFilterChange={handleFilterChange}
          onSort={toggleSort}
          isSorted={isSorted}
        />

        {/* Componente TransactionList com transações filtradas/ordenadas */}
        <TransactionList
          transactions={sortedTransactions}
          onDeleteTransaction={deleteTransaction}
        />

        {/* Componente TransactionForm para adicionar novas transações */}
        <TransactionForm onAddTransaction={addTransaction} />
      </main>
    </div>
  );
}

export default App;
