// src/components/TransactionList.jsx
// Importa React para criar componente
import React from "react";

// Componente TransactionList: lista de transações
// Recebe props: transactions (array) e onDeleteTransaction (função)
const TransactionList = ({ transactions, onDeleteTransaction }) => {
  // Objeto para mapear chaves de categoria para nomes amigáveis
  const categoryNames = {
    salario: "Salário",
    alimentacao: "Alimentação",
    transporte: "Transporte",
    lazer: "Lazer",
    outros: "Outros",
  };

  // Função para formatar data ISO para formato brasileiro
  const formatDate = (dateString) => {
    // Converte string ISO para objeto Date e formata para DD/MM/AAAA
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  // Função para formatar valor como moeda brasileira
  const formatCurrency = (value) => {
    // Converte número para string com 2 casas decimais e substitui . por ,
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  // Retorna JSX do componente
  return (
    // Seção que contém a lista
    <section>
      {/* Container flexível para título e possíveis ações futuras */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Título da seção */}
        <h2>Transações</h2>
      </div>

      {/* Lista não ordenada para transações */}
      <ul id="transaction-list">
        {/* Mapeia array de transações para elementos JSX */}
        {transactions.map((transaction) => (
          // Cada item da lista com key única (importante para React)
          <li key={transaction.id} className={transaction.type}>
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
              <span className="valor">
                {transaction.type === "receita" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </span>
              {/* Botão para deletar transação */}
              <button
                className="delete-btn"
                // Quando clicado, chama onDeleteTransaction com ID da transação
                onClick={() => onDeleteTransaction(transaction.id)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default TransactionList;
