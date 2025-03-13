import { Play, Square } from "lucide-react";
import React, { SetStateAction } from "react";

interface Props {
    askFromResume: boolean;
    setAskFromResume: (value: SetStateAction<boolean>) => void;
    file: File | null;
    toggleTestMode: () => Promise<void>;
    isLoading: boolean;
    testMode: boolean;
}

const TestControls:React.FC<Props> = ({askFromResume, setAskFromResume, file, toggleTestMode, isLoading, testMode}) => {
  return (
    <div className="flex items-center mb-3 px-2">
      <div className="flex items-center mr-4">
        <input
          type="checkbox"
          id="resumeCheck"
          checked={askFromResume}
          onChange={() => setAskFromResume(!askFromResume)}
          disabled={!file}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="resumeCheck" className="ml-2 text-sm text-gray-700">
          Ask questions from resume
        </label>
      </div>

      <button
        type="button"
        onClick={toggleTestMode}
        disabled={isLoading}
        className="flex items-center px-3 py-1 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
      >
        {testMode ? (
          <>
            <Square size={14} className="mr-1" />
            End Test
          </>
        ) : (
          <>
            <Play size={14} className="mr-1" />
            Start Test
          </>
        )}
      </button>
    </div>
  );
};

export default TestControls;
