// src/App.tsx
// Componente principal da aplicação - orquestra toda a estrutura
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import { TransactionProvider } from './contexts/TransactionContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  // Estados locais para filtros e ordenação (não precisam estar no contexto)
  const [filterType, setFilterType] = useState<string>('todas');
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [isSorted, setIsSorted] = useState<boolean>(false);

  // Função para alternar ordenação das transações
  const toggleSort = (): void => {
    setIsSorted(!isSorted);
  };

  // Função para alterar filtros (tipo ou categoria)
  const handleFilterChange = (filterName: string, value: string): void => {
    if (filterName === 'type') {
      setFilterType(value);
    } else if (filterName === 'category') {
      setFilterCategory(value);
    }
  };

  // Renderização do componente
  return (
    // Providers para contexto global - devem envolver toda a árvore de componentes
    <ThemeProvider>
      {/* TransactionProvider fornece contexto de transações para todos componentes filhos */}
      <TransactionProvider>
        {/* Router do React Router para habilitar navegação */}
        <Router>
          {/* Div principal da aplicação com classe CSS 'App' */}
          <div className="App">
            {/* Componente Header - agora usa contexto de tema */}
            <Header />

            {/* Elemento main que contém o conteúdo principal */}
            <main
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px',
              }}
            >
              {/* Componente de navegação */}
              <Navigation />

              {/* Componente Routes do React Router para definir rotas */}
              <Routes>
                {/* Rota raiz (/) - Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Rota /transactions - Página de transações */}
                <Route
                  path="/transactions"
                  element={
                    <Transactions
                      filterType={filterType}
                      filterCategory={filterCategory}
                      handleFilterChange={handleFilterChange}
                      isSorted={isSorted}
                      toggleSort={toggleSort}
                    />
                  }
                />

                {/* Rota /reports - Página de relatórios */}
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TransactionProvider>
    </ThemeProvider>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default App;
