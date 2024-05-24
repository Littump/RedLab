import { useDropzone } from "react-dropzone";
import { memo, useCallback, useState } from "react";
import IFile from "@/modules/InputData/types/file.ts";
import { useHorizontalScroll } from "@/helpers/useHorisontalScroll.ts";

const InputDataForm = memo(() => {
  const [files, setFiles] = useState<IFile[]>([]);

  const addFile = (file: IFile) => {
    setFiles((prev) => [...prev, file]);
  };

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

  return (
    <div className="flex flex-col gap-4">
      <div
        className=" border stroke rounded-xl w-full h-60 py-8 px-6 flex flex-col items-center justify-center gap-4"
        {...getRootProps()}
      >
        {!isDragActive ? <div>дропните</div> : <div>дропай!</div>}
        <p className="prose-md font-bold">Перенесите файл</p>
        <div className="btn btn-neutral bg-blue-500 text-white btn-md">
          <input className="hidden" {...getInputProps} />
          выберите файлы
        </div>
      </div>
      <div className="w-full overflow-hidden max-w-80">
        <div
          className="flex gap-4 w-full overflow-y-hidden overflow-x-scroll no-scroll"
          ref={scrollRef}
        >
          {files.map((file) => (
            <div
              className="my-btn w-1/3"
              key={file.id}
              onClick={() => deleteFile(file.id)}
            >
              {file.file.path}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default InputDataForm;
