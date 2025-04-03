type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className="w-full pt-4 flex justify-end gap-4">
      <button className="relative bg-yellow-400 hover:bg-yellow-500 text-white text-base font-semibold py-2 px-5 rounded-lg transition-all duration-200 ease-in-out cursor-pointer dark:bg-amber-600 dark:hover:bg-amber-500">
        Login
      </button>
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
