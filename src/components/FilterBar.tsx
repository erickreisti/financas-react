// src/components/FilterBar.tsx
// Componente de barra de filtros para transações

// Interface para definir o formato das props recebidas
interface FilterBarProps {
  filterType: string; // Filtro de tipo atual
  filterCategory: string; // Filtro de categoria atual
  onFilterChange: (filterName: string, value: string) => void; // Função para alterar filtros
  onSort: () => void; // Função para ordenar
  isSorted: boolean; // Estado de ordenação
}

// Componente FilterBar: barra de filtros e ordenação
// Recebe várias props tipadas
const FilterBar = ({
  filterType, // Filtro de tipo atual
  filterCategory, // Filtro de categoria atual
  onFilterChange, // Função para alterar filtros
  onSort, // Função para ordenar
  isSorted, // Estado de ordenação
}: FilterBarProps) => {
  // Retorna JSX do componente
  return (
    // Div com classe CSS 'filters'
    <div className="filters">
      {/* Select para filtrar por tipo */}
      <select
        value={filterType} // Valor controlado pelo estado
        // Quando muda, chama onFilterChange com 'type' e novo valor
        onChange={e => onFilterChange('type', e.target.value)}
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
        onChange={e => onFilterChange('category', e.target.value)}
      >
        {/* Opções de filtro por categoria */}
        <option value="todas">Todas as categorias</option>
        <option value="salario">Salário</option>
        <option value="alimentacao">Alimentação</option>
        <option value="transporte">Transporte</option>
        <option value="lazer">Lazer</option>
        <option value="outros">Outros</option>
      </select>

      {/* Botão para ordenar transações por data */}
      <button
        type="button" // Tipo de botão explícito
        className={`btn-${isSorted ? 'success' : 'outline'}`} // Classe CSS dinâmica
        onClick={onSort} // Quando clicado, chama função onSort
      >
        {/* Texto dinâmico baseado no estado de ordenação */}
        {isSorted ? '📅 Ordenado por data' : '📅 Ordenar por data'}
      </button>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default FilterBar;
