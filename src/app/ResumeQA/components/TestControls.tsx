import { Play, Square } from "lucide-react";
import React, { SetStateAction } from "react";

interface Props {
  toggleTestMode: () => void;
  isLoading: boolean;
  testMode: boolean;
}

const TestControls: React.FC<Props> = ({
  toggleTestMode,
  isLoading,
  testMode,
}) => {
  return (
    <div className="flex items-center mb-3 px-2">
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