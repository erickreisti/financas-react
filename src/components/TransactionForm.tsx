// src/components/TransactionForm.tsx
// Componente de formulário para adicionar transações
import React, { useState } from 'react';

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
interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void; // Função que recebe transação
}

// Interface para definir a estrutura do estado do formulário
interface FormData {
  type: string; // Tipo da transação
  description: string; // Descrição
  category: string; // Categoria
  amount: string; // Valor (string porque vem do input)
}

// Componente TransactionForm: formulário para adicionar transações
// Recebe uma prop tipada: onAddTransaction (função para adicionar transação)
const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  // useState para gerenciar o estado do formulário com tipagem
  const [formData, setFormData] = useState<FormData>({
    type: '', // Tipo da transação - inicialmente vazio
    description: '', // Descrição - inicialmente vazio
    category: '', // Categoria - inicialmente vazio
    amount: '', // Valor - inicialmente vazio (string)
  });

  // Função chamada quando qualquer campo do formulário muda
  // Recebe evento tipado como React.ChangeEvent
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Atualiza o estado mantendo os valores antigos e mudando só o campo alterado
    setFormData({
      ...formData, // Espalha (spread) todos os valores atuais
      [e.target.id]: e.target.value, // Atualiza o campo específico usando computed property name
    });
  };

  // Função chamada quando o formulário é enviado
  // Recebe evento tipado como React.FormEvent
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o comportamento padrão (recarregar página)

    // Extrai valores do estado do formulário usando destructuring
    const { type, description, category, amount } = formData;
    const amountValue = parseFloat(amount); // Converte string para número decimal

    // Valida se todos os campos estão preenchidos corretamente
    if (type && description && category && amountValue > 0) {
      // Cria objeto da nova transação com dados validados
      const newTransaction: Transaction = {
        id: Date.now(), // ID único baseado no timestamp atual
        type: type as 'receita' | 'despesa', // Type assertion para tipagem correta
        description, // Descrição
        category, // Categoria
        amount: amountValue, // Valor (número)
        date: new Date().toISOString(), // Data atual em formato ISO (universal)
      };

      // Chama função recebida via props para adicionar a transação
      onAddTransaction(newTransaction);

      // Limpa o formulário resetando o estado para valores iniciais
      setFormData({
        type: '',
        description: '',
        category: '',
        amount: '',
      });
    }
  };

  // Retorna JSX do componente
  return (
    // Seção do formulário
    <form onSubmit={handleSubmit}>
      {/* Grupo de formulário para tipo */}
      <div className="form-group">
        <select
          id="type" // ID para identificação
          value={formData.type} // Valor controlado pelo estado
          onChange={handleChange as any} // Chama handleChange quando muda (type assertion)
          required // Campo obrigatório
        >
          {/* Opção padrão vazia */}
          <option value="">Selecione o tipo</option>
          {/* Opções de tipo */}
          <option value="receita">🟢 Receita</option>
          <option value="despesa">🔴 Despesa</option>
        </select>
      </div>

      {/* Grupo de formulário para descrição */}
      <div className="form-group">
        <input
          type="text" // Tipo de input texto
          id="description" // ID para identificação
          placeholder="Descrição" // Texto de ajuda quando vazio
          value={formData.description} // Valor controlado pelo estado
          onChange={handleChange} // Chama handleChange quando muda
          required // Campo obrigatório
        />
      </div>

      {/* Grupo de formulário para categoria */}
      <div className="form-group">
        <select
          id="category" // ID para identificação
          value={formData.category} // Valor controlado pelo estado
          onChange={handleChange as any} // Chama handleChange quando muda (type assertion)
          required // Campo obrigatório
        >
          {/* Opção padrão vazia */}
          <option value="">Selecione a categoria</option>
          {/* Opções de categoria */}
          <option value="salario">Salário</option>
          <option value="alimentacao">Alimentação</option>
          <option value="transporte">Transporte</option>
          <option value="lazer">Lazer</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      {/* Grupo de formulário para valor */}
      <div className="form-group">
        <input
          type="number" // Tipo de input número
          id="amount" // ID para identificação
          placeholder="Valor (R$)" // Texto de ajuda quando vazio
          step="0.01" // Permite casas decimais
          value={formData.amount} // Valor controlado pelo estado
          onChange={handleChange} // Chama handleChange quando muda
          required // Campo obrigatório
        />
      </div>

      {/* Botão de submit do formulário */}
      <button type="submit" className="btn-primary">
        ➕ Adicionar
      </button>
    </form>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default TransactionForm;
