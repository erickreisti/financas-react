interface SaldoProps {
  total: number;
}

const Saldo = ({ total }: SaldoProps) => {
  const getSaldoColor = (): string => {
    if (total > 0) return 'var(--success)';
    if (total < 0) return 'var(--danger)';
    return 'white';
  };

  const formatCurrency = (value: number): string => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <section className="saldo-section">
      <h2>Saldo Total</h2>
      <div className="saldo" style={{ color: getSaldoColor() }}>
        {formatCurrency(total)}
      </div>
    </section>
  );
};

export default Saldo;
