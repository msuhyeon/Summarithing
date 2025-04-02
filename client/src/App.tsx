import Header from './components/Header';
import FileTextInput from './components/FileTextInput';
import SummarizingResult from './components/SummarizingResult';
import { useEffect, useRef, useState } from 'react';

type ExtractData = {
  keywords: string[];
  summary: string;
};

const App = () => {
  const [summaryData, setSummaryData] = useState<ExtractData>(null);
  const [mode, setMode] = useState<'input' | 'result'>('input');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const modeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modeRef.current) {
      if (darkMode) {
        modeRef.current.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        modeRef.current.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [darkMode]);

  const handleData = (data: ExtractData) => {
    setSummaryData(data);
    setMode('result');
  };

  return (
    <>
      <div ref={modeRef} className="flex flex-col min-h-screen md:px-30 px-8 dark:bg-slate-800">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div
          className="flex-grow flex flex-col justify-start items-center pt-50         
            "
        >
          {mode === 'input' && (
            <>
              {' '}
              <h1 className="mb-4 text-3xl font-orbit-600 antialiased dark:text-white">
                요약요정: 요요
              </h1>
              <h2 className="mb-10 font-sans text-neutral-700 antialiased dark:text-white">
                이걸 언제 다 읽어요? 🤖✨ 요요가 핵심만 쏙쏙 요약해드릴게요!
              </h2>
              <FileTextInput onSendData={handleData} />
            </>
          )}
          {mode === 'result' && <SummarizingResult summaryData={summaryData} />}
        </div>
        <footer className="p-5 text-sm text-center text-gray-500 dark:text-white">
          &copy; {new Date().getFullYear()} Suhyeon. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default App;
