// src/pages/Reports.tsx
// Página com relatórios e análises financeiras

import { useTransactions } from '../hooks/useTransactions'; // Importa hook do contexto

// Componente Reports: página com análises e relatórios
const Reports = () => {
  // Usa hook customizado para acessar contexto de transações
  const { transactions } = useTransactions();

  // Calcula totais por categoria
  const categoryTotals: { [key: string]: number } = {};
  const categoryNames: { [key: string]: string } = {
    salario: 'Salário',
    alimentacao: 'Alimentação',
    transporte: 'Transporte',
    lazer: 'Lazer',
    outros: 'Outros',
  };

  // Processa todas transações para calcular totais por categoria
  transactions.forEach(transaction => {
    // Inicializa categoria se não existir
    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = 0;
    }

    // Soma ou subtrai valor baseado no tipo
    if (transaction.type === 'receita') {
      categoryTotals[transaction.category] += transaction.amount;
    } else {
      categoryTotals[transaction.category] -= transaction.amount;
    }
  });

  // Calcula totais de receitas (soma de todas receitas)
  const totalReceitas = transactions
    .filter(t => t.type === 'receita') // Filtra só receitas
    .reduce((sum, t) => sum + t.amount, 0); // Soma valores

  // Calcula totais de despesas (soma de todas despesas)
  const totalDespesas = transactions
    .filter(t => t.type === 'despesa') // Filtra só despesas
    .reduce((sum, t) => sum + t.amount, 0); // Soma valores

  // Retorna JSX (interface do componente)
  return (
    // Div principal da página
    <div>
      {/* Título da página */}
      <h1>📈 Relatórios</h1>

      {/* Grid com cards de resumo financeiro */}
      <div className="report-cards">
        {/* Card de receitas totais */}
        <div className="report-card receita">
          <h3>Receitas Totais</h3>
          {/* Formata valor como moeda brasileira */}
          <div className="value positive">
            R$ {totalReceitas.toFixed(2).replace('.', ',')}
          </div>
        </div>

        {/* Card de despesas totais */}
        <div className="report-card despesa">
          <h3>Despesas Totais</h3>
          {/* Formata valor como moeda brasileira */}
          <div className="value negative">
            R$ {totalDespesas.toFixed(2).replace('.', ',')}
          </div>
        </div>

        {/* Card de saldo final */}
        <div className="report-card saldo">
          <h3>Saldo Final</h3>
          {/* Cor dinâmica baseada no saldo (verde=pos, vermelho=neg) */}
          <div
            className="value"
            style={{
              color:
                totalReceitas - totalDespesas >= 0
                  ? 'var(--success)'
                  : 'var(--danger)',
            }}
          >
            R$ {(totalReceitas - totalDespesas).toFixed(2).replace('.', ',')}
          </div>
        </div>
      </div>

      {/* Seção de análise por categoria */}
      <div className="card mt-4">
        <h2>Por Categoria</h2>

        {/* Grid com cards de cada categoria */}
        <div className="category-cards">
          {/* Mapeia objeto de totais por categoria para elementos JSX */}
          {Object.entries(categoryTotals).map(([category, total]) => (
            // Cada card de categoria
            <div
              key={category}
              className={`category-card ${total >= 0 ? 'positive' : 'negative'}`}
            >
              {/* Nome amigável da categoria */}
              <h4>{categoryNames[category] || category}</h4>

              {/* Valor total da categoria com cor dinâmica */}
              <div className={`amount ${total >= 0 ? 'positive' : 'negative'}`}>
                R$ {total.toFixed(2).replace('.', ',')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Exporta componente para ser usado em outras partes do app
export default Reports;
