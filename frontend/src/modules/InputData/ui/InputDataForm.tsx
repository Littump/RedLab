import { useDropzone } from "react-dropzone";
import { memo, useCallback, useEffect, useState } from "react";
import IFile from "@/modules/InputData/types/file.ts";

import { useHorizontalScroll } from "@/helpers/useHorisontalScroll.ts";
import { useAddFile } from "@/modules/InputData/api/useAddFile.ts";
import toast from "react-hot-toast";

const InputDataForm = memo(() => {
  const [files, setFiles] = useState<IFile[]>([]);
  const { mutateAsync, isPending, isSuccess } = useAddFile();
  const addFile = (file: IFile) => {
    setFiles((prev) => [...prev, file]);
  };
  useEffect(() => {
    if (isSuccess) toast.success("Успешно загружен");
  }, [isSuccess]);
  const deleteFile = (id: number) => {
    const new_files = files.filter((el) => el.id !== id);
    setFiles(new_files);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        addFile({ file, id: Math.random() });
      });
    },
    [addFile],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const scrollRef = useHorizontalScroll();

  const handleSubmit = () => {
    files.forEach((file) => {
      mutateAsync({ file: file.file });
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className=" border-2  text-gray-200 border-dashed border-gray-400 rounded-xl w-full h-80 py-8 px-6 flex flex-col items-center justify-center gap-4"
        {...getRootProps()}
      >
        {!isDragActive ? (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
        ) : (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
          </div>
        )}
        <p className="prose-md">Перенесите файл</p>
        <p className="prose-md">или</p>
        <div className="my-btn w-fit">
          <input className="hidden" {...getInputProps} />
          выберите файлы
        </div>
      </div>
      <div className="w-full overflow-hidden max-w-[90vw]]">
        <div
          className="flex gap-2 w-full overflow-y-hidden overflow-x-scroll no-scroll"
          ref={scrollRef}
        >
          {files.map((file) => (
            <div
              className="flex items-center justify-between gap-2 whitespace-nowrap bg-dark-bg text-sm w-fit py-1 px-2 rounded-lg text-white"
              key={file.id}
            >
              {file.file.path.toLowerCase().slice(0, 20)}
              <button
                className="hover:text-main-red transition"
                onClick={() => deleteFile(file.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className="my-btn w-full" onClick={handleSubmit}>
        {isPending ? <span className="loading"></span> : "Отправить файлы"}
      </button>
    </div>
  );
});

export default InputDataForm;
