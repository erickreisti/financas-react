interface FilterBarProps {
  filterType: string;
  filterCategory: string;
  onFilterChange: (filterName: string, value: string) => void;
  onSort: () => void;
  isSorted: boolean;
}

const FilterBar = ({
  filterType,
  filterCategory,
  onFilterChange,
  onSort,
  isSorted,
}: FilterBarProps) => {
  return (
    <div className="filters">
      <select
        value={filterType}
        onChange={e => onFilterChange('type', e.target.value)}
      >
        <option value="todas">Todas</option>
        <option value="receita">🟢 Receitas</option>
        <option value="despesa">🔴 Despesas</option>
      </select>

      <select
        value={filterCategory}
        onChange={e => onFilterChange('category', e.target.value)}
      >
        <option value="todas">Todas as categorias</option>
        <option value="salario">Salário</option>
        <option value="alimentacao">Alimentação</option>
        <option value="transporte">Transporte</option>
        <option value="lazer">Lazer</option>
        <option value="outros">Outros</option>
      </select>

      <button
        type="button"
        className={`btn-${isSorted ? 'success' : 'outline'}`}
        onClick={onSort}
      >
        {isSorted ? '📅 Ordenado por data' : '📅 Ordenar por data'}
      </button>
    </div>
  );
};

export default FilterBar;
