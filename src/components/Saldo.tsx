// src/components/Saldo.tsx
// Componente para mostrar o saldo total das transações

// Interface para definir o formato das props recebidas
interface SaldoProps {
  total: number; // Valor do saldo total (número)
}

// Componente Saldo: mostra o saldo total das transações
// Recebe uma prop tipada: total (número com o valor do saldo)
const Saldo = ({ total }: SaldoProps) => {
  // Função que determina a cor do saldo baseado no valor
  // Retorna string com código de cor hexadecimal
  const getSaldoColor = (): string => {
    if (total > 0) return 'var(--success)'; // Verde para saldo positivo
    if (total < 0) return 'var(--danger)'; // Vermelho para saldo negativo
    return 'white'; // Branco para saldo zero
  };

  // Função que formata números para moeda brasileira
  // Recebe valor number e retorna string formatada
  const formatCurrency = (value: number): string => {
    // toFixed(2): converte para 2 casas decimais
    // replace('.', ','): substitui ponto por vírgula
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  // Retorna JSX do componente
  return (
    // Seção que contém o saldo com classe CSS 'saldo-section'
    <section className="saldo-section">
      {/* Título da seção */}
      <h2>Saldo Total</h2>

      {/* Div que mostra o valor do saldo */}
      <div
        className="saldo"
        // style inline: aplica cor dinâmica baseada no saldo
        style={{ color: getSaldoColor() }}
      >
        {/* Mostra o saldo formatado como moeda */}
        {formatCurrency(total)}
      </div>
    </section>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Saldo;
