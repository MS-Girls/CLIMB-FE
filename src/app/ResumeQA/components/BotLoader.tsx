import { Bot } from "lucide-react";
import React from "react";

const BotLoader = () => {
  return (
    <div className="flex mb-4 justify-start">
      <div className="flex items-end">
        <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 bg-gray-700 mr-2">
          <Bot size={16} className="text-white" />
        </div>
        <div className="p-4 rounded-2xl bg-white text-gray-800 shadow-sm border border-gray-100">
          <div className="flex space-x-2">
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
        </div>
      </div>
    </div>
  );
};

export default BotLoader;
