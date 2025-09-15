// Componente Saldo: mostra o saldo total das transações
// Recebe prop: total (número com o valor do saldo)
const Saldo = ({ total }) => {
  // Função que determina a cor do saldo baseado no valor
  const getSaldoColor = () => {
    if (total > 0) return "#28a745"; // Verde para saldo positivo
    if (total < 0) return "#dc3545"; // Vermelho para saldo negativo
    return "#ffffff"; // Branco para saldo zero
  };

  // Função que formata números para moeda brasileira
  const formatCurrency = (value) => {
    // Converte número para string com 2 casas decimais e substitui . por ,
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  return (
    // Seção que contém o saldo
    <section className="saldo-section">
      {/* Título da seção */}
      <h2>Saldo Total</h2>

      {/* Div que mostra o valor do saldo */}
      <div
        className="saldo"
        // Aplica cor dinâmica baseada no saldo
        style={{ color: getSaldoColor() }}
      >
        {/* Mostra o saldo formatado como moeda */}
        {formatCurrency(total)}
      </div>
    </section>
  );
};

export default Saldo;
