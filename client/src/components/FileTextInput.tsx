import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as pdfjs from 'pdfjs-dist';
import fetch from '../api/fetchWrapper';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js';

type FileTextInputProps = {
  onSendData: (data: { keywords: string[]; summary: string }) => void;
};

const FileTextInput: React.FC<FileTextInputProps> = ({ onSendData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState<string>('');
  const onSubmit = (data: { text: string }) => {
    if (!data || !data.text) {
      console.error('data가 없거나 text 값이 없음: ', data);
      return;
    }

    handleExtractKeywords(data.text);
  };

  const textContent = watch('text');
  const extractText = async (file: File) => {
    if (!file) {
      console.error('파일이 존재하지 않습니다!');
      return;
    }
    const reader = new FileReader();

    reader.onload = async (e) => {
      if (!e.target?.result) return;

      const typedArray = new Uint8Array(e.target.result as ArrayBuffer);

      try {
        const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
        const numPages = pdf.numPages;
        let fullText = '';

        // 페이지 별 텍스트 추출
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          // getTextContent(): 페이지에서 텍스트를 가져오는 메서드
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join('');

          fullText += pageText + '\n\n';
        }

        setValue('text', fullText);
      } catch (error) {
        console.error('PDF 로딩 중 오류 발생:', error);
      }
    };

    reader.onerror = (e) => {
      console.error('FileReader 오류 발생:', e);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (file.type === 'application/pdf') {
      await extractText(file);
    } else {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          setValue('text', e.target.result as string);
        }
      };
      reader.readAsText(file, 'UTF-8');
    }
  };

  const handleExtractKeywords = async (data) => {
    if (!data) return;

    // 추출된 list는 부모 컴포넌트로 보냄
    const extractedData = await fetch('/summarize', 'POST', { content: data });
    onSendData(extractedData as { keywords: string[]; summary: string });
  };

  return (
    <div className="w-4xl max-w-4xl">
      <form
        // handleSubmit의 역할: react-hook-form에서 지공하는 고차함수
        // onSubmit 이벤트 발생 시 내부적으로 폼 데이터를 검증 후 검증이 통과하면 onSubmit 콜백 실행
        // handleSubmit 자체가 폼 데이터를 검사
        // 검사 통과 시 onSubmit 실행
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
          <span className="text-orange-500">{fileName}</span>&nbsp;파일이 업로드 되었습니다.
        </p>
      )}
    </div>
  );
};

export default FileTextInput;
