import { FileUp } from "lucide-react";
import React, { ChangeEvent, RefObject } from "react";

interface Props {
    triggerFileInput: () => void;
    fileInputRef: RefObject<HTMLInputElement | null>;
    handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadContainser:React.FC<Props> = ({triggerFileInput, fileInputRef, handleFileUpload}) => {
  return (
    <div className="flex justify-center mb-6 px-4">
      <div className="w-full max-w-lg">
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50 transition-colors"
        >
          <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
            <FileUp className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="mt-4 text-sm font-medium text-indigo-800">
            Click to upload your resume
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

export default UploadContainser;
