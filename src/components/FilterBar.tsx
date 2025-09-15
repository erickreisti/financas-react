// Componente FilterBar: barra de filtros e ordenação
// Recebe várias props para controle de filtros e ordenação
const FilterBar = ({
  filterType, // Filtro de tipo atual
  filterCategory, // Filtro de categoria atual
  onFilterChange, // Função para alterar filtros
  onSort, // Função para ordenar
  isSorted, // Estado de ordenação
}) => {
  // Retorna JSX do componente
  return (
    // Seção com classe CSS 'filters'
    <section className="filters">
      {/* Select para filtrar por tipo */}
      <select
        value={filterType} // Valor controlado pelo estado
        // Quando muda, chama onFilterChange com 'type' e novo valor
        onChange={(e) => onFilterChange("type", e.target.value)}
      >
        {/* Opções de filtro por tipo */}
        <option value="todas">Todas</option>
        <option value="receita">🟢 Receitas</option>
        <option value="despesa">🔴 Despesas</option>
      </select>

      {/* Select para filtrar por categoria */}
      <select
        value={filterCategory} // Valor controlado pelo estado
        // Quando muda, chama onFilterChange com 'category' e novo valor
        onChange={(e) => onFilterChange("category", e.target.value)}
      >
        {/* Opções de filtro por categoria */}
        <option value="todas">Todas as categorias</option>
        <option value="salario">Salário</option>
        <option value="alimentacao">Alimentação</option>
        <option value="transporte">Transporte</option>
        <option value="lazer">Lazer</option>
        <option value="internet">Internet</option>
        <option value="outros">Outros</option>
      </select>

      {/* Botão para ordenar transações por data */}
      <button
        id="sort-btn" // ID para identificação
        onClick={onSort} // Quando clicado, chama função onSort
      >
        {/* Texto dinâmico baseado no estado de ordenação */}
        {isSorted ? "📅 Ordenado por data" : "📅 Ordenar por data"}
      </button>
    </section>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default FilterBar;
