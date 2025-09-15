interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
}

const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  const categoryNames: { [key: string]: string } = {
    salario: 'Salário',
    alimentacao: 'Alimentação',
    transporte: 'Transporte',
    lazer: 'Lazer',
    outros: 'Outros',
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number): string => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <ul className="transaction-list">
      {transactions.map(transaction => (
        <li
          key={transaction.id}
          className={`transaction-item ${transaction.type}`}
        >
          <div className="transaction-info">
            <strong>{transaction.description}</strong>
            <div className="transaction-meta">
              <div>{formatDate(transaction.date)}</div>
              <span className="category-tag">
                {categoryNames[transaction.category] || transaction.category}
              </span>
            </div>
          </div>

          <div className="transaction-amount">
            <span
              className={`value ${transaction.type === 'receita' ? 'positive' : 'negative'}`}
            >
              {transaction.type === 'receita' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </span>
            <button
              type="button"
              className="delete-btn"
              onClick={() => onDeleteTransaction(transaction.id)}
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
