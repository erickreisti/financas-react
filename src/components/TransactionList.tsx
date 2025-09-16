// src/components/TransactionList.tsx
// Componente para listar transações

// Interface para definir a estrutura de uma transação
interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

// Interface para definir o formato das props recebidas
interface TransactionListProps {
  transactions: Transaction[]; // Array de transações
  onDeleteTransaction: (id: number) => void; // Função para deletar transação
}

// Componente TransactionList: lista de transações
// Recebe props tipadas
const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  // Objeto para mapear chaves de categoria para nomes amigáveis
  const categoryNames: { [key: string]: string } = {
    salario: 'Salário',
    alimentacao: 'Alimentação',
    transporte: 'Transporte',
    lazer: 'Lazer',
    outros: 'Outros',
  };

  // Função para formatar data ISO para formato brasileiro
  // Recebe string e retorna string formatada
  const formatDate = (dateString: string): string => {
    // Converte string ISO para objeto Date e formata para DD/MM/AAAA
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Função para formatar valor como moeda brasileira
  // Recebe número e retorna string formatada
  const formatCurrency = (value: number): string => {
    // Converte número para string com 2 casas decimais e substitui . por ,
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  // Retorna JSX do componente
  return (
    // Lista não ordenada para transações
    <ul className="transaction-list">
      {/* Verifica se há transações para mostrar */}
      {transactions.length === 0 ? (
        // Mensagem quando não há transações
        <li style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
          Nenhuma transação encontrada
        </li>
      ) : (
        // Mapeia array de transações para elementos JSX
        transactions.map(transaction => (
          // Cada item da lista com key única (importante para React)
          <li
            key={transaction.id}
            className={`transaction-item ${transaction.type}`}
          >
            {/* Informações da transação */}
            <div className="transaction-info">
              {/* Descrição em negrito */}
              <strong>{transaction.description}</strong>
              {/* Metadados da transação */}
              <div className="transaction-meta">
                {/* Data formatada */}
                <div>{formatDate(transaction.date)}</div>
                {/* Tag de categoria */}
                <span className="category-tag">
                  {/* Usa categoryNames para nome amigável ou categoria original */}
                  {categoryNames[transaction.category] || transaction.category}
                </span>
              </div>
            </div>

            {/* Valor e botão de deletar */}
            <div className="transaction-amount">
              {/* Valor com sinal + ou - baseado no tipo */}
              <span
                className={`value ${transaction.type === 'receita' ? 'positive' : 'negative'}`}
              >
                {transaction.type === 'receita' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </span>
              {/* Botão para deletar transação */}
              <button
                type="button"
                className="delete-btn"
                // Quando clicado, chama onDeleteTransaction com ID da transação
                onClick={() => onDeleteTransaction(transaction.id)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default TransactionList;
