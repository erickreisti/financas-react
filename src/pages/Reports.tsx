interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface ReportsProps {
  transactions: Transaction[];
}

const Reports = ({ transactions }: ReportsProps) => {
  const categoryTotals: { [key: string]: number } = {};
  const categoryNames: { [key: string]: string } = {
    salario: 'Salário',
    alimentacao: 'Alimentação',
    transporte: 'Transporte',
    lazer: 'Lazer',
    outros: 'Outros',
  };

  transactions.forEach(transaction => {
    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = 0;
    }
    if (transaction.type === 'receita') {
      categoryTotals[transaction.category] += transaction.amount;
    } else {
      categoryTotals[transaction.category] -= transaction.amount;
    }
  });

  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDespesas = transactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <h1>📈 Relatórios</h1>

      <div className="report-cards">
        <div className="report-card receita">
          <h3>Receitas Totais</h3>
          <div className="value positive">
            R$ {totalReceitas.toFixed(2).replace('.', ',')}
          </div>
        </div>

        <div className="report-card despesa">
          <h3>Despesas Totais</h3>
          <div className="value negative">
            R$ {totalDespesas.toFixed(2).replace('.', ',')}
          </div>
        </div>

        <div className="report-card saldo">
          <h3>Saldo Final</h3>
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

      <div className="card mt-4">
        <h2>Por Categoria</h2>
        <div className="category-cards">
          {Object.entries(categoryTotals).map(([category, total]) => (
            <div
              key={category}
              className={`category-card ${total >= 0 ? 'positive' : 'negative'}`}
            >
              <h4>{categoryNames[category] || category}</h4>
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

export default Reports;
