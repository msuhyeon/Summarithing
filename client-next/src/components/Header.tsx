type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

import { signIn } from 'next-auth/react';

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const handleLogin = () => {
    signIn('google');
  };

  return (
    <header className="w-full pt-4 flex justify-end gap-4">
      <button
        className="relative bg-yellow-400 hover:bg-yellow-500 text-white text-base font-semibold py-2 px-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer dark:bg-amber-600 dark:hover:bg-amber-500"
        onClick={handleLogin}
      >
        구글 계정으로 시작하기
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
