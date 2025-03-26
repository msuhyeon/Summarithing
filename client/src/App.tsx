import Header from './components/Header';
import FileTextInput from './components/FileTextInput';
import SummarizingResult from './components/SummarizingResult';
import { useState } from 'react';

type ExtractData = {
  keywords: string[];
  summary: string;
};

const App = () => {
  const [summaryData, setSummaryData] = useState<ExtractData>(null);
  const [mode, setMode] = useState<'input' | 'result'>('input');

  const handleData = (data: ExtractData) => {
    setSummaryData(data);
    setMode('result');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen pl-30 pr-30">
        <Header />
        {mode === 'input' && (
          <div
            className="flex-grow flex flex-col justify-center items-center transform -translate-y-30
"
          >
            <h1 className="mb-4 text-3xl font-orbit-600 antialiased">요약요정: 요요</h1>
            <h2 className="mb-10 font-sans text-neutral-700 antialiased">
              이걸 언제 다 읽어요? 🤖✨ 요요가 핵심만 쏙쏙 요약해드릴게요!
            </h2>
            <FileTextInput onSendData={handleData} />
          </div>
        )}
        {mode === 'result' && <SummarizingResult summaryData={summaryData} />}
        <footer className="p-5 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} Suhyeon. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default App;
