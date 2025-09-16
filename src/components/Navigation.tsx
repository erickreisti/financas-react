// src/components/Navigation.tsx
// Componente de navegação entre páginas

import { Link, useLocation } from 'react-router-dom';

// Componente Navigation: menu de navegação entre páginas
const Navigation = () => {
  // Hook useLocation para obter informações da rota atual
  const location = useLocation();

  // Array com itens de navegação (caminho e rótulo)
  const navItems = [
    { path: '/', label: '🏠 Dashboard' },
    { path: '/transactions', label: '📋 Transações' },
    { path: '/reports', label: '📈 Relatórios' },
  ];

  // Retorna JSX (interface do componente)
  return (
    // Elemento nav HTML para navegação
    <nav>
      {/* Lista não ordenada para itens de menu */}
      <ul>
        {/* Mapeia itens de navegação para elementos JSX */}
        {navItems.map(item => (
          // Cada item de menu
          <li key={item.path}>
            {/* Link do React Router para navegação */}
            <Link
              to={item.path} // Caminho da rota
              // Classe CSS dinâmica baseada na rota atual
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label} {/* Texto do link */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Exporta componente para ser usado em outras partes do app
export default Navigation;
