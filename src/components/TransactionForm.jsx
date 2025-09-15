import { useState } from "react"; // hook useState

// Componente TransactionForm: formulário para adicionar transações
// Recebe prop: onAddTransaction (função para adicionar transação)
const TransactionForm = ({ onAddTransaction }) => {
  // useState para gerenciar o estado do formulário
  // formData é o estado atual, setFormData é a função para atualizar
  const [formData, setFormData] = useState({
    type: "", // Tipo da transação (receita/despesa)
    description: "", // Descrição
    category: "", // Categoria
    amount: "", // Valor
  });

  // Função chamada quando qualquer campo do formulário muda
  const handleChange = (e) => {
    // Atualiza o estado mantendo os valores antigos e mudando só o campo alterado
    setFormData({
      ...formData, // Copia todos os valores atuais
      [e.target.id]: e.target.value, // Atualiza o campo específico
    });
  };

  // Função chamada quando o formulário é enviado
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão (recarregar página)

    // Extrai valores do estado do formulário
    const { type, description, category, amount } = formData;
    const amountValue = parseFloat(amount); // Converte string para número

    // Valida se todos os campos estão preenchidos corretamente
    if (type && description && category && amountValue > 0) {
      // Cria objeto da nova transação
      const transaction = {
        id: Date.now(), // ID único baseado no timestamp
        type, // Tipo (receita/despesa)
        description, // Descrição
        category, // Categoria
        amount: amountValue, // Valor (número)
        date: new Date().toISOString(), // Data atual em formato ISO
      };

      // Chama função recebida via props para adicionar a transação
      onAddTransaction(transaction);

      // Limpa o formulário resetando o estado
      setFormData({
        type: "",
        description: "",
        category: "",
        amount: "",
      });
    }
  };

  return (
    // Seção do formulário
    <section>
      {/* Título */}
      <h2>Adicionar Nova Transação</h2>

      {/* Formulário com onSubmit chamando handleSubmit */}
      <form id="transaction-form" onSubmit={handleSubmit}>
        {/* Select para tipo de transação */}
        <select
          id="type"
          value={formData.type} // Valor controlado pelo estado
          onChange={handleChange} // Chama handleChange quando muda
          required // Campo obrigatório
        >
          <option value="">Selecione o tipo</option>
          <option value="receita">🟢 Receita</option>
          <option value="despesa">🔴 Despesa</option>
        </select>

        {/* Input para descrição */}
        <input
          type="text"
          id="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Select para categoria */}
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a categoria</option>
          <option value="salario">Salário</option>
          <option value="alimentacao">Alimentação</option>
          <option value="transporte">Transporte</option>
          <option value="lazer">Lazer</option>
          <option value="outros">Outros</option>
        </select>

        {/* Input para valor */}
        <input
          type="number"
          id="amount"
          placeholder="Valor (R$)"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        {/* Botão de submit */}
        <button type="submit">➕ Adicionar</button>
      </form>
    </section>
  );
};

export default TransactionForm;
