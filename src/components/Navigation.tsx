import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Dashboard' },
    { path: '/transactions', label: '📋 Transações' },
    { path: '/reports', label: '📈 Relatórios' },
  ];

  return (
    <nav>
      <ul>
        {navItems.map(item => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
