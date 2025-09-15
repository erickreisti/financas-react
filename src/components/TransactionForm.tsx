import React, { useState } from 'react';

interface Transaction {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

interface FormData {
  type: string;
  description: string;
  category: string;
  amount: string;
}

const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    type: '',
    description: '',
    category: '',
    amount: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { type, description, category, amount } = formData;
    const amountValue = parseFloat(amount);

    if (type && description && category && amountValue > 0) {
      const newTransaction: Transaction = {
        id: Date.now(),
        type: type as 'receita' | 'despesa',
        description,
        category,
        amount: amountValue,
        date: new Date().toISOString(),
      };

      onAddTransaction(newTransaction);

      setFormData({
        type: '',
        description: '',
        category: '',
        amount: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <select
          id="type"
          value={formData.type}
          onChange={handleChange as any}
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="receita">🟢 Receita</option>
          <option value="despesa">🔴 Despesa</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <select
          id="category"
          value={formData.category}
          onChange={handleChange as any}
          required
        >
          <option value="">Selecione a categoria</option>
          <option value="salario">Salário</option>
          <option value="alimentacao">Alimentação</option>
          <option value="transporte">Transporte</option>
          <option value="lazer">Lazer</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="number"
          id="amount"
          placeholder="Valor (R$)"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-primary">
        ➕ Adicionar
      </button>
    </form>
  );
};

export default TransactionForm;
