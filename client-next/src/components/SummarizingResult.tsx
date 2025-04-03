const SummarizingResult = ({ summaryData }) => {
  const { keywords, summary } = summaryData;

  return (
    <div className="w-full mt-10 space-y-8 animate-fade-in">
      <div className="p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">핵심 키워드</h2>
        <ul className="flex flex-wrap gap-3">
          {keywords.map((item) => (
            <li
              key={item}
              className="bg-yellow-100  text-md font-medium px-4 py-2 rounded-full shadow-sm"
            >
              #{item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white  p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800  mb-4">📝 세 줄 요약</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line leading-2px">{summary}</p>
      </div>
    </div>
  );
};

export default SummarizingResult;
