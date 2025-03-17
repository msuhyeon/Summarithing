import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'pdfjs-dist';

type Inputs = {
  example: string;
  exampleRequired: string;
};

const FileTextInput: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState<string>('');
  const onSubmit = (data: { text: string }) => console.log('submit!', data);
  const textContent = watch('text');

  return (
    <div className=" w-4xl ">
      <form
        // handleSubmit: onSubmit 호출 전 내용 검증
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-1 border-gray-300 rounded-xl justify-end shadow-sm"
      >
        <textarea
          {...register('text', {
            required:
              '요약할 텍스트를 입력하거나 파일을 업로드하세요. (pdf, txt 확장자만 가능합니다.)',
          })}
          className="w-full p-5 h-auto max-h-60 overflow-y-auto focus:outline-none resize-none"
          placeholder="요약할 텍스트를 입력하거나 파일을 업로드하세요. (pdf, txt 확장자만 가능합니다.)"
        ></textarea>

        <div className="w-full flex justify-between py-3 px-5">
          <label className="w-10 flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-700 transition">
            <input type="file" className="hidden" accept=".txt, .pdf" onChange={handleFileUpload} />
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
          </label>
          {errors.text && !textContent && (
            <p className="text-red-500 text-sm mt-1 px-5 flex items-center ">
              {errors.text.message}
            </p>
          )}
          <svg className="size-6 animate-bounce"></svg>
          <button
            type="submit"
            className={`relative bg-yellow-400 hover:bg-yellow-500 text-white text-base font-semibold py-2 px-5 rounded-lg  transition-all duration-200 ease-in-out  cursor-pointer ${fileName && 'animate-bounce'}`}
          >
            요약하기
          </button>
        </div>
      </form>
      {fileName && (
        <p className="text-left mt-3 text-gray-600">
          <span className="text-orange-500">{fileName}</span>&nbsp;이 업로드 되었습니다.
        </p>
      )}
    </div>
  );
};

export default FileTextInput;
