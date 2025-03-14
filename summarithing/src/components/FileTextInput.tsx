import { useState } from 'react';

const FileTextInput: React.FC = () => {
  const [text, setText] = useState<string>();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex w-4xl flex-col border-1 border-gray-300 rounded-xl justify-end">
      <textarea
        className="w-full p-5 h-auto max-h-60 overflow-y-auto focus:outline-none resize-none"
        placeholder="요약할 텍스트를 입력하거나 파일을 업로드하세요. (pdf, txt 확장자만 가능합니다.)"
        value={text}
        onChange={handleTextChange}
      ></textarea>
      <div className="w-full flex justify-between py-3 px-5">
        <button className="w-16 flex flex-center items-center text-gray cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </button>
        <button className="bg-yellow-500/70 cursor-pointer py-2 px-4 rounded-xl text-white text-sm font-bold">
          요약
        </button>
      </div>
    </div>
  );
};

export default FileTextInput;
