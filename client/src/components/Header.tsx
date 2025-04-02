type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className="w-full pt-4 flex justify-end">
      <button
        className="cursor-pointer bg-gray-100 dark:bg-gray-500 py-2 px-4 rounded-md transition-all"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;
