import React from "react";

const ResumeLoader = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
        <div className="flex space-x-1 mr-2">
          <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"></div>
          <div
            className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <span className="text-sm font-medium text-indigo-800">
          Processing your resume...
        </span>
      </div>
    </div>
  );
};

export default ResumeLoader;
