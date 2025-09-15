interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header>
      <h1>💰 Minhas Finanças</h1>
      <button type="button" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;
