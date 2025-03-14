import { useState } from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  return (
    <header className="w-full p-4 flex justify-end">
      <button
        className={`${darkMode ? ' bg-white-300' : 'bg-gray-100'} py-2 px-4 rounded-md dark:bg-gray-700 transition-all cursor-pointer`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

export default Header;
