import { FileUp } from "lucide-react";
import React, { ChangeEvent, useRef } from "react";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadResume: React.FC<Props> = ({ setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };
  return (
    <div className="flex justify-center mx-4 bg-slate-50 mb-4">
      <div className="w-full">
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-indigo-200 rounded-xl p-2 text-center cursor-pointer hover:bg-indigo-100 transition-colors"
        >
          <div className="bg-indigo-100 max-w-fit p-2 rounded-full flex items-center justify-center mx-auto">
            <FileUp className="h-7 w-7 text-indigo-600" />
          </div>
          <p className="mt-2 text-sm font-medium text-indigo-800">
            Click to upload a file
          </p>
          <p className="mt-1 text-xs text-indigo-500">PDF, DOCX up to 10MB</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  );
};

export default UploadResume;
